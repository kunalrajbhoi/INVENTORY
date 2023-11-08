import { gql } from "apollo-server";
import { CategoryTypes } from "../types/categoryTypes.js";

export const CategorySchema = gql`
  ${CategoryTypes}

  type Query {
    getAllCategory: [Category]
    getCategory(id:ID):Category
  }

  type Mutation {
    createCategory(categoryName: String): Category
    updateCategory(id: ID categoryName: String): Category
    deleteCategory(id: ID!): Category
  }
`;
