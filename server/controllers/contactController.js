const Contact = require("../models/contactModel");

const submitContact = (req, res) => {
    const {name, email, message}  = req.body;
    Contact.createMessage(name, email, message, (err, result) => {
        if(err) {
            return res.status(500).json({
                success: false,
                message: "Database error"
            });
        }
        res.json ({
            success: true,
            message: "Message saved"
        });
    });
};

module.exports = {
    submitContact
};