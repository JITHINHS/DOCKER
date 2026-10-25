const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = 5001;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});



// Endpoint to fetch products
app.get('/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching products:', err.message);
    res.status(500).send('Database query failed');
  }
});

app.listen(PORT, () => {
  console.log(`Product service running on port ${PORT}`);
});

