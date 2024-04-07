const asyncHandler = require("express-async-handler");
const productDB = require("../models/products");

const getAllProducts = asyncHandler(async (req, res) => {
  const fetchedProducts = await productDB.find().lean();
  if (!fetchedProducts?.length) {
    return res.status(400).json({ message: "No products found" });
  }

  res.json(fetchedProducts);
});

const createNewProduct = asyncHandler(async (req, res) => {
  const { id, title, category, images, price, brand, desc, stock } = req.body;
  if (
    !title ||
    !category ||
    !Array.isArray(images) ||
    !images.length ||
    !brand ||
    !price ||
    !desc ||
    !stock
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const duplicate = await productDB.findById(id).lean().exec();
  if (duplicate) {
    return res.status(409).json({ message: "Product already present" });
  }

  const productObj = { title, category, images, price, brand, desc, stock };
  const reply = await productDB.create(productObj);
  if (reply) {
    return res.status().json({ message: `${reply.title} has been added.` });
  } else {
    return res.status(409).json({ message: "Unable to process request." });
  }
});

const updatedProduct = asyncHandler(async (req, res) => {
  const { title, category, images, price, brand, desc, stock } = req.body;
  if (
    !title ||
    !category ||
    !Array.isArray(images) ||
    !images.length ||
    !brand ||
    !price ||
    !desc
  ) {
    res.status(400).json({ message: "All fields are required" });
  }

  const product = await productDB.findOne({ title }).exec();
  if (!product) {
    return res.status(400).json({ message: "Product Not Found" });
  }

  product.title = title;
  product.category = category;
  product.images = images;
  product.brand = brand;
  product.price = price;
  product.desc = desc;
  product.stock = stock;

  const result = await product.save();
  const reply = `${result.title} updated`;
  res.json(reply);
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Product Id is required" });
  }

  const product = await productDB.findById(id).exec();
  if (!product) {
    return res.status(400).json({ message: "Product Not Found" });
  }

  const result = await product.deleteOne();
  const reply = `${result.title} with ${result._id} deleted`;
  res.json(reply);
});

module.exports = {
  getAllProducts,
  createNewProduct,
  updatedProduct,
  deleteProduct,
};
