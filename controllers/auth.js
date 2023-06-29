const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const User = require("../models/User");
const Role = require("../models/Role");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const CustomError = require("../errors/CustomError");

// signup
const signup = async (req, res, next) => {
  try {
    let user = await User.findOne({ name: req.body.name });
    if (user) {
      throw new CustomError(400, false, "User Already exisits");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(req.body.password, salt);
    const role = Role({ role_name: req.body.role });
    const savedRole = await role.save();
    user = User({
      role: savedRole._id,
      name: req.body.name,
      password: hashedpassword,
    });
    const savedUser = await user.save();
    const payload = {
      id: user.id,
    };
    const auth_token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: 86000 }); // confirm expiration
    res
      .cookie("access_token", auth_token, {
        httpOnly: true,
      })
      .status(201)
      .json({ success: true, message: "Signup successful", user: savedUser });
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
    const auth_token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: 86000 });
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
const logout = async (req, res, next) => {
  try {
    res.clearCookie("access_token", { httpOnly: true, expires: new Date(0) });
    res.status(200).json({ message: "httpOnly cookie expired" });
  } catch (error) {
    next(error);
  }
};

// user details
const userDetails = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { name, role } = await User.findById(userId);
    const { role_name } = await Role.findById(role);
    const userDetails = {
      name: name,
      role: role_name,
    };
    res.status(200).send({ success: true, user: userDetails });
  } catch (error) {
    next(error);
  }
};

module.exports = { signup, login, logout, userDetails };
