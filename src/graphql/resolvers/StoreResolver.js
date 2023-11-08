// src/graphql/resolvers/StoreResolver.js

import { processFile } from "../../services/fileUploadService.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authenticate from "../../middlewares/auth.js";

export const Query = {
  getStore: async (_, { id }, { models }) => {
    try {
      return await models.Store.findById(id);
    } catch (error) {
      throw new Error(error);
    }
  },
  getAllStore: async (_, __, { models }) => {
    try {
      return await models.Store.find();
    } catch (error) {
      throw new Error(error);
    }
  },

  getStoreProfile: authenticate(["admin", "store"])(
    async (_, __, { models, req }) => {
      try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return await models.Store.findById(decoded._id);
      } catch (error) {
        throw new Error(error);
      }
    }
  ),
};

export const Mutation = {
  registerStore: async (
    _,
    { storeName, storeKeeper, email, mobileNo, password },
    { models }
  ) => {
    try {
      const existingStore = await models.Store.findOne({ email });
      if (existingStore) {
        throw new Error("Store already exists");
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const newStore = new models.Store({
        storeName,
        storeKeeper,
        email,
        mobileNo,
        password: hashedPassword,
      });
      await newStore.save();

      const token = newStore.generateAuthToken();

      return { token, store: newStore };
    } catch (error) {
      throw new Error(error);
    }
  },

  loginStore: async (_, { email, password }, { models }) => {
    try {
      const store = await models.Store.findOne({
        $or: [{ email: email }, { mobileNo: email }],
      });
      if (!store) {
        throw new Error("Store not found");
      }

      const isPasswordValid = await bcrypt.compare(password, store.password);
      if (!isPasswordValid) {
        throw new Error("Incorrect password");
      }

      const token = jwt.sign({ _id: store._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

      return {
        token,
        store,
      };
    } catch (error) {
      throw new Error(error);
    }
  },

  deleteStore: authenticate(["admin"])(async (_, { id }, { models }) => {
    try {
      const store = await models.Store.findById(id);
      if (!store) {
        throw new Error("Store not found");
      }

      await models.Store.deleteOne({ _id: id });
      return store;
    } catch (error) {
      throw new Error(error);
    }
  }),

  updateStore: authenticate(["admin"])(
    async (
      _,
      { id, storeName, storeKeeper, email, mobileNo, password, role },
      { models }
    ) => {
      try {
        const store = await models.Store.findById(id);
        if (!store) {
          throw new Error("Store not found");
        }

        if (storeName) store.storeName = storeName;
        if (storeKeeper) store.storeKeeper = storeKeeper;
        if (email) store.email = email;
        if (mobileNo) store.mobileNo = mobileNo;
        if (password) {
          const hashedPassword = await bcrypt.hash(password, 12);
          store.password = hashedPassword;
        }
        if (role) store.role = role;

        const updatedStore = await store.save();
        return updatedStore;
      } catch (error) {
        throw new Error(error);
      }
    }
  ),

  changePassword: authenticate(["admin", "customer"])(
    async (_, { id, oldPassword, newPassword }, { models }) => {
      try {
        const store = await models.Store.findById(id);
        if (!store) {
          throw new Error("Store not found");
        }

        const isMatch = await bcrypt.compare(oldPassword, store.password);
        if (!isMatch) {
          throw new Error("Invalid current password");
        }

        const hashedPassword = await bcrypt.hash(newPassword, 12);
        store.password = hashedPassword;

        const updatedStore = await store.save();
        return updatedStore;
      } catch (error) {
        throw new Error(error);
      }
    }
  ),
  
};

export const Store = {};
