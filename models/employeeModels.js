const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    first_name: {
        type: String,
        maxLength: 100,
        required: true
    },
    last_name: {
        type: String,
        maxLength: 50,
        required: true
    },
    email: {
        type: String,
        maxLength: 50,
        unique: true
    },
    gender: {
        type: String,
        maxLength: 25,
        prior: ["Male", "Female", "Other"]
    },
    salary: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("employee", employeeSchema)