import { gql } from "apollo-server";
import { VandorTypes } from "../types/vandorTypes.js";

export const VandorSchema = gql`
  ${VandorTypes}

  type Query {
    getAllVandor: [Vandor]
    getVandor(id: ID): Vandor
  }

  type Mutation {
    createVandor(
      vandorName: String
      companyName: String
      balance: Float
    ): Vandor
    updateVandor(
      id: ID
      vandorName: String
      companyName: String
      balance: Float
    ): Vandor
    deleteVandor(id: ID!): Vandor
  }
`;
