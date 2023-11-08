import { gql } from "apollo-server";
import { GenderTypes } from "../types/genderTypes.js";

export const GenderSchema = gql`
  ${GenderTypes}

  type Query {
    getAllGender: [Gender]
    getGender(id:ID): Gender

  }

  type Mutation {
    createGender(genderName: String): Gender
    updateGender(id: ID genderName: String): Gender
    deleteGender(id: ID!): Gender
  }
`;
