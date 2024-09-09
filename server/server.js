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

// Sample POST route to add user
app.post('/api/signup', (req, res) => {
    const { fname, lname, mob, adhar, courseid, schoolname, schoolboard, schoolpass, institutename, institutecourse, institutepass } = req.body;
    if (!fname || !lname || !mob || !adhar || !courseid || !schoolname || !schoolboard || !schoolpass || !institutename || !institutecourse || !institutepass) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    const query = 'INSERT INTO registration (first_name, last_name, mobile_no, aadhar_no, course_id, high_school_name, high_school_board, high_school_passout, graduation_institute, graduation_course, graduation_passout ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [fname, lname, mob, adhar, courseid, schoolname, schoolboard, schoolpass, institutename, institutecourse, institutepass], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json({ message: 'User signed up successfully' });
    });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});