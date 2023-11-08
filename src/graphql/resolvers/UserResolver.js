// src/graphql/resolvers/UserResolver.js

import { processFile } from "../../services/fileUploadService.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authenticate from "../../middlewares/auth.js";
import nodemailer from "nodemailer";
import axios from "axios";

// Configure the nodemailer transporter
// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: process.env.SMTP_PORT,
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
// });

export const Query = {
  getUser: authenticate(["admin", "customer"])(
    async (_, { id }, { models }) => {
      try {
        return await models.User.findById(id);
      } catch (error) {
        throw new Error(error);
      }
    }
  ),
};

export const Mutation = {
  registerUser: async (
    _,
    { firstName, lastName, email, mobileNo, password },
    { models }
  ) => {
    try {
      const existingUser = await models.User.findOne({ email });
      if (existingUser) {
        throw new Error("User already exists");
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = new models.User({
        firstName,
        lastName,
        email,
        mobileNo,
        password: hashedPassword,
      });
      await newUser.save();
      const token = newUser.generateAuthToken();

      return { token, user: newUser };
    } catch (error) {
      throw new Error(error);
    }
  },
};

export const User = {};
