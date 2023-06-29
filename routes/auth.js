const express = require("express");
const router = express.Router();

const confirmUser = require("../middleware/confirmUser");
const { signup, login, logout, userDetails } = require("../controllers/auth");

// signup: POST
router.post("/signup", signup);

// login: POST
router.post("/login", login);

// logout: POST
router.post("/logout", logout);

// getuser: GET
router.get("/userdetails", confirmUser, userDetails);

router.get("/private", confirmUser, (req, res) => {
  res.json({
    success: true,
  });
});

module.exports = router;
