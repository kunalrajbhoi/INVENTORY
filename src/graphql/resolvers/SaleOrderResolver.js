// src/graphql/resolvers/SaleOrderResolver.js

import { processFile } from "../../services/fileUploadService.js";
import jwt from "jsonwebtoken";
import authenticate from "../../middlewares/auth.js";

export const Query = {
  getAllSaleOrder: async (_, __, { models, req }) => {
    try {
      const color = await models.SaleOrder.find();
      return color;
    } catch (error) {
      throw new Error(error);
    }
  },
  getsaleOrder: async (_, { id }, { models }) => {
    try {
      return await models.SaleOrder.findById(id);
    } catch (error) {
      throw new Error(error);
    }
  },
};


export const Mutation = {
  createSaleOrder: authenticate(["admin", "customer", "store"])(
    async (_, args, { models, req }) => {
      try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const store = await models.Store.findById(decoded._id);
        const newSale = new models.SaleOrder({
          products: args.products,
          customerName: args.customerName,
          customerNo: args.customerNo,
          paymentMethod: args.paymentMethod,
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
            findexited.quantity -= data.qty;
            const found = item.storeAllocation.find(
              (obj) => obj.storeId.toString() === store.id.toString()
            );
            if (found) {
              const foundstore = found.qty.find(
                (obj) =>
                obj.color === data.color &&
                obj.gender === data.gender &&
                obj.size === data.size
              );
              console.log(found.qty)
              console.log(foundstore);
              console.log(data)
              if (foundstore) {
                foundstore.quantity -= data.qty;
              } else {
                throw new Error("Not available in this combination!");
              }
            } else {
              throw new Error("Product not in store!");
            }
          } else {
            throw new Error("Product not in stock!");
          }
          await item.save();
        }
        await newSale.save();
        return newSale;
      } catch (error) {
        throw new Error(error);
      }
    }
  ),
  returnSaleOrder: authenticate(["admin", "store"])(
    async (_, args, { models, req }) => {
      try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const store = await models.Store.findById(decoded._id);
        const newSale = new models.SaleOrder({
          products: args.products,
          customerName: args.customerName,
          customerNo: args.customerNo,
          paymentMethod: args.paymentMethod,
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
            findexited.quantity += data.qty;
            const found = item.storeAllocation.find(
              (obj) => obj.storeId.toString() === store.id.toString()
            );
            if (found) {
              const foundstore = found.qty.find(
                (obj) =>
                  obj.color === data.color &&
                  obj.gender === data.gender &&
                  obj.size === data.size
              );
              if (foundstore) {
                foundstore.quantity += data.qty;
              } else {
                throw new Error("Not available in this combination!");
              }
            } else {
              throw new Error("Product not in store!");
            }
          } else {
            throw new Error("Product not in stock!");
          }
          await item.save();
        }
        await newSale.save();
        return newSale;
      } catch (error) {
        throw new Error(error);
      }
    }
  ),
};

export const SaleProduct = {
  productId: async (products, _, { models }) => {
    try {
      return await models.Product.findById(products.productId);
    } catch (error) {
      throw new Error(error);
    }
  },
};
