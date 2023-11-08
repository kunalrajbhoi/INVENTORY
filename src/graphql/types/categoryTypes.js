// src/graphql/types/categoryTypes.js
import { gql } from "apollo-server";

export const CategoryTypes = gql`
  #graphql
  type Category {
    id:ID
    categoryName: String
  }
`;
