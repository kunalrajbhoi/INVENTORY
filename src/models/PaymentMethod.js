// src/models/PaymentMethod.js
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const Schema = mongoose.Schema;

const PaymentMethodSchema = new Schema(
  {
    paymentMethodName: {
      type: String,
    },
  },
  { timestamps: true }
);

const PaymentMethod = mongoose.model("PaymentMethod", PaymentMethodSchema);
export default PaymentMethod;
