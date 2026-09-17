const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendOtpEmail } = require('../utils/mailer');

// Helper to normalize email inputs
const normalizeEmail = (email) => (typeof email === 'string' ? email.trim().toLowerCase() : '');

// Valid 60-character bcrypt hash to prevent timing attacks safely
const DUMMY_HASH = '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy';

// -----------------------------------------------------------------------------
// 1. SIGNUP
// -----------------------------------------------------------------------------
const signup = async (req, res) => {
  const email = normalizeEmail(req.body?.email);
  const password = String(req.body?.password || '');
  const name = req.body?.name || '';

  if (!email || !password || !name) {
    return res.status(400).json({ ok: false, error: 'Name, email, and password are required.' });
  }

  try {
    // Check if account already exists
    const userCheck = await pool.query('SELECT verified FROM users WHERE LOWER(email) = $1', [email]);
    if (userCheck.rows.length > 0 && userCheck.rows[0].verified) {
      return res.status(400).json({ ok: false, error: 'Email is already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiration

    // Upsert User Record using UUID and Boolean flags
    if (userCheck.rows.length > 0 && !userCheck.rows[0].verified) {
      await pool.query(
        'UPDATE users SET passwordhash = $1, name = $2, updated_at = NOW()::text WHERE LOWER(email) = $3',
        [hashedPassword, name, email]
      );
    } else {
      await pool.query(
        `INSERT INTO users (id, name, email, passwordhash, verified, active, role, created_at, updated_at) 
         VALUES (gen_random_uuid(), $1, $2, $3, false, true, 1, NOW()::text, NOW()::text)`,
        [name, email, hashedPassword]
      );
    }

    // Upsert record into separate `otps` table
    const otpQuery = `
      INSERT INTO otps (email, code, expires_at, attempts_left, last_sent_at, verified)
      VALUES ($1, $2, $3, 3, NOW(), false)
      ON CONFLICT (email) 
      DO UPDATE SET 
        code = $2, 
        expires_at = $3, 
        attempts_left = 3, 
        last_sent_at = NOW(), 
        verified = false;
    `;
    await pool.query(otpQuery, [email, code, expiresAt]);

    // Send styled Email via Resend/Nodemailer
    await sendOtpEmail(email, code);

    return res.status(200).json({ ok: true, message: 'Signup initiated. OTP sent to your email.' });
  } catch (err) {
    console.error('[Auth] Signup error:', err);
    return res.status(500).json({ ok: false, error: 'Internal server error' });
  }
};

// -----------------------------------------------------------------------------
// 2. VERIFY OTP
// -----------------------------------------------------------------------------
const verifyOTP = async (req, res) => {
  const email = normalizeEmail(req.body?.email);
  const code = String(req.body?.code || req.body?.otp || '');

  if (!email || !code) {
    return res.status(400).json({ ok: false, error: 'Email and OTP code are required.' });
  }

  try {
    const otpResult = await pool.query('SELECT * FROM otps WHERE LOWER(email) = $1', [email]);
    if (otpResult.rows.length === 0) {
      return res.status(404).json({ ok: false, error: 'No OTP record found for this email.' });
    }

    const otpRecord = otpResult.rows[0];

    if (otpRecord.attempts_left <= 0) {
      return res.status(400).json({ ok: false, error: 'Too many failed attempts. Please request a new OTP.' });
    }

    if (new Date() > new Date(otpRecord.expires_at)) {
      return res.status(400).json({ ok: false, error: 'OTP has expired. Please request a new code.' });
    }

    if (otpRecord.code !== code) {
      await pool.query('UPDATE otps SET attempts_left = attempts_left - 1 WHERE LOWER(email) = $1', [email]);
      return res.status(400).json({ ok: false, error: 'Invalid OTP code.' });
    }

    // 1. Mark OTP as verified inside `otps` table
    await pool.query('UPDATE otps SET verified = true WHERE LOWER(email) = $1', [email]);

    // 2. Mark User as verified (boolean true) inside `users` table
    await pool.query('UPDATE users SET verified = true, updated_at = NOW()::text WHERE LOWER(email) = $1', [email]);

    return res.status(200).json({ ok: true, message: 'Account successfully verified!' });
  } catch (err) {
    console.error('[Auth] Verify OTP error:', err);
    return res.status(500).json({ ok: false, error: 'Internal server error' });
  }
};

// -----------------------------------------------------------------------------
// 3. RESEND OTP
// -----------------------------------------------------------------------------
const resendOTP = async (req, res) => {
  const email = normalizeEmail(req.body?.email);

  if (!email) {
    return res.status(400).json({ ok: false, error: 'Email is required.' });
  }

  try {
    const userCheck = await pool.query('SELECT verified FROM users WHERE LOWER(email) = $1', [email]);
    if (userCheck.rows.length === 0) {
      return res.status(404).json({ ok: false, error: 'User account not found.' });
    }

    if (userCheck.rows[0].verified) {
      return res.status(400).json({ ok: false, error: 'Account is already verified.' });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    const otpQuery = `
      INSERT INTO otps (email, code, expires_at, attempts_left, last_sent_at, verified)
      VALUES ($1, $2, $3, 3, NOW(), false)
      ON CONFLICT (email) 
      DO UPDATE SET 
        code = $2, 
        expires_at = $3, 
        attempts_left = 3, 
        last_sent_at = NOW(), 
        verified = false;
    `;
    await pool.query(otpQuery, [email, code, expiresAt]);

    await sendOtpEmail(email, code);

    return res.status(200).json({ ok: true, message: 'A new OTP has been sent to your email.' });
  } catch (err) {
    console.error('[Auth] Resend OTP error:', err);
    return res.status(500).json({ ok: false, error: 'Internal server error' });
  }
};

// -----------------------------------------------------------------------------
// 4. LOGIN
// -----------------------------------------------------------------------------
const login = async (req, res) => {
  const email = normalizeEmail(req.body?.email);
  const password = String(req.body?.password || '');

  if (!email || !password) {
    return res.status(400).json({ ok: false, error: 'Email and password are required' });
  }

  try {
    // Strictly selecting columns present in your database schema
    const userResult = await pool.query(
      `SELECT id, email, name, passwordhash, verified, avatar, active, role, department, position 
       FROM users WHERE LOWER(email) = $1 LIMIT 1`,
      [email]
    );
    const user = userResult.rows[0];

    const userHash = user?.passwordhash || DUMMY_HASH;
    const isPasswordValid = await bcrypt.compare(password, userHash);

    if (!user || !isPasswordValid) {
      return res.status(401).json({ ok: false, error: 'Invalid email or password' });
    }

    // Check account status against boolean active flag
    if (user.active === false) {
      return res.status(403).json({ ok: false, error: 'Account is deactivated' });
    }

    if (user.verified === false) {
      return res.status(403).json({ ok: false, error: 'Please verify your email via OTP before logging in' });
    }

    const jwtSecret = process.env.JWT_SECRET || 'your_fallback_jwt_secret_key';
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      jwtSecret,
      { expiresIn: '1d' }
    );

    return res.status(200).json({
      ok: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar || null,
        role: user.role,
        department: user.department || null,
        position: user.position || null,
      },
    });
  } catch (err) {
    console.error('[Auth] Login error:', err);
    return res.status(500).json({ ok: false, error: 'Internal server error' });
  }
};

module.exports = {
  signup,
  verifyOTP,
  resendOTP,
  login,
};