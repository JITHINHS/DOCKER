const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = 5000;

// Use DATABASE_URL from docker-compose.yml
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});



// Endpoint to fetch users
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching users:', err.message);
    res.status(500).send('Database query failed');
  }
});

app.listen(PORT, () => {
  console.log(`User service running on port ${PORT}`);
});

