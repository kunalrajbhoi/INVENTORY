// src/graphql/types/sizeTypes.js
import { gql } from "apollo-server";

export const SizeTypes = gql`
  #graphql
  type Size {
    id:ID
    sizeName: String
  }
`;
