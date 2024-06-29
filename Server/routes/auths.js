const express = require("express");

const router = express.Router();

//CONTROLLERS
const {signup} = require("../controllers/auth");

//CREATE A USER

router.post("/signup",signup);

//SIGN IN

router.post("/signin",);

//GOOGLE AUTH

router.post("/google",);

module.exports = router;