 // old method 
// const express = require('express');

// letes method 
import express from "express";
import dotenve from "dotenv";
import { connect } from "mongoose";
import connectDB from "./database/db.js";

dotenve.config({});

// Call database connection here
connectDB();

const app = express();

// const PORT = 8080;
const PORT = process.env.PORT || 3000;

app.listen(PORT,() => {
    console.log(`server listen at port ${PORT}`);
})
