const mongoose = require("mongoose");
const User = require("../models/user");
const Note = require("../models/note");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const asyncHandler = require("express-async-handler");

const { body, validationResult } = require("express-validator");

exports.index = asyncHandler(async (req, res, next) => {
  res.render("user_index", { message: "" });
});

exports.user_register_post = asyncHandler(async (req, res, next) => {
  // body('email').isEmail().withMessage('Enter a valid email');
  // body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long');

  const errors = validationResult(req);
  if (!errors.isEmpty())
    res.status(400).render("", { errors: JSON.stringify(errors.array()) });

  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res
      .status(201)
      .render("user_register", { message: "User registered successfully" });
  } catch (err) {
    res.status(500).render("user_register", {
      message: "Error registering user",
      error: err.message,
    });
  }
});

exports.user_login_post = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user)
      return res.status(400).render("user_login", { message: "Invalid User" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .render("user_login", { message: "Invalid credentials" });

    // const token = jwt.sign({ id: user._id, role: user.role }, "secret key", {
    //   expiresIn: "1h",
    // });

    const token = jwt.sign({ id: user._id, role: user.role }, "secret key");

    // res.status(200);
    // res.json({ token, message: "Logged in successfully" });
    res.cookie("authcookie", token, { maxAge: 900000, httpOnly: true });
    res.redirect("/note");
  } catch (err) {
    res.status(500).render("user_login", {
      message: "Error logging in",
      error: err.message,
    });
  }
});

exports.user_login_get = asyncHandler(async (req, res, next) => {
  res.render("user_login", { message: "" });
});

exports.user_register_get = asyncHandler(async (req, res, next) => {
  res.render("user_register", { message: "" });
});

exports.user_logout_get = asyncHandler(async (req, res, next) => {
  res.cookie("authcookie", "", { maxAge: 900000, httpOnly: true });
  res.status(200).render("user_index", { message: "Logging out successfully" });
});

exports.user_admin_get = asyncHandler(async (req, res, next) => {
  const notes = await Note.find({})
    .populate({
      path: "user_id",
      select: "username",
    })
    .sort({ date: -1 })
    .exec();
  console.log(JSON.stringify(notes[0]));
  res.render("note_list_admin", { notes });
});
