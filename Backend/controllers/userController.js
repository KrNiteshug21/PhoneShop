const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const loginHandler = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ message: "All fields required" });
  }

  const fetchedUser = await User.findOne({ username }).lean().exec();
  if (!fetchedUser) {
    return res.json(400).json({ message: "Username Not Found" });
  }

  const isValidUsername = username === fetchedUser.username;
  const isValidPassword = bcrypt.compare(password, fetchedUser.password);

  if (!isValidUsername) {
    return res.status(400).json({ message: "Username do not match" });
  }
  if (!isValidPassword) {
    return res.status(400).json({ message: "Incorrect password" });
  }

  res.json({ mesaage: `${fetchedUser.username} logged in successfully` });
});

const registerHandler = asyncHandler(async (req, res) => {
  const { firstname, lastname, username, password } = req.body;
  if (!firstname || !lastname || !username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const duplicate = await User.findOne({ username }).lean().exec();
  if (duplicate) {
    return res
      .status(409)
      .json({ message: `${duplicate.username} already present` });
  }

  const hashPwd = await bcrypt.hash(password, 10);
  const userObj = { firstname, lastname, username, password: hashPwd };

  const result = await User.create(userObj);
  if (result?.username) {
    res
      .status(400)
      .json({ message: `${result.username} successfully registered` });
  } else {
    res.status(400).json({ message: "Issue regarding registration" });
  }
});

module.exports = { loginHandler, registerHandler };
