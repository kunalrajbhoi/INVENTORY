import { gql } from "apollo-server";
import { SaleOrderTypes } from "../types/saleOrderTypes.js";

export const SaleOrderSchema = gql`
  ${SaleOrderTypes}

  type Query {
    getAllSaleOrder: [SaleOrder]
    getsaleOrder(id:ID): SaleOrder
  }

  type Mutation {
    createSaleOrder(
      products: [SaleProductInput]
      customerName: String
      customerNo: String
      paymentMethod: String
      totalPrice: Float
      date: String
    ): SaleOrder
    returnSaleOrder(
      products: [SaleProductInput]
      customerName: String
      customerNo: String
      paymentMethod: String
      totalPrice: Float
      date: String
    ): SaleOrder
  }

  input SaleProductInput {
    productId: ID
    discount: Float
    color: String
    size: String
    gender: String
    qty: Int
    salePrice: Float
  }
`;
