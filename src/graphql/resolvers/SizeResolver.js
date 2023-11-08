// src/graphql/resolvers/SizeResolver.js

import { processFile } from "../../services/fileUploadService.js";
import jwt from "jsonwebtoken";
import authenticate from "../../middlewares/auth.js";

export const Query = {
  getAllSize: async (_, __, { models }) => {
    try {
      const size = await models.Size.find();
      return size;
    } catch (error) {
      throw new Error(error);
    }
  },
  getSize: async (_, { id }, { models }) => {
    try {
      return await models.Size.findById(id);
    } catch (error) {
      throw new Error(error);
    }
  },
};

export const Mutation = {
  createSize: async (_, args, { models }) => {
    try {
      const newSize = new models.Size({
        sizeName: args.sizeName,
      });

      await newSize.save();
      return newSize;
    } catch (error) {
      throw new Error(error);
    }
  },
  updateSize: async (_, args, { models }) => {
    try {
      const size = await models.Size.findById(args.id);
      if (args.sizeName) {
        size.sizeName = args.sizeName;
      }
      await size.save();
      return size;
    } catch (error) {
      throw new Error(error);
    }
  },
  deleteSize: async (_, { id }, { models }) => {
    try {
      const deletedSize = await models.Size.findByIdAndRemove(id);
      return deletedSize;
    } catch (error) {
      throw new Error(error);
    }
  },
};

export const Size = {};
