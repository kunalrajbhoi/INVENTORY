// src/graphql/resolvers/VandorResolver.js

import { processFile } from "../../services/fileUploadService.js";
import jwt from "jsonwebtoken";
import authenticate from "../../middlewares/auth.js";

export const Query = {
  getAllVandor: async (_, __, { models }) => {
    try {
      const vandor = await models.Vandor.find();
      return vandor;
    } catch (error) {
      throw new Error(error);
    }
  },
  getVandor: async (_, { id }, { models }) => {
    try {
      return await models.Vandor.findById(id);
    } catch (error) {
      throw new Error(error);
    }
  },
};

export const Mutation = {
  createVandor: async (_, args, { models }) => {
    try {
      const newVandor = new models.Vandor({
        vandorName: args.vandorName,
        companyName: args.companyName,
        balance: args.balance,
      });

      await newVandor.save();
      return newVandor;
    } catch (error) {
      throw new Error(error);
    }
  },
  updateVandor: async (_, args, { models }) => {
    try {
      const vandor = await models.Vandor.findById(args.id);
      if (args.vandorName) {
        vandor.vandorName = args.vandorName;
      }
      if (args.companyName) {
        vandor.companyName = args.companyName;
      }
      if (args.balance) {
        vandor.balance = args.balance;
      }
      await vandor.save();
      return vandor;
    } catch (error) {
      throw new Error(error);
    }
  },
  deleteVandor: async (_, { id }, { models }) => {
    try {
      const deletedVandor = await models.Vandor.findByIdAndRemove(id);
      return deletedVandor;
    } catch (error) {
      throw new Error(error);
    }
  },
};

export const Vandor = {};
