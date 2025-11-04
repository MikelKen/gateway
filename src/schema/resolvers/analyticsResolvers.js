import { microserviceClient } from "../../services/microserviceClient.js";

export const analyticsResolvers = {
  Query: {
    analytics: async () => {
      return await microserviceClient.getAnalytics();
    },

    getAnalytics: async (_, { metric }) => {
      return await microserviceClient.getAnalyticsByMetric(metric);
    },
  },
};
