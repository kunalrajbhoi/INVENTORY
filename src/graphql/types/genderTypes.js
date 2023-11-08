// src/graphql/types/genderTypes.js
import { gql } from "apollo-server";

export const GenderTypes = gql`
  #graphql
  type Gender {
    id:ID
    genderName: String
  }
`;
