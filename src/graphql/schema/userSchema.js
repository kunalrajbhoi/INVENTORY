import { gql } from "apollo-server";
import { UserType } from "../types/userTypes.js";

export const UserSchema = gql`
  ${UserType}

  type Query {
    getUser(id: ID!): User
  }
  
  type Mutation {
    registerUser(
      firstName: String!
      lastName: String!
      email: String!
      mobileNo: String!
      password: String!
    ): AuthPayload!
  }
`;
