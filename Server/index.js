const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();

//Routes
const userRoutes = require("./routes/users");
const videoRoutes = require("./routes/videos");
const commentRoutes = require("./routes/comments");

const app = express();
const PORT = process.env.PORT;

const cors = require("cors");
app.use(cors());

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

app.use("/api/users",userRoutes);
app.use("/api/videos",videoRoutes);
app.use("/api/comments",commentRoutes);