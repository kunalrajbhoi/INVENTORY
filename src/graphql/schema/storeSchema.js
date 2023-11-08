import { gql } from "apollo-server";
import { StoreTypes } from "../types/storeTypes.js";

export const StoreSchema = gql`
  ${StoreTypes}

  type Query {
    getAllStore: [Store]
    getStore(id: ID!): Store
    getStoreProfile: Store
  }

  type Mutation {
    registerStore(
      storeName: String!
      storeKeeper: String!
      email: String!
      mobileNo: String
      password: String!
    ): AuthPayload!

    updateStore(
      id: ID!
      storeName: String
      storeKeeper: String
      email: String
      mobileNo: String
      password: String
      role: [String]
    ): Store!

    loginStore(email: String!, password: String!): AuthPayload!

    deleteStore(id: ID!): Store!

    changePassword(id: ID!, oldPassword: String!, newPassword: String!): Store!
  }
`;
