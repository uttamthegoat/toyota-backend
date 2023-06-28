const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const User = require("../models/User");
const CustomError = require("../utilities/CustomError");
// JWT secret key
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const signup = async (req, res, next) => {
  try {
    let user = await User.findOne({ name: req.body.name });
    if (user) {
      // return res.status(400).json({
      //   success: false,
      //   error: "Sorry! A user with this credentials alreasy exists",
      // });
      const err1 = new CustomError(
        400,
        false,
        "Sorry! A user with this credentials alreasy exists"
      );
      next(err1);
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
    const auth_token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: 860000 });
    res
      .cookie("access_token", auth_token, {
        httpOnly: true,
      })
      .status(201)
      .json({ success: true, message: "Signup successful", user: user });
  } catch (error) {
    const err = new CustomError(500, false, error.message);
    next(err);
  }
};

module.exports = { signup };
