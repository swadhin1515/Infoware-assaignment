import express from 'express';
import mysql from 'mysql';
import bodyParser from 'body-parser';
import { createConnection } from 'mysql';

const pool = mysql.createConnection({
    host: ' 54.86.9.50',
    user: 'root',
    password: '',
    database: 'my-db'
});

pool.connect((error) => {
    if (error) {
        console.log(error);
        return;
    }
    console.log('Connected to the database!');
});

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Create Employee
app.post('/employees', (req, res) => {
    const { name, email, phone } = req.body;
    pool.query('INSERT INTO employees (name, email, phone) VALUES (?, ?, ?)', [name, email, phone], (err, result) => {
        if (err) throw err;
        res.send('Employee created successfully');
    });
});

// List Employees (with pagination)
app.get('/employees', (req, res) => {
    const { page, limit } = req.query;
    const offset = (page - 1) * limit;
    pool.query('SELECT * FROM employees LIMIT ?, ?', [offset, limit], (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// Update Employee
app.put('/employees/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    pool.query('UPDATE employees SET name=?, email=?, phone=? WHERE id=?', [name, email, phone, id], (err, result) => {
        if (err) throw err;
        res.send('Employee updated successfully');
    });
});

// Delete Employee
app.delete('/employees/:id', (req, res) => {
    const { id } = req.params;
    pool.query('DELETE FROM employees WHERE id=?', [id], (err, result) => {
        if (err) throw err;
        res.send('Employee deleted successfully');
    });
});

// Get Employee
app.get('/employees/:id', (req, res) => {
    const { id } = req.params;
    pool.query('SELECT * FROM employees WHERE id=?', [id], (err, result) => {
        if (err) throw err;
        res.json(result[0]);
    });
});

app.listen(3306, () => {
    console.log('Server started on port 3000');
});