import mongoose from "mongoose";
const ProductsSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    nameProdut: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    descriptionProduct: {
      type: String,
      required: true,
    },
    imagesList: {
      type: Array,
      required: true,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Products = mongoose.model("products", ProductsSchema);

export default Products;
