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
    CREATE TABLE registration (
      registration_id INT AUTO_INCREMENT PRIMARY KEY,
      first_name VARCHAR(255), last_name VARCHAR(255), mobile_no INT, aadhar_no INT, course_id VARCHAR(255), high_school_name VARCHAR(255), high_school_board VARCHAR(255), high_school_passout DATE, graduation_institute VARCHAR(255), graduation_course VARCHAR(255), graduation_passout DATE)`;
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error creating table:', err);
            res.status(500).send('Error creating table');
            return;
        }
        console.log('Table created:', result);
        res.send('Users table created');
    });
});
// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});