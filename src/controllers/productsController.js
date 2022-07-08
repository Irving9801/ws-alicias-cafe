import asyncHandler from "express-async-handler";
import Products from "../models/productsModel.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Products.countDocuments({ ...keyword });
  const products = await Products.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Products.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Products.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Producto eliminado correctamente" });
  } else {
    res.status(404);
    throw new Error("Product no encontrado");
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Products({
    user: req.user._id,
    nameProdut: req.body.nameProdut,
    price: req.body.price,
    imagesList: req.body.imagesList,
    category: req.body.category,
    descriptionProduct: req.body.descriptionProduct,
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { nameProdut, price, imagesList, category, descriptionProduct } =
    req.body;

  const product = await Products.findById(req.params.id);

  if (product) {
    product.nameProdut = nameProdut;
    product.price = price;
    product.descriptionProduct = descriptionProduct;
    product.imagesList = imagesList;
    product.category = category;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
};
