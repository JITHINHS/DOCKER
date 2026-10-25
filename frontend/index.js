// index.js - Frontend Service

const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

// Serve static files (like style.css)
app.use(express.static(__dirname));

// Homepage route
app.get('/', (req, res) => {
  res.send(`
    <link rel="stylesheet" href="/style.css">
    <h1>Welcome to DevOps Portfolio App</h1>
    <p><a href="/users">View Users</a></p>
    <p><a href="/products">View Products</a></p>
  `);
});

// Fetch and display users
app.get('/users', async (req, res) => {
  try {
    const response = await axios.get('http://user-service:5000/users');
    const users = response.data;

    let html = `
      <link rel="stylesheet" href="/style.css">
      <h2>Users List</h2><ul>
    `;
    users.forEach(user => {
      html += `<li><strong>${user.name}</strong> (${user.email})</li>`;
    });
    html += '</ul><p><a href="/">Back to Home</a></p>';

    res.send(html);
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).send('<p>Failed to fetch users. Check backend connection.</p>');
  }
});

// Fetch and display products
app.get('/products', async (req, res) => {
  try {
    const response = await axios.get('http://product-service:5001/products');
    const products = response.data;

    let html = `
      <link rel="stylesheet" href="/style.css">
      <h2>Products List</h2><ul>
    `;
    products.forEach(product => {
      html += `<li><strong>${product.name}</strong> - $${product.price}</li>`;
    });
    html += '</ul><p><a href="/">Back to Home</a></p>';

    res.send(html);
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).send('<p>Failed to fetch products. Check backend connection.</p>');
  }
});

app.listen(PORT, () => {
  console.log(`Frontend running on http://localhost:${PORT}`);
});

