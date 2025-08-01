 // old method 
// const express = require('express');

// letes method 
import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import courseRoute from "./routes/course.route.js"
import mediaRoute from "./routes/media.route.js"
import purchaseRoute from "./routes/purchaseCourse.route.js"
import courseProgressRoute from "./routes/courseProgress.route.js"

dotenv.config({});

// 1. Create app first
const app = express();

// 2. Connect to DB
connectDB();

// 3. Middleware (before routes)
app.use(express.json()); // important for POST requests
app.use(cookieParser()); 
app.use(cors({
     origin:"http://localhost:5173",
     credentials:true
}));

// 4. apis  Routes
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/progress", courseProgressRoute);

// http://localhost:8080/api/v1/user/register : api

// app.get("/home", (_, res) => {
//   res.status(200).json({
//     success: true,
//     message: "Hello I am coming from backend",
//   });
// });



// 5. Start Server
const PORT = process.env.PORT || 5000;
// ek ; ne 2 hours west kr diye bhai 
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});







// // index.js
// import express from "express";

// const app = express();

// app.get("/home", (_, res) => {
//   res.json({ success: true, message: "Test success" });
// });

// app.listen(8080, () => {
//   console.log("✅ Server running at http://localhost:8080");
// });
















// import express from "express";
// import dotenve from "dotenv";
// // import { connect } from "mongoose";
// import connectDB from "./database/db.js";
// import userRoute from "./routes/user.route.js"

// dotenve.config({});

// // Call database connection here
// connectDB();

// app.use(express.json());


// const PORT = process.env.PORT || 3000;



// // apis 
// // Middleware : express middleware use()
// app.use("/api/v1/user",userRoute);


// app.get("/home",(_,res)=>{
//     res.status(200).json({
//         success:true,
//         message:"Hello i am coming from backend"
//     })
// });


// app.listen(PORT,() => {
//     console.log(`server listen at port ${PORT}`);
// })
  