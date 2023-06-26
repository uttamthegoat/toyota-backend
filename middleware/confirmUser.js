var jwt = require("jsonwebtoken");
const JWT_SECRET="Iamthegoat"


const confirmUser = (req, res, next) => {
  // GET user id from jwt token and add id to req object
  const token = req.header('x-access-token');
  if (!token) {
    return res
      .status(401)
      .json({ error: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Please authenticate the page using a valid token" });
  }
};

module.exports = confirmUser;