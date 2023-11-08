// src/graphql/types/paymentMethodTypes.js
import { gql } from "apollo-server";

export const PaymentMethodTypes = gql`
  #graphql
  type PaymentMethod {
    id:ID
    paymentMethodName: String
  }
`;
