const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router
  .route("/")
  .get(productController.getAllProducts)
  .post(productController.createNewProduct)
  .patch(productController.updatedProduct)
  .delete(productController.deleteProduct);

module.exports = router;
