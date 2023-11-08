// src/models/Gender.js
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const Schema = mongoose.Schema;

const GenderSchema = new Schema(
  {
    genderName: {
      type: String,
    },
  },
  { timestamps: true }
);

const Gender = mongoose.model("Gender", GenderSchema);
export default Gender;
