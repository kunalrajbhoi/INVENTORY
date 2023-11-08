// src/graphql/types/productTypes.js
import { gql } from "apollo-server";

export const ProductTypes = gql`
  #graphql
  type StoreAllocation {
    id: ID!
    storeId: ID
    qty: [QTY]
  }
  type QTY {
    quantity: Int
    gender: String
    color: String
    size: String
  }
  type Product {
    id: ID
    productName: String
    priveiwName: String
    sellingPrice: Float
    purchasePrice: Float
    images: [Pimages]
    size: [String]
    color: [String]
    gender: [String]
    discount: Float
    description: String
    storeAllocation: [StoreAllocation]
    stock: [Pstock]
  }

  type Pstock {
    quantity: Int
    gender: String
    color: String
    size: String
  }

  type Pimages {
    imagePath: [String]
    color: String
    gender: String
  }

  type Success {
    massage: String
  }
`;
