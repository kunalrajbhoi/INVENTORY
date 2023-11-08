// src/graphql/types/userTypes.js
import { gql } from "apollo-server";

export const UserType = gql`
  #graphql
  type User {
    id: ID!
    firstName: String
    lastName: String
    email: String
    profilepic: String
    mobileNo: String
    password: String
    role: [String]
  }
`;
