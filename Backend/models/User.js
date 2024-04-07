const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: String,
  latname: String,
  username: String,
  password: String,
});

module.exports = mongoose.model("User", userSchema);
