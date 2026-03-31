const express = require("express");
const jwt = require("jsonwebtoken");
const { users } = require("../data/store");
const { SECRET_KEY } = require("../config/constants");
const authenticateToken = require("../middlewares/authMiddleware");

const router = express.Router();

// login
router.post("/login", (req, res) => {
  const { username, password } = req.body || {};

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    SECRET_KEY,
    { expiresIn: "1h" }
  );

  res.json({
    message: "Login successful",
    token
  });
});

// protected profile
router.get("/profile", authenticateToken, (req, res) => {
  res.json({
    message: "Protected profile data",
    user: req.user
  });
});

module.exports = router;