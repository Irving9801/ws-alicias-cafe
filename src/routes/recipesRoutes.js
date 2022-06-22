import express from "express";
const router = express.Router();

import {
  createRecipes,
  getRecipes,
  getRecipesById,
} from "../controllers/recipesController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getRecipes).post(protect, admin, createRecipes);
router.route("/:id").get(getRecipesById);

export default router;
