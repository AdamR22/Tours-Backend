const express = require("express");

const {
  getUser,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userControllers");

const { signUp , login } = require("../controllers/authControllers");

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);

router.route("/").get(getAllUsers).post(createUser);

router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
