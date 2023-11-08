// src/models/PurchaseOrder.js
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const Schema = mongoose.Schema;

const PurchaseProductsSchema = new mongoose.Schema({
  productId: {
    type: Schema.Types.ObjectId,
  },
  quantity: {
    type: Number,
  },
  color: String,
  size: String,
  gender: String,
  puchasePrice: {
    type: Number,
  },
});

const PurchaseOrderSchema = new Schema(
  {
    products: [PurchaseProductsSchema],
    vandor: {
      type: Schema.Types.ObjectId,
    },
    totalPrice: {
      type: Number,
    },
    date: {
      type: Date,
    },
  },
  { timestamps: true }
);

const PurchaseOrder = mongoose.model("PurchaseOrder", PurchaseOrderSchema);
export default PurchaseOrder;
