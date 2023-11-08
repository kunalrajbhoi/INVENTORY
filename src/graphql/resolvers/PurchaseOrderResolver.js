// src/graphql/resolvers/PurchaseOrderResolver.js

import { processFile } from "../../services/fileUploadService.js";
import jwt from "jsonwebtoken";
import authenticate from "../../middlewares/auth.js";

export const Query = {
  getAllPurchaseOrder: async (_, __, { models }) => {
    try {
      const color = await models.PurchaseOrder.find();
      return color;
    } catch (error) {
      console.log("error",error);
      throw new Error(error);
    }
  },
  getpurchaseOrder: async (_, { id }, { models }) => {
    try {
      return await models.PurchaseOrder.findById(id);
    } catch (error) {
      throw new Error(error);
    }
  },
};

export const Mutation = {
  createPurchaseOrder: async (_, args, { models }) => {
    try {
      const newPurchase = new models.PurchaseOrder({
        products: args.products,
        vandor: args.vandor,
        totalPrice: args.totalPrice,
        date: args.date,
      });
      for (const data of args.products) {
        const item = await models.Product.findById(data.productId);
        const findexited = item.stock.find(
          (obj) =>
            obj.color === data.color &&
            obj.gender === data.gender &&
            obj.size === data.size
        );
        if (findexited) {
          findexited.quantity += data.quantity;
        } else {
          const update = {
            quantity: data.quantity,
            color: data.color,
            gender: data.gender,
            size: data.size,
          };
          item.stock.push(update);
        }
        await item.save();
      }
      await newPurchase.save();
      return newPurchase;
    } catch (error) {
      throw new Error(error);
    }
  },
};

export const PurchaseOrder = {
  vandor: async (purchaseOrder, _, { models }) => {
    try {
      return await models.Vandor.findById(purchaseOrder.vandor);
    } catch (error) {
      throw new Error(error);
    }
  },
};

export const PurchaseProduct = {
  productId: async (products, _, { models }) => {
    try {
      return await models.Product.findById(products.productId);
    } catch (error) {
      throw new Error(error);
    }
  },
};
