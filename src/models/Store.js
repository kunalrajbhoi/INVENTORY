// src/models/Store.js
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const Schema = mongoose.Schema;

const StoreSchema = new Schema(
  {
    storeName: {
      type: String,
    },
    storeKeeper: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    mobileNo: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: [String],
      enum: ["admin", "store"],
      default: ["store"],
    },
  },
  { timestamps: true }
);

StoreSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

const Store = mongoose.model("Store", StoreSchema);
export default Store;
