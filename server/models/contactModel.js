const db = require("../config/db");

const createMessage = (name, email, message, callback) => {

    const sql = `
        INSERT INTO contact_messages(name, email, message)
        VALUES (?, ?, ?)
    `;

    db.query(sql, [name, email, message], callback);
};


module.exports = {
    createMessage
};