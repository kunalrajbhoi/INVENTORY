// src/graphql/resolvers.js
import { default as GraphQLUpload } from "graphql-upload/GraphQLUpload.mjs";

import { User } from "./resolvers/UserResolver.js";
import { Query as UserQuery } from "./resolvers/UserResolver.js";
import { Mutation as UserMutation } from "./resolvers/UserResolver.js";

import { Store } from "./resolvers/StoreResolver.js";
import { Query as StoreQuery } from "./resolvers/StoreResolver.js";
import { Mutation as StoreMutation } from "./resolvers/StoreResolver.js";

import { Product } from "./resolvers/ProductResolver.js";
import {Query as ProductQuery } from "./resolvers/ProductResolver.js";
import {Mutation as ProductMutation } from "./resolvers/ProductResolver.js";

import { Category } from "./resolvers/CategoryResolver.js";
import {Query as CategoryQuery } from "./resolvers/CategoryResolver.js";
import {Mutation as CategoryMutation } from "./resolvers/CategoryResolver.js";

import { Color } from "./resolvers/ColorResolver.js";
import {Query as ColorQuery } from "./resolvers/ColorResolver.js";
import {Mutation as ColorMutation } from "./resolvers/ColorResolver.js";

import { Gender } from "./resolvers/GenderResolver.js";
import {Query as GenderQuery } from "./resolvers/GenderResolver.js";
import {Mutation as GenderMutation } from "./resolvers/GenderResolver.js";

import { Size } from "./resolvers/SizeResolver.js";
import {Query as SizeQuery } from "./resolvers/SizeResolver.js";
import {Mutation as SizeMutation } from "./resolvers/SizeResolver.js";

import { Vandor } from "./resolvers/VandorResolver.js";
import {Query as VandorQuery } from "./resolvers/VandorResolver.js";
import {Mutation as VandorMutation } from "./resolvers/VandorResolver.js";

import { PurchaseOrder } from "./resolvers/PurchaseOrderResolver.js";
import { PurchaseProduct } from "./resolvers/PurchaseOrderResolver.js";
import { Query as PurchaseOrderQuery } from "./resolvers/PurchaseOrderResolver.js";
import {Mutation as PurchaseOrderMutation } from "./resolvers/PurchaseOrderResolver.js";

import { SaleProduct } from "./resolvers/SaleOrderResolver.js";
import { Query as SaleOrderQuery } from "./resolvers/SaleOrderResolver.js";
import {Mutation as SaleOrderMutation } from "./resolvers/SaleOrderResolver.js";

import { PaymentMethod } from "./resolvers/PaymentMethodResolver.js";
import { Query as PaymentMethodQuery } from "./resolvers/PaymentMethodResolver.js";
import {Mutation as PaymentMethodMutation } from "./resolvers/PaymentMethodResolver.js";

export const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    ...UserQuery,
    ...StoreQuery,
    ...ProductQuery,
    ...CategoryQuery,
    ...ColorQuery,
    ...GenderQuery,
    ...SizeQuery,
    ...VandorQuery,
    ...PurchaseOrderQuery,
    ...SaleOrderQuery,
    ...PaymentMethodQuery,
  },
  Mutation: {
    ...UserMutation,
    ...StoreMutation,
    ...ProductMutation,
    ...CategoryMutation,
    ...ColorMutation,
    ...GenderMutation,
    ...SizeMutation,
    ...VandorMutation,
    ...PurchaseOrderMutation,
    ...SaleOrderMutation,
    ...PaymentMethodMutation,
  },
  User,
  Store,
  Product,
  Category,
  Color,
  Gender,
  Size,
  Vandor,
  PurchaseOrder,
  SaleProduct,
  PaymentMethod,
  PurchaseProduct,
};
