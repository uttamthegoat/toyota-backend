const express = require("express");
const router = express.Router();

const confirmUser = require("../middleware/confirmUser");
const { signup, login, userDetails } = require("../controllers/auth");

// signup: POST
router.post("/signup", signup);

// login: POST
router.post("/login", login);

// getuser: GET
router.post("/login", confirmUser, userDetails);

router.get("/private", confirmUser, (req, res) => {
  res.json({
    success: true,
  });
});

module.exports = router;
