import { gql } from "apollo-server";
import { ColorTypes } from "../types/colorTypes.js";

export const ColorSchema = gql`
  ${ColorTypes}

  type Query {
    getAllColor: [Color]
    getColor(id:ID): Color

  }

  type Mutation {
    createColor(colorName: String): Color
    updateColor(id: ID colorName: String): Color
    deleteColor(id: ID!): Color
  }
`;
