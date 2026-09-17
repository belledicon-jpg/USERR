const pool = require('../config/db');

const getServices = async (req, res) => {
  try {
    const { searchQuery = '', selectedCategory = 'all' } = req.query;

    const conditions = [];
    const queryParams = [];

    // Category filter
    if (selectedCategory !== 'all') {
      queryParams.push(selectedCategory);
      conditions.push(`id = $${queryParams.length}`);
    }

    // Case-insensitive search on title and description
    if (searchQuery.trim() !== '') {
      queryParams.push(`%${searchQuery.trim().toLowerCase()}%`);
      const searchIdx = queryParams.length;
      conditions.push(`(LOWER(title) LIKE $${searchIdx} OR LOWER(description) LIKE $${searchIdx})`);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const query = `
      SELECT * FROM health_services
      ${whereClause}
      ORDER BY created_at ASC
    `;

    const { rows } = await pool.query(query, queryParams);

    return res.status(200).json(rows);
  } catch (error) {
    console.error('Error executing getServices query:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getServices,
};