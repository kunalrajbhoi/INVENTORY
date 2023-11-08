// src/graphql/resolvers/ColorResolver.js

import { processFile } from "../../services/fileUploadService.js";
import jwt from "jsonwebtoken";
import authenticate from "../../middlewares/auth.js";

export const Query = {
  getAllColor: async (_, __, { models }) => {
    try {
      const color = await models.Color.find();
      return color;
    } catch (error) {
      throw new Error(error);
    }
  },
  getColor: async (_, { id }, { models }) => {
    try {
      return await models.Color.findById(id);
    } catch (error) {
      throw new Error(error);
    }
  },
};

export const Mutation = {
  createColor: async (_, args, { models }) => {
    try {
      const newColor = new models.Color({
        colorName: args.colorName,
      });

      await newColor.save();
      return newColor;
    } catch (error) {
      throw new Error(error);
    }
  },
  updateColor: async (_, args, { models }) => {
    try {
      const color = await models.Color.findById(args.id);
      if (args.colorName) {
        color.colorName = args.colorName;
      }
      await color.save();
      return color;
    } catch (error) {
      throw new Error(error);
    }
  },
  deleteColor: async (_, { id }, { models }) => {
    try {
      const deletedColor = await models.Color.findByIdAndRemove(id);
      return deletedColor;
    } catch (error) {
      throw new Error(error);
    }
  },
};

export const Color = {};
