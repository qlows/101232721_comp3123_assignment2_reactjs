const userModel = require("../models/userModels");
const express = require("express")
//const routes = express.Router()
const mongoose = require("mongoose")
const routes = express()
const bcrypt = require("bcrypt")

// User signup
routes.post("/signup", async(req, res) => {
    if(req.body.params) {
        return res.status(400).json({
            message: "Content Can Not Be Empty"
        });
    }
    
    try{
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const newUser = new userModel({username: req.body.username, email: req.body.email, password: hashedPassword});
        await newUser.save()
        res.status(201).json(newUser)
    }
    catch(error){
        res.status(500).json(error)
    }
})

// User login
routes.post("/login", async(req, res) =>{
    if(req.body.params) {
        return res.status(400).json({
            message: "Content Can Not Be Empty"
        });
    }
    

    const {username, password} = req.body;
    const user = await userModel.findOne({
        username: username,
        password: password
    });

    if(user.password === password && user.username === username){
        res.status(200).json({
            "username": user.username,
            "password": user.password
        })
    }
    else{
        res.status(500).json("Invalid Credentials")
    }
});

module.exports = routes;