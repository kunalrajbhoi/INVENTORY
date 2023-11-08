// src/models/SaleOrder.js
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const Schema = mongoose.Schema;

const SaleProductsSchema = new mongoose.Schema({
  productId: {
    type: Schema.Types.ObjectId,
  },
  discount: {
    type: Number,
  },
  qty: {
    type: Number,
  },
  color: String,
  size: String,
  gender: String,
  salePrice: {
    type: Number,
  },
});

const SaleOrderSchema = new Schema(
  {
    products: [SaleProductsSchema],
    customerName: {
      type: String,
    },
    customerNo: {
      type: String,
    },
    totalPrice: {
      type: Number,
    },
    paymentMethod: {
      type: String,
    },
    date: {
      type: Date,
    },
  },
  { timestamps: true }
);

const SaleOrder = mongoose.model("SaleOrder", SaleOrderSchema);
export default SaleOrder;
