const express = require("express");
const { posts } = require("../data/store");

const router = express.Router();

// public page just to demonstrate EJS rendering
router.get("/view-posts", (req, res) => {
  res.render("posts", { posts });
});

module.exports = router;