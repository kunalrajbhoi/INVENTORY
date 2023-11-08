import { gql } from "apollo-server";
import { PurchaseOrderTypes } from "../types/puchaseOrderTypes.js";

export const PurchaseOrderSchema = gql`
  ${PurchaseOrderTypes}

  type Query {
    getAllPurchaseOrder: [PurchaseOrder]
    getpurchaseOrder(id:ID): PurchaseOrder

  }

  type Mutation {
    createPurchaseOrder(
      products: [PurchaseProductInput]
      vandor: ID
      totalPrice: Float
      date: String
    ): PurchaseOrder
  }

  input PurchaseProductInput {
    productId: ID
    puchasePrice: Float
    quantity: Int
    color:String
    gender:String
    size:String
  }
`;
