// src/models/Size.js
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const Schema = mongoose.Schema;

const SizeSchema = new Schema(
  {
    sizeName: {
      type: String,
    },
  },
  { timestamps: true }
);

const Size = mongoose.model("Size", SizeSchema);
export default Size;
