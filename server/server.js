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
    const { name, password, mob, adhar, courseid, schoolname, schoolboard, schoolpass, institutename, institutecourse, institutepass } = req.body;

    const query = 'INSERT INTO registration (name, password, mobile_no, aadhar_no, course_id, high_school_name, high_school_board, high_school_passout, graduation_institute, graduation_course, graduation_passout ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [name, password, mob, adhar, courseid, schoolname, schoolboard, schoolpass, institutename, institutecourse, institutepass], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json({ message: 'User signed up successfully' });
    });
});
app.post('/login', (req, res) => {
    const { name, password } = req.body;
    const sqlSelect = 'SELECT * FROM registration WHERE name = ? AND password = ?';
    db.query(sqlSelect, [name, password], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server error');
        } else if (result.length > 0) {
            res.status(200).send('Login successful');
        } else {
            res.status(401).send('Invalid credentials');
        }
    });
});
app.post('/bookedpc', (req, res) => {
    const { pcname, name, uptecid, time, date } = req.body;

    const query = 'INSERT INTO booked_pc (pc_name, user_name, uptec_id, time, date ) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [pcname, name, uptecid, time, date], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json({ message: 'pc booked up successfully' });
    });
});
app.post('/report', (req, res) => {
    const { problem, details } = req.body;

    const query = 'INSERT INTO maintenance (problem_type, details  ) VALUES (?, ?)';
    db.query(query, [problem, details], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json({ message: 'report send successfully' });
    });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});