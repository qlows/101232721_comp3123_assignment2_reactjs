const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const routers = express();
const bcrypt = require("bcrypt")
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './src/App'
import { BrowserRouter} from 'react-router-dom';
import Home from "./src/pages/Home";
import Add from "./src/pages/Add";
import View from './src/pages/View';
import About from "./src/pages/About"
import Header from './src/components/Header';

// add employee route
const employeeRouter = require("./routes/employee.js")
// add user route
const userRouter = require("./routes/user.js");


//routers.use(express.json()); 

const DB_URL = "mongodb+srv://qlows:ananinamizuck@cluster0.hm9ineu.mongodb.net/comp3123_assigment1?retryWrites=true&w=majority"

routers.use(bodyParser.urlencoded({ extended: true }))
routers.use(bodyParser.json())

mongoose.Promise = global.Promise;

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

//config the routers
routers.use("/api/user/", userRouter)
routers.use("/api/emp/", employeeRouter)

routers.route("/").get((req, res) => {
    res.send("<h1>hi</h1>");
});

const port = process.env.PORT || 6000
routers.listen(port, () =>
    console.log(`Server running on port 6000`)
)