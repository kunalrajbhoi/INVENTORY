// src/graphql/resolvers/PaymentMethodResolver.js

import { processFile } from "../../services/fileUploadService.js";
import jwt from "jsonwebtoken";
import authenticate from "../../middlewares/auth.js";

export const Query = {
  getAllPaymentMethod: async (_, __, { models }) => {
    try {
      const paymentMethod = await models.PaymentMethod.find();
      return paymentMethod;
    } catch (error) {
      throw new Error(error);
    }
  },
  getPaymentMethod: async (_, { id }, { models }) => {
    try {
      return await models.PaymentMethod.findById(id);
    } catch (error) {
      throw new Error(error);
    }
  },
};

export const Mutation = {
  createPaymentMethod: async (_, args, { models }) => {
    try {
      const newPaymentMethod = new models.PaymentMethod({
        paymentMethodName: args.paymentMethodName,
      });

      await newPaymentMethod.save();
      return newPaymentMethod;
    } catch (error) {
      throw new Error(error);
    }
  },
  updatePaymentMethod: async (_, args, { models }) => {
    try {
      const paymentMethod = await models.PaymentMethod.findById(args.id);
      if (args.paymentMethodName) {
        paymentMethod.paymentMethodName = args.paymentMethodName;
      }
      await paymentMethod.save();
      return paymentMethod;
    } catch (error) {
      throw new Error(error);
    }
  },
  deletePaymentMethod: async (_, { id }, { models }) => {
    try {
      const deletedPaymentMethod = await models.PaymentMethod.findByIdAndRemove(id);
      return deletedPaymentMethod;
    } catch (error) {
      throw new Error(error);
    }
  },
};

export const PaymentMethod = {};
