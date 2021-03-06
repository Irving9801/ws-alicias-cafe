import mongoose from "mongoose";

const RecipesSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    nameRecipes: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    preTime: {
      type: String,
      required: true,
    },
    cookTime: {
      type: String,
      required: true,
    },
    serving: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    descriptionRecipes: {
      type: String,
      required: true,
    },
    Ingredientes: {
      type: Array,
      required: true,
    },
    Instruccion: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Recipes = mongoose.model("Recipes", RecipesSchema);

export default Recipes;
