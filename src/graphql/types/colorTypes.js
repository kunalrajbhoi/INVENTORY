// src/graphql/types/colorTypes.js
import { gql } from "apollo-server";

export const ColorTypes = gql`
  #graphql
  type Color {
    id:ID
    colorName: String
  }
`;
