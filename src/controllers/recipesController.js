import asyncHandler from "express-async-handler";
import Product from "../models/menuModel.js";
import Recipes from "../models/recipesModel.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getRecipes = asyncHandler(async (req, res) => {
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

  const count = await Recipes.countDocuments({ ...keyword });
  const recipes = await Recipes.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ recipes, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch single product
// @route   GET /api/Recipes/:id
// @access  Public
const getRecipesById = asyncHandler(async (req, res) => {
  const recipes = await Recipes.findById(req.params.id);

  if (recipes) {
    res.json(recipes);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand,
    category,
    countInStock,
    numReviews,
    description,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Create new recipe
// @route   POST /api/products/:id/reviews
// @access  Private
const createRecipes = asyncHandler(async (req, res) => {
  const recipes = new Recipes({
    user: req.user._id,
    nameRecipes: req.body.nameRecipes,
    image: req.body.image,
    preTime: req.body.preTime,
    cookTime: req.body.cookTime,
    serving: req.body.serving,
    category: req.body.category,
    descriptionRecipes: req.body.descriptionRecipes,
    Ingredientes: req.body.Ingredientes,
  });

  const recipe = await recipes.save();


    res.status(201).json(recipe);

    res.status(404);
    throw new Error("Product not found");
  
});

export {
  getRecipes,
  getRecipesById,
  deleteProduct,
  createProduct,
  updateProduct,
  createRecipes,
};
