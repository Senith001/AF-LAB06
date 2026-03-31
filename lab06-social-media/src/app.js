const express = require("express");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const pageRoutes = require("./routes/pageRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static folder for uploaded images
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

// home route
app.get("/", (req, res) => {
  res.send("Express Social Media API is running");
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/", pageRoutes);

module.exports = app;