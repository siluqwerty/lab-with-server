const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'lab_dtbs',
});

db.connect(err => {
    if (err) {
        console.log('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

//creating table
app.get('/create-table', (req, res) => {
    const sql = `
    CREATE TABLE booked_pc (
      s_no INT AUTO_INCREMENT PRIMARY KEY,
      pc_name VARCHAR(255), user_name VARCHAR(255), uptec_id VARCHAR(255) , time VARCHAR(255), date DATE)`;
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error creating table:', err);
            res.status(500).send('Error creating table');
            return;
        }
        console.log('Table created:', result);
        res.send(' table created');
    });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});