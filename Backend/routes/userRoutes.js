const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router
  .route("/")
  .get(userController.loginHandler)
  .post(userController.registerHandler);

module.exports = router;
