const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const User = require("../models/User");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
// const DuplicateKeyError = require("../errors/DuplicateKeyError");
const CustomError = require("../errors/CustomError");

// signup
const signup = async (req, res, next) => {
  try {
    let user = await User.findOne({ name: req.body.name });
    if (user) {
      throw new CustomError(400, false, "User Already exisits");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    user = await User.create({
      name: req.body.name,
      password: hash,
      role: req.body.role,
    });
    // create a payload
    const payload = {
      id: user._id,
    };
    const auth_token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: 860000 }); // confirm expiration
    res
      .cookie("access_token", auth_token, {
        httpOnly: true,
      })
      .status(201)
      .json({ success: true, message: "Signup successful", user: user });
  } catch (error) {
    next(error);
  }
};

// login
const login = async (req, res, next) => {
  const { name, password } = req.body;
  try {
    const user = await User.findOne({ name });
    if (!user) {
      throw new CustomError(401, false, "Please Signup first");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw new CustomError(400, false, "Password Incorrect");
    }
    const payload = {
      id: user.id,
    };
    const auth_token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: 860000 });
    res
      .cookie("access_token", auth_token, {
        httpOnly: true,
      })
      .status(200)
      .json({ success: true, message: "Login successful" });
  } catch (error) {
    next(error);
  }
};

// logout
const logout = async (req, res, next) => {};

// user details
const userDetails = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.status(200).send({ success: true, user: user });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { signup, login, logout, userDetails };
