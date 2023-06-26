const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const User = require("../models/User");

// JWT secret key
const JWT_SECRET = "wBhs4aNOj3a4";

router.post("/signup", async (req, res) => {
  try {
    // if the user exists then return error
    let user = await User.findOne({ name: req.body.name });
    if (user) {
      return res.status(400).json({
        success: false,
        error: "Sorry! A user with this email alreasy exists",
      });
    }
    // else hash the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    // store the details
    user = await User.create({
      name: req.body.name,
      password: hash,
      roles: req.body.roles,
    });
    // create a payload
    const data = {
      user: {
        id: user.id,
      },
    };
    const authToken = jwt.sign(data, JWT_SECRET);
    res.cookie("jwt", authToken);
    console.log(cookie);
    res.status(200).json({ success: true, auth_token: authToken });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;
