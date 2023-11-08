import { gql } from "apollo-server";
import { PaymentMethodTypes } from "../types/paymentMethodTypes.js";

export const PaymentMethodSchema = gql`
  ${PaymentMethodTypes}

  type Query {
    getAllPaymentMethod: [PaymentMethod]
    getPaymentMethod(id:ID):PaymentMethod
  }

  type Mutation {
    createPaymentMethod(paymentMethodName: String): PaymentMethod
    updatePaymentMethod(id: ID paymentMethodName: String): PaymentMethod
    deletePaymentMethod(id: ID!): PaymentMethod
  }
`;
