// src/models/Vandor.js
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const Schema = mongoose.Schema;

const VandorSchema = new Schema(
  {
    vandorName: {
      type: String,
    },
    companyName:{
        type:String,
    },
    balance:{
        type:Number,
    },
  },
  { timestamps: true }
);

const Vandor = mongoose.model("Vandor", VandorSchema);
export default Vandor;
