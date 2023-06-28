var jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const confirmUser = (req, res, next) => {
  try {
    // GET user id from jwt token and add id to req object
    const token = req.cookies.access_token;
    if (!token) {
      return res
        .status(401)
        .json({ error: "Please authenticate using a valid token" });
    }
    const data = jwt.verify(token, JWT_SECRET_KEY);
    req.user = {
      id: data.id,
    };
    next();
  } catch (error) {
    res
      .status(401)
      .json({ error: error.message });
  }
};

module.exports = confirmUser;
