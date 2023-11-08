// src/graphql/resolvers/CategoryResolver.js

import { processFile } from "../../services/fileUploadService.js";
import jwt from "jsonwebtoken";
import authenticate from "../../middlewares/auth.js";

export const Query = {
  getAllCategory: async (_, __, { models }) => {
    try {
      const category = await models.Category.find();
      return category;
    } catch (error) {
      throw new Error(error);
    }
  },
  getCategory: async (_, { id }, { models }) => {
    try {
      return await models.Category.findById(id);
    } catch (error) {
      throw new Error(error);
    }
  },
};

export const Mutation = {
  createCategory: async (_, args, { models }) => {
    try {
      const newCategory = new models.Category({
        categoryName: args.categoryName,
      });

      await newCategory.save();
      return newCategory;
    } catch (error) {
      throw new Error(error);
    }
  },
  updateCategory: async (_, args, { models }) => {
    try {
      const category = await models.Category.findById(args.id);
      if (args.categoryName) {
        category.categoryName = args.categoryName;
      }
      await category.save();
      return category;
    } catch (error) {
      throw new Error(error);
    }
  },
  deleteCategory: async (_, { id }, { models }) => {
    try {
      const deletedCategory = await models.Category.findByIdAndRemove(id);
      return deletedCategory;
    } catch (error) {
      throw new Error(error);
    }
  },
};

export const Category = {};
