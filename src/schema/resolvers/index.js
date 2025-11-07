import { userResolvers } from "./userResolvers.js";
import { productResolvers } from "./productResolvers.js";
import { analyticsResolvers } from "./analyticsResolvers.js";
import { aiResolvers } from "./aiResolvers.js";
import { erpResolvers } from "./erpResolvers.js";
import { mlResolvers } from "./mlResolvers.js";
import { biResolvers } from "./biResolvers.js";

// Combinar todos los resolvers
export const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...productResolvers.Query,
    ...analyticsResolvers.Query,
    ...aiResolvers.Query,
    ...erpResolvers.Query,
    ...mlResolvers.Query,
    ...biResolvers.Query,
  },

  Mutation: {
    ...userResolvers.Mutation,
    ...productResolvers.Mutation,
    ...aiResolvers.Mutation,
    ...erpResolvers.Mutation,
    ...mlResolvers.Mutation,
  },
};
