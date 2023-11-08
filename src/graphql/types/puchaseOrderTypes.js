// src/graphql/types/purchaseOrderTypes.js
import { gql } from "apollo-server";

export const PurchaseOrderTypes = gql`
  #graphql
  type PurchaseOrder {
    id:ID
    products: [PurchaseProduct]
    vandor: Vandor
    totalPrice: Float
    date: String
  }
  type PurchaseProduct{
    id:ID
    productId:Product
    quantity:Int
    color: String
    size:String
    gender:String
    puchasePrice:Float
  }
`;
