const ErrorHandler = require("../utils/error_handlers/errorHandlerFactory");
const User = require("../models/userModel");
const asyncErrorHandler = require("../utils/error_handlers/asyncErrorHandler");
const jwt = require("jsonwebtoken");

const signToken = function(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
}
 
exports.signUp = asyncErrorHandler(async function (req, res, next) {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: "Success",
    token,
    data: {
      tour: newUser,
    },
  });
});

exports.login = asyncErrorHandler(async function (req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please provide email and password", 400));
  }

  const user = await User.findOne({ email: email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new ErrorHandler("Incorrect email or password", 401));
  }

  const token = signToken(user._id);

  res.status(200).json({
    status: "Success",
    token,
  });
});