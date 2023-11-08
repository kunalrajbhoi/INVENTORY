// src/graphql/resolvers/GenderResolver.js

import { processFile } from "../../services/fileUploadService.js";
import jwt from "jsonwebtoken";
import authenticate from "../../middlewares/auth.js";

export const Query = {
  getAllGender: async (_, __, { models }) => {
    try {
      const gender = await models.Gender.find();
      return gender;
    } catch (error) {
      throw new Error(error);
    }
  },
  getGender: async (_, { id }, { models }) => {
    try {
      return await models.Gender.findById(id);
    } catch (error) {
      throw new Error(error);
    }
  },
};

export const Mutation = {
  createGender: async (_, args, { models }) => {
    try {
      const newGender = new models.Gender({
        genderName: args.genderName,
      });

      await newGender.save();
      return newGender;
    } catch (error) {
      throw new Error(error);
    }
  },
  updateGender: async (_, args, { models }) => {
    try {
      const gender = await models.Gender.findById(args.id);
      if (args.genderName) {
        gender.genderName = args.genderName;
      }
      await gender.save();
      return gender;
    } catch (error) {
      throw new Error(error);
    }
  },
  deleteGender: async (_, { id }, { models }) => {
    try {
      const deletedGender = await models.Gender.findByIdAndRemove(id);
      return deletedGender;
    } catch (error) {
      throw new Error(error);
    }
  },
};

export const Gender = {};
