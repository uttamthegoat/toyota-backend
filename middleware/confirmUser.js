var jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const CustomError = require("../errors/CustomError");

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const confirmUser = (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      throw new CustomError(401, false, "Please login first");
    }
    const data = jwt.verify(token, JWT_SECRET_KEY);
    req.user = {
      id: data.id,
    };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = confirmUser;
