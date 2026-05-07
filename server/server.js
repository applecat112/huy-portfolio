require("dotenv").config();

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

db.connect((err) => {

    if (err) {
        console.log(err);
    } else {
        console.log("MySQL Connected");
    }
});

app.post("/contact", (req, res) => {

    const { name, email, message } = req.body;

    const sql = `
        INSERT INTO contact_messages(name, email, message)
        VALUES (?, ?, ?)
    `;

    db.query(sql, [name, email, message], (err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                success: false
            });
        }

        res.json({
            success: true
        });
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});