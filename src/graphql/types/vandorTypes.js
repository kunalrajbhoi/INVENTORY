// src/graphql/types/sizeTypes.js
import { gql } from "apollo-server";

export const VandorTypes = gql`
  #graphql
  type Vandor {
    id:ID
    vandorName: String
    companyName: String
    balance: Float
  }
`;
