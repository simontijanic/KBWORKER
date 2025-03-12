require("dotenv").config();

const express = require("express");
const session = require("express-session");
const flash = require('express-flash');

const app = express();

const userRoute = require("./routes/userRoute");

const databaseController = require("./controllers/databaseController");
const authMiddleware = require("./middleware/auth");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

app.use(authMiddleware.setUserAuth)
app.use(userRoute);

app.listen(3000, () => {
  databaseController();
  console.log("Server started on port 3000");
});
