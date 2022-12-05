const employeeModel = require("../models/employeeModels");
const express = require("express")
const routes = express.Router()
const mongoose = require("mongoose")

/* 
{
    "first_name": "Janet",
    "last_name": "Goodman",
    "email": "jenny@email.com",
    "gender": "Female",
    "salary": 45000
}
 */
//http://localhost:3000/api/emp/employees
//User can create new employee
routes.post("/employees", async (req, res) => {
    if (req.body.params) {
        return res.status(400).json({
            message: "Content Can Not Be Empty"
        });
    }

    try {
        const employee = new employeeModel(req.body)
        await employee.save()
        res.status(201).json(employee)
    }
    catch (error) {
        res.status(500).json(error)
    }
})

// http://localhost:3000/api/emp/employees
// User can get all employee list
routes.get("/employees", async (req, res) => {
    if (req.body.params) {
        return res.status(400).json({
            message: "Content Can Not Be Empty"
        });
    }

    try {
        const employee = await employeeModel.find({})
        res.status(200).json(employee)
    }
    catch (error) {
        res.status(400).json(error)
    }
})


// http://localhost:3000/api/emp/employees/63606a1c5dc8c173faddfd0b
// User can get employee details by employee id
routes.get("/employees/:id", async (req, res) => {
    if (req.body.params) {
        return res.status(400).json({
            message: "Content Can Not Be Empty"
        });
    }

    try {
        const employee = await employeeModel.findById(req.params.id)
        res.status(200).json(employee)
    }
    catch (error) {
        res.status(500).json(error)
    }
})

// http://localhost:3000/api/emp/employees/63606a1c5dc8c173faddfd0b
// User can update employee details
routes.put("/employees/:id", async (req, res) => {
    if (req.body.params) {
        return res.status(400).json({
            message: "Content Can Not Be Empty"
        });
    }

    try {
        const updatedEmployee = await employeeModel.findByIdAndUpdate(req.params.id, req.body)
        const newEmp = await updatedEmployee.save()
        res.status(200).json(newEmp)
        res.json("Employee Updated Successfully.")
    }
    catch (error) {
        res.status(400).json(error)
    }
})

// User can delete employee by employee id
routes.delete("/employees/:id", async (req, res) => {
    if (req.body.params) {
        return res.status(400).json({
            message: "Content Can Not Be Empty"
        });
    }
    
    try {
        await employeeModel.findByIdAndDelete(req.params.id)
        res.json("Employee Deleted Successfully.")
    }
    catch (error) {
        res.status(400).json(error)
    }
})

module.exports = routes;