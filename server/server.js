require("dotenv").config();

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors({
    origin: "https://applecat112.github.io/huy-portfolio/" // thay bằng URL GitHub Pages của bạn
}));
app.use(express.json());

console.log(process.env.DB_HOST);
console.log(process.env.DB_PORT);

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    connectTimeout: 60000,
    ssl: { rejectUnauthorized: false }
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

    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            error: "Vui lòng điền đầy đủ thông tin"
        });
    }

    const sql = `
        INSERT INTO contact_messages(name, email, message)
        VALUES (?, ?, ?)
    `;

    db.query(sql, [name, email, message], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                error: "Lỗi server, vui lòng thử lại"
            });
        }

        res.json({
            success: true,
            message: "Gửi thành công!"
        });
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});