const express = require("express");
const router = express.Router();

const confirmUser = require("../middleware/confirmUser");
const { signup } = require("../controllers/auth");


router.post("/signup", signup);

router.get("/private", confirmUser, (req, res) => {
  res.json({
    success: true,
  });
});

module.exports = router;
