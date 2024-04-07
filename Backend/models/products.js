const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  category: String,
  images: [{ type: String }],
  brand: String,
  price: String,
  desc: String,
  stock: { type: Boolean, default: true },
});

module.exports = mongoose.model("Products", productSchema);
