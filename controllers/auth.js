const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const User = require("../models/User");
const DuplicateKeyError = require("../utilities/DuplicateKeyError");
// JWT secret key
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const signup = async (req, res, next) => {
  try {
    let user = await User.findOne({ name: req.body.name });

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
    const auth_token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: 860000 });
    res
      .cookie("access_token", auth_token, {
        httpOnly: true,
      })
      .status(201)
      .json({ success: true, message: "Signup successful", user: user });
  } catch (error) {
    if (error.code === 11000) {
      const err = new DuplicateKeyError(
        400,
        false,
        "Sorry! A user with this credentials alreasy exists"
      );
      next(err);
    } else {
      next(error);
    }
  }
};

module.exports = { signup };
