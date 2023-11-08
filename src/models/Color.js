// src/models/Color.js
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const Schema = mongoose.Schema;

const ColorSchema = new Schema(
  {
    colorName: {
      type: String,
    },
  },
  { timestamps: true }
);

const Color = mongoose.model("Color", ColorSchema);
export default Color;
