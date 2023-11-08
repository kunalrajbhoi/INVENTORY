import { gql } from "apollo-server";
import { UserSchema } from "./schema/userSchema.js";
import { StoreSchema } from "./schema/storeSchema.js";
import { ProductSchema } from "./schema/productSchema.js";
import { CategorySchema } from "./schema/categorySchema.js";
import { ColorSchema } from "./schema/colorSchema.js";
import { GenderSchema } from "./schema/genderSchema.js";
import { SizeSchema } from "./schema/sizeSchema.js";
import { VandorSchema } from "./schema/vandorSchema.js";
import { PurchaseOrderSchema } from "./schema/purchaseOrderSchema.js";
import { SaleOrderSchema } from "./schema/saleOrderSchema.js";
import { PaymentMethodSchema } from "./schema/paymentMethodSchema.js";


export const RootSchema = gql`
  scalar Upload
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

export const typeDefs = [
  RootSchema,
  UserSchema,
  StoreSchema,
  ProductSchema,
  CategorySchema,
  ColorSchema,
  SizeSchema,
  VandorSchema,
  PurchaseOrderSchema,
  SaleOrderSchema,
  PaymentMethodSchema,
  GenderSchema,
];
