// src/graphql/types/storeTypes.js
import { gql } from "apollo-server";

export const StoreTypes = gql`
  #graphql
  type Store {
    id: ID
    storeName: String
    storeKeeper: String
    email: String
    mobileNo: String
    role: [String]
  }

  type AuthPayload {
    token: String
    store: Store
  }
`;
