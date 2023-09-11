const model = require("../models/user");
const User = model.User;
const bcrypt = require("bcrypt");
const cookie = require("../utils/features");
const { ErrorHandler } = require("../middlewares/error");

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    next(error);
  }
};

exports.register = async (req, res, next) => {
  const { name, email, password } = req.body;
  let user = await User.findOne({ email });

  if (user) return next(new ErrorHandler("User Already Exists..", 400));
  const hashedPassword = await bcrypt.hash(password, 10);
  user = await User.create({ name, email, password: hashedPassword });
  cookie.sendCookie(res, user, "Registered Successfully...", 201);
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) return next(new ErrorHandler("User Not Exists", 400));
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return next(new ErrorHandler("Incorrect Password", 400));

    cookie.sendCookie(res, user, `Welcome user ${user.name}`, 201);
  } catch (error) {
    next(error);
  }
};

exports.getMyProfile = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

exports.logout = (req, res) => {
  res
    .status(200)
    .cookie("token", null, {
      httpOnly: true,
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true
    })
    .json({
      success: true,
      message: "Logged out...",
      user: req.user,
    });
};
