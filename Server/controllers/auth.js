const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();

// SIGNUP
const signup = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields must be filled." });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const user = await User.findOne({ name });

        if (user) {
            return res.status(400).json({ error: "User already exists." });
        }

        const newUser = new User({ name, email, password: hash });
        await newUser.save();
        res.status(200).json({ msg: "SUCCESS!" });
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err.message });
    }
}

// SIGNIN
const signin = async (req, res) => {
    const { name, password } = req.body;

    if (!name || !password) {
        return res.status(400).json({ error: "All fields must be filled." });
    }

    try {
        const user = await User.findOne({ name });

        if (!user) {
            return res.status(400).json({ error: "User doesn't exist." });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(400).json({ error: "Incorrect password." });
        }
        
        const token = jwt.sign({id:user._id},process.env.SECRET);
        res.cookie("access_token",token,{httpOnly:true,secure: true, 
    sameSite: 'None',}).status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            subscribers:user.subscribers,
            subscribedUsers:user.subscribedUsers,
            access_token:token});

    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err.message });
    }
}

//GOOGLE
const googleAuth = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.SECRET);
      res
        .cookie("access_token", token, {httpOnly:true,secure: true, 
          sameSite: 'None',})
        .status(200)
        .json(user._doc);
    } else {
      const newUser = new User({
        ...req.body,
        fromGoogle: true,
      });
      const savedUser = await newUser.save();
      const token = jwt.sign({ id: savedUser._id }, process.env.JWT);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(savedUser._doc);
    }
  } catch (err) {
    res.status(403).json({Error:err.message});
  }
};

module.exports = { signup,signin,googleAuth };
