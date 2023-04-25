const User = require('../models/userModel');
const asyncErrorHandler = require('../utils/error_handlers/asyncErrorHandler');

exports.getAllUsers = asyncErrorHandler(async function (req, res) {
    const users = await User.find();

    res.status(200).json({
      status: "Success",
      data: {
        users,
      },
    });
});

exports.getUser = function (req, res) {
    res.status(500).json({
        status: "Error",
        message: "Route is not yet defined"
    });
}

exports.createUser = function (req, res) {
    res.status(500).json({
        status: "Error",
        message: "Route is not yet defined"
    });
}

exports.updateUser = function (req, res) {
    res.status(500).json({
        status: "Error",
        message: "Route is not yet defined"
    });
}

exports.deleteUser = function (req, res) {
    res.status(500).json({
        status: "Error",
        message: "Route is not yet defined"
    });
}
