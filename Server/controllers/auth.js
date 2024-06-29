const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcrypt");

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

        res.status(200).json({ msg: "SUCCESS", username: user.name });
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err.message });
    }
}

module.exports = { signup, signin };
