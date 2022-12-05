const mongoose = require("mongoose");

// Increased the maxLength of the password because added password encryption. 50 was not enough.
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        maxLength: 100,
        required: true,
        primaryKey: true,
    },
    email: {
        type: String,
        maxLength: 50,
        unique: true
    },
    password: {
        type: String,
        maxLength: 250,
        required: true
    }
});

module.exports = mongoose.model("user", userSchema)