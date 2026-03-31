const express = require("express");
const { posts } = require("../data/store");
const authenticateToken = require("../middlewares/authMiddleware");
const upload = require("../utils/upload");

const router = express.Router();

// create a post for logged-in user only
// supports single-step image upload using form-data
router.post("/", authenticateToken, upload.single("image"), (req, res) => {
  const { title, content } = req.body || {};

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  const newPost = {
    id: posts.length ? posts[posts.length - 1].id + 1 : 1,
    title,
    content,
    author: req.user.username,
    userId: req.user.id,
    image: req.file ? `/uploads/${req.file.filename}` : null
  };

  posts.push(newPost);

  res.status(201).json({
    message: "Post created successfully",
    post: newPost
  });
});

// get all posts of logged-in user with pagination
router.get("/", authenticateToken, (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 2;

  const userPosts = posts.filter((post) => post.userId === req.user.id);

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedPosts = userPosts.slice(startIndex, endIndex);

  res.json({
    page,
    limit,
    totalPosts: userPosts.length,
    data: paginatedPosts
  });
});

// Get ALL posts
router.get("/all", authenticateToken, (req, res) => {
  res.json({
    totalPosts: posts.length,
    data: posts
  });
});

// get one post of logged-in user
router.get("/:id", authenticateToken, (req, res) => {
  const post = posts.find(
    (p) => p.id === parseInt(req.params.id) && p.userId === req.user.id
  );

  if (!post) {
    return res.status(404).json({ message: "Post not found or access denied" });
  }

  res.json(post);
});

// update only own post
// supports single-step image replacement using form-data
router.put("/:id", authenticateToken, upload.single("image"), (req, res) => {
  const post = posts.find(
    (p) => p.id === parseInt(req.params.id) && p.userId === req.user.id
  );

  if (!post) {
    return res.status(404).json({ message: "Post not found or access denied" });
  }

  const { title, content } = req.body || {};

  post.title = title || post.title;
  post.content = content || post.content;

  if (req.file) {
    post.image = `/uploads/${req.file.filename}`;
  }

  res.json({
    message: "Post updated successfully",
    post
  });
});

// delete only own post
router.delete("/:id", authenticateToken, (req, res) => {
  const index = posts.findIndex(
    (p) => p.id === parseInt(req.params.id) && p.userId === req.user.id
  );

  if (index === -1) {
    return res.status(404).json({ message: "Post not found or access denied" });
  }

  const deletedPost = posts.splice(index, 1);

  res.json({
    message: "Post deleted successfully",
    deletedPost
  });
});

module.exports = router;