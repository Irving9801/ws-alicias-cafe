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
const deleteRecipes = asyncHandler(async (req, res) => {
  const product = await Recipes.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Receta eliminada correctamente" });
  } else {
    res.status(404);
    throw new Error("Receta no encontrada");
  }
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    nameRecipes,
    image,
    preTime,
    cookTime,
    serving,
    category,
    descriptionRecipes,
    Ingredientes,
    Instruccion,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.nameRecipes = nameRecipes;
    product.Instruccion = Instruccion;
    product.descriptionRecipes = descriptionRecipes;
    product.image = image;
    product.preTime = preTime;
    product.serving = serving;
    product.Ingredientes = Ingredientes;
    product.cookTime = cookTime;
    product.category = category;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Producto no encontrado");
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
    Instruccion: req.body.Instruccion,
  });

  const recipe = await recipes.save();

  res.status(201).json(recipe);

  res.status(404);
  throw new Error("Product not found");
});

export {
  getRecipes,
  getRecipesById,
  deleteRecipes,
  updateProduct,
  createRecipes,
};
