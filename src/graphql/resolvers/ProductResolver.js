// src/graphql/resolvers/StoreResolver.js

import { processFile } from "../../services/fileUploadService.js";
import jwt from "jsonwebtoken";
import authenticate from "../../middlewares/auth.js";

export const Query = {
  getAllProducts: async (_, __, { models }) => {
    try {
      const product = await models.Product.find();
      return product;
    } catch (error) {
      throw new Error(error);
    }
  },
  getProduct: async (_, { id }, { models }) => {
    try {
      return await models.Product.findById(id);
    } catch (error) {
      throw new Error(error);
    }
  },
};

export const Mutation = {
  createProduct: async (_, args, { models }) => {
    try {
      const newProduct = new models.Product({
        productName: args.productName,
        priveiwName: args.priveiwName,
        sellingPrice: args.sellingPrice,
        purchasePrice: args.purchasePrice,
        color: args.color,
        gender: args.gender,
        size: args.size,
        discount: args.discount,
        description: args.description,
      });

      await newProduct.save();
      return newProduct;
    } catch (error) {
      throw new Error(error);
    }
  },

  updateProduct: async (_, args, { models }) => {
    try {
      const updatedProduct = await models.Product.findByIdAndUpdate(
        args.id,
        {
          productName: args.productName,
          priveiwName: args.priveiwName,
          sellingPrice: args.sellingPrice,
          purchasePrice: args.purchasePrice,
          color: args.color,
          gender: args.gender,
          size: args.size,
          discount: args.discount,
          description: args.description,
        },
        { new: true }
      );
      return updatedProduct;
    } catch (error) {
      throw new Error(error);
    }
  },

  addImagetoProduct: async (_, args, { models }) => {
    try {
      const product = await models.Product.findById(args.productId);
      if (!product) {
        throw new Error("No Product Found");
      }
      const results = await Promise.all(args.productImages.map(processFile));
      const responseData = results.map((result) => ({
        image: result.uniqueFilename,
      }));
      const imagesfilepath = responseData.map(
        (data) => process.env.BASE_URL + data.image
      );

      const findexited = product.images.find(
        (obj) => obj.color === args.color && obj.gender === args.gender
      );
      if (findexited) {
        findexited.imagePath.push(...imagesfilepath);
      } else {
        const update = {
          imagePath: imagesfilepath,
          color: args.color,
          gender: args.gender,
        };
        product.images.push(update);
      }
      await product.save();
      return {
        massage: "Image Upload Successfully",
      };
    } catch (error) {
      throw new Error(error);
    }
  },

  deleteProduct: async (_, { id }, { models }) => {
    try {
      const deletedProduct = await models.Product.findByIdAndRemove(id);
      return deletedProduct;
    } catch (error) {
      throw new Error(error);
    }
  },
  productAllocatation: async (
    _,
    { productId, quantity, storeId, color, size, gender },
    { models }
  ) => {
    try {
      // Find the product by its ID
      const product = await models.Product.findById(productId);

      if (!product) {
        throw new Error("No Product Found");
      }

      // Initialize the storeAllocation array if it doesn't exist
      if (!product.storeAllocation) {
        product.storeAllocation = [];
      }

      let allocationFound = false;

      // Check if there is an existing allocation for the specified store
      for (const data of product.storeAllocation) {
        if (storeId.toString() === data.storeId.toString()) {
          const findexited = data.qty.find(
            (obj) =>
              obj.color === data.color &&
              obj.gender === data.gender &&
              obj.size === data.size
          );
          if (findexited) {
            findexited.quantity += quantity;
          } else {
            const update = {
              quantity: quantity,
              color: color,
              gender: gender,
              size: size,
            };
            data.qty.push(update);
          }
          allocationFound = true;
          break;
        }
      }

      // If no allocation was found, create a new one
      if (!allocationFound) {
        let array = [];
        const updated = {
          quantity: quantity,
          color: color,
          gender: gender,
          size: size,
        };
        array.push(updated);

        product.storeAllocation.push({ storeId: storeId, qty: array });
      }

      // Save and return the updated product
      await product.save();
      return product;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export const Product = {};
