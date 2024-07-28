const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Database setup
const db = new sqlite3.Database('./database/users.db', (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT,
            role TEXT
        )`);
    }
});
app.post('/register', (req, res) => {
    const { username, password, role } = req.body;

    // Insert new user into the database
    db.run(`INSERT INTO users (username, password, role) VALUES (?, ?, ?)`, [username, password, role], function(err) {
        if (err) {
            console.error('Error during registration:', err.message);
            res.json({ success: false, message: 'Registration failed. Username might already be taken.' });
        } else {
            res.json({ success: true });
        }
    });
});
// Routes
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Query the database for a user with the provided username and password
    db.get(`SELECT * FROM users WHERE username = ? AND password = ?`, [username, password], (err, row) => {
        if (err) {
            console.error(err.message);
            res.json({ success: false });
        } else if (row) {
            // User found, return success and role
            res.json({ success: true, role: row.role });
        } else {
            // User not found, return failure
            res.json({ success: false });
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
