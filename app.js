const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;
const path = require('path');

// ...

app.set('views', path.join(__dirname, 'views')); // Set the views directory

// ...

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

// Create a MySQL database connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'express',
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Your CRUD routes will go here

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// ...

// Create
app.get('/create', (req, res) => {
    res.render('create');
  });
  
  app.post('/create', (req, res) => {
    const { name, description } = req.body;
    connection.query('INSERT INTO items (name, description) VALUES (?, ?)', [name, description], (err, results) => {
      if (err) throw err;
      res.redirect('/');
    });
  });
  
  // Read (Display items)
  app.get('/', (req, res) => {
    connection.query('SELECT * FROM items', (err, results) => {
      if (err) throw err;
      res.render('index', { items: results });
    });
  });
  
  // Update
  app.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    connection.query('SELECT * FROM items WHERE id = ?', [id], (err, results) => {
      if (err) throw err;
      res.render('edit', { item: results[0] });
    });
  });
  
  app.post('/edit/:id', (req, res) => {
    const id = req.params.id;
    const { name, description } = req.body;
    connection.query('UPDATE items SET name = ?, description = ? WHERE id = ?', [name, description, id], (err, results) => {
      if (err) throw err;
      res.redirect('/');
    });
  });
  
  // Delete
  app.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    connection.query('DELETE FROM items WHERE id = ?', [id], (err, results) => {
      if (err) throw err;
      res.redirect('/');
    });
  });
  
  // ...
  app.set('view engine', 'ejs'); // Set your view engine (EJS in this case)
app.set('views', path.join(__dirname, 'views')); // Set the views directory
