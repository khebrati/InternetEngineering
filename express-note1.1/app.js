let createError = require("http-errors");
let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

let indexRouter = require("./routes/index");
let notesRouter = require("./routes/notes");
let usersRouter = require("./routes/users");

const dbUrl = "mongodb://127.0.0.1:27017/my_db2";
const conn = mongoose
  .connect(dbUrl)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

let app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use(function(req,res,next){
//   console.log(req.cookies);
//   next();
// })

const authMiddleware = (req, res, next) => {
  const token = req.cookies["authcookie"];
  // const token = req.header("Authorization");
  // if (!token)
  //   return res
  //     .status(401)
  //     .json({ message: "Access denied. No token provided." });
  if (!token)
    res
      .status(401)
      .render("user_index", {
        message: "Access denied. No token provided.",
      });

  try {
    const decoded = jwt.verify(token, "secret key");
    req.user = decoded;
    next();
  } catch (err) {
    // res.status(400).json({ message: "Invalid token" });
    res.status(400).render("user_index", { message: "Invalid token" });
  }
};

const roleMiddleware = (requiredRole) => (req, res, next) => {
  // console.log(JSON.stringify(req.user));
  if (req.user.role !== requiredRole)
    return res.status(403).json({ message: "Access forbidden" });
  next();
};

app.use("/user/admin", [authMiddleware, roleMiddleware("admin")]);

app.use("/note", authMiddleware);

app.use("/", indexRouter);
app.use("/note", notesRouter);
app.use("/user", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
