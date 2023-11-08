// src/graphql/types/saleOrderTypes.js
import { gql } from "apollo-server";

export const SaleOrderTypes = gql`
  #graphql
  type SaleOrder {
    id: ID
    products: [SaleProduct]
    customerName: String
    customerNo: String
    totalPrice: Float
    paymentMethod: String
    date: String
  }
  type SaleProduct {
    id: ID
    discount: Float
    productId: Product
    color: String
    size: String
    gender: String
    qty: Int
    salePrice: Float
  }
`;
