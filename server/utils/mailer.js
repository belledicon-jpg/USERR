async function sendOtpEmail(to, code) {
  const subject = `This is your GovServe verification code`;
  const text = `Your GovServe OTP code is ${code}. It will expire in 5 minutes.`;

  // Professional HTML Layout
  const htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Account</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f5f6; color: #333333;-webkit-font-smoothing: antialiased;">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f5f6; padding: 40px 10px;">
      <tr>
        <td align="center">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); overflow: hidden;">
            
            <!-- Header Section -->
            <tr>
              <td style="background-color: #0f172a; padding: 24px 40px; text-align: left; vertical-align: middle;">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0;">
                  <tr>
                    <!-- Icon Image via Absolute URL -->
                    <td style="vertical-align: middle; padding-right: 12px;">
                      <img 
                        src="https://govserve.site/assets/logo-circle.png"
                        alt="GovServe Logo"
                        width="32"
                        height="32"
                        style="display: block; border: 0; width: 32px; height: 32px; border-radius: 50%;"
                      />
                    </td>
                    <!-- Brand Name Text -->
                    <td style="vertical-align: middle;">
                      <span style="font-size: 24px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px; line-height: 32px;">GovServe</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Body Section -->
            <tr>
              <td style="padding: 40px;">
                <h1 style="margin: 0 0 16px 0; font-size: 22px; font-weight: 600; color: #1e293b; line-height: 1.3;">Verify your email address</h1>
                <p style="margin: 0 0 24px 0; font-size: 15px; color: #475569; line-height: 1.6;">To complete your verification request, use the verification code provided below. This code is securely generated and will expire in <strong style="color: #0f172a;">5 minutes</strong>.</p>
                
                <!-- OTP Display Box -->
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 24px;">
                  <tr>
                    <td align="center" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px 0;">
                      <span style="font-family: 'Courier New', Courier, monospace; font-size: 34px; font-weight: 700; color: #0f172a; letter-spacing: 6px; padding-left: 6px;">${code}</span>
                    </td>
                  </tr>
                </table>

                <!-- Security Warnings -->
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-top: 1px solid #e2e8f0; padding-top: 24px;">
                  <tr>
                    <td>
                      <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Security Notice</p>
                      <p style="margin: 0; font-size: 13px; color: #64748b; line-height: 1.5;">If you did not request this code, you can safely ignore this email. Someone else may have typed your email address by mistake. Never share this code with anyone.</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer Section -->
            <tr>
              <td style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 24px 40px; text-align: center;">
                <p style="margin: 0 0 4px 0; font-size: 12px; color: #94a3b8;">&copy; ${new Date().getFullYear()} GovServe. All rights reserved.</p>
                <p style="margin: 0; font-size: 12px; color: #94a3b8;">Automated security notification. Please do not reply.</p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;

  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM || 'onboarding@resend.dev',
      to: [to],
      subject,
      text,
      html: htmlContent,
    });

    if (error) throw new Error(error.message);
    console.log('OTP email sent with Resend:', data?.id);
    return;
  }

  const transporter = await getTransporter();
  const info = await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER || 'no-reply@example.com',
    to,
    subject,
    text,
    html: htmlContent,
  });

  const previewUrl = nodemailer.getTestMessageUrl(info);
  if (previewUrl) console.log('OTP Preview URL:', previewUrl);
}


function setSessionCookie(res, sessionId, req) {
  const reqOrigin = req ? (req.headers.origin || '') : '';
  const host = req ? (req.headers.host || '') : '';
  const isTunnel = reqOrigin.includes('devtunnels.ms') || host.includes('devtunnels.ms');
  
  const isHttps = req ? (req.secure || req.headers['x-forwarded-proto'] === 'https') : false;
  const needsSecure = isTunnel || isHttps || process.env.NODE_ENV === 'production';

  res.cookie('session_id', sessionId, {
    httpOnly: true,
    sameSite: needsSecure ? 'none' : 'lax',
    secure: needsSecure, 
    maxAge: SESSION_TTL_MS,
    path: '/',
  });
}
