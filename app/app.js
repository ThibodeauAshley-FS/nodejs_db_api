const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const artistRoute = require("./api/routes/artistRouter");
const paintingRoute = require("./api/routes/paintingRouter");


// middleware for logging 
app.use(morgan("dev"));
//  parsing middleware
app.use(express.urlencoded({
    extended: true
}));
//middleware that all request  are json
app.use(express.json());

// middleware  to handle the CORS  handle policy
app.use((req,res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, x-Requested-With, Content-Type, Accept, Authorization");

    if(req.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods","POST,PUT,GET,PATCH,DELETE");
    }
    next();
});

app.get("/", (req,res, next) => {
    res.status(200).json({
        message: "Service is up!",
        method: req.method
    });
});

// localhost:3000/artist
app.use("/artist", artistRoute);

// localhost:3000/painting
app.use("/painting", paintingRoute);

// add middleware to handle errors and bad url paths
app.use((req, res, next)=>{
    const error = new Error("NOT FOUND!");
    error.status = 404;
    next(error);
});

app.use((error,req,res,next) =>{
    res.status(error.status || 500).json({
        error:{
            message: error.message,
            status: error.status,
            method: req.method
        },
    });
});

// Connect to Mongoose DB
mongoose.connect(process.env.mongoDBURL);

module.exports = app;
