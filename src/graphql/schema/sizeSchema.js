import { gql } from "apollo-server";
import { SizeTypes } from "../types/sizeTypes.js";

export const SizeSchema = gql`
  ${SizeTypes}

  type Query {
    getAllSize: [Size]
    getSize(id:ID): Size
  }

  type Mutation {
    createSize(sizeName: String): Size
    updateSize(id: ID sizeName: String): Size
    deleteSize(id: ID!): Size
  }
`;
