const bcrypt = require("bcrypt");
const User = require("../models/userModel");

exports.getLogin = (req, res) =>{
    res.render("login");
}

exports.getRegister = (req, res) =>{
    res.render("registration");
}

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      req.flash('error', 'Username and password are required');
      return res.redirect('/register');
    }

    const existingUser = await User.findOne({
      username: username.toLowerCase(),
    });
    if (existingUser) {
      req.flash('error', 'Username already exists');
      return res.redirect('/register');
    }

    const bcryptedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username: username.toLowerCase(),
      password: bcryptedPassword,
      savedWorkouts: [],
      savedPrograms: [],
      savedGuides: [],
      savedCollections: [],
    });

    await newUser.save();
    req.flash('success', 'Registration successful! Please log in.');
    res.redirect("/login");
  } catch (error) {
    console.log(error);
    req.flash('error', 'An error occurred during registration');
    res.redirect('/register');
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      req.flash('error', 'Username and password are required');
      return res.redirect("/login");
    }

    const existingUser = await User.findOne({
      username: username.toLowerCase(),
    }).select('password');

    if (!existingUser) {
      req.flash('error', 'Invalid username or password');
      return res.redirect("/login");
    }

    if (!existingUser.password) {
      req.flash('error', 'Invalid username or password');
      return res.redirect("/login");
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatch) {
      req.flash('error', 'Invalid username or password');
      return res.redirect("/login");
    }

    req.session.user = existingUser;
    req.flash('success', 'Successfully logged in!');
    res.redirect("/");
  } catch (error) {
    console.error(error);
    req.flash('error', 'An error occurred during login');
    res.redirect("/login");
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      req.flash('error', 'Could not log out');
      return res.redirect('/');
    }
    res.redirect("/login");
  });
};