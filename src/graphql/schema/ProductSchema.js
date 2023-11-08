import { gql } from "apollo-server";
import { ProductTypes } from "../types/productTypes.js";

export const ProductSchema = gql`
  ${ProductTypes}

  type Query {
    getAllProducts: [Product]
    getProduct(id: ID): Product
  }

  type Mutation {
    createProduct(
      productName: String
      priveiwName: String
      size: [String]
      color: [String]
      gender: [String]
      sellingPrice: Float
      purchasePrice: Float
      discount: Float
      description: String
    ): Product

    updateProduct(
      id: ID!
      productName: String
      priveiwName: String
      size: [String]
      color: [String]
      gender: [String]
      sellingPrice: Float
      purchasePrice: Float
      discount: Float
      description: String
    ): Product

    addImagetoProduct(
      productId: ID
      productImages: [Upload]
      color: String
      gender: String
    ): Success

    productAllocatation(
      productId: ID
      storeId: ID
      quantity: Int
      gender: String
      color: String
      size: String
    ): Product

    deleteProduct(id: ID!): Product
  }
`;
