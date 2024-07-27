const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const cookieParser = require("cookie-parser");

//Routes
const userRoutes = require("./routes/users");
const videoRoutes = require("./routes/videos");
const commentRoutes = require("./routes/comments");
const authRoutes = require("./routes/auths");

const app = express();
const PORT = process.env.PORT;

const cors = require("cors");
// Allow only specific origins and allow credentials
const corsOptions = {
    origin: ['http://localhost:5173','https://vi-share-fe.vercel.app/'], // Replace with your frontend URL
    methods: ['GET', 'PUT', 'POST', 'DELETE'], // Allow specific methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
    credentials: true // Allow credentials (cookies, authorization headers)
};

app.use(cors());




//CORS error

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

//     // Handle preflight requests
//     if (req.method === 'OPTIONS') {
//         res.sendStatus(200);
//     } else {
//         next();
//     }
// });

//connect to db
mongoose.connect(process.env.MONGO_URI,{
    dbName: 'vishareDB',
  })
.then(()=>{
    console.log("Connection succesfull");
    app.listen(PORT || 3000,()=>{
        console.log("Running on : " + PORT);
    })
});

app.use(express.json());
app.use(cookieParser());
app.use("/",(req,res)=>{
    res.send("Working!!!")
})

app.use("/api/users",userRoutes);
app.use("/api/videos",videoRoutes);
app.use("/api/comments",commentRoutes);
app.use("/api/auths",authRoutes);