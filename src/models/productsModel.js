import mongoose from "mongoose";

const ImagesSchema = mongoose.Schema(
  {
    link: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

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
    discount: {
      type: String,
      require: false,
    },
    category: {
      type: String,
      required: true,
    },
    descriptionProduct: {
      type: String,
      required: true,
    },
    imagesList: [ImagesSchema],
  },
  {
    timestamps: true,
  }
);

const Products = mongoose.model("products", ProductsSchema);

export default Products;
