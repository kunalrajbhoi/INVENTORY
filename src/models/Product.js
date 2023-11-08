// src/models/Product.js
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    productName: {
      type: String,
    },
    priveiwName: {
      type: String,
    },
    purchasePrice: {
      type: Number,
    },
    sellingPrice: {
      type: Number,
    },
    images: [
      {
        imagePath: [String],
        color: String,
        gender: String,
      },
    ],
    discount: {
      type: Number,
    },
    gender: {
      type: [String],
    },
    color: {
      type: [String],
    },
    size: {
      type: [String],
    },
    description: {
      type: String,
    },
    stock: [
      {
        quantity: Number,
        gender: String,
        color: String,
        size: String,
      },
    ],
    storeAllocation: [
      {
        storeId: {
          type: mongoose.Schema.Types.ObjectId,
        },
        qty: [
          {
            quantity: Number,
            gender: String,
            color: String,
            size: String,
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;
