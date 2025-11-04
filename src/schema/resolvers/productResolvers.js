import { microserviceClient } from "../../services/microserviceClient.js";

export const productResolvers = {
  Query: {
    products: async () => {
      return await microserviceClient.getProducts();
    },

    product: async (_, { id }) => {
      return await microserviceClient.getProductById(id);
    },
  },

  Mutation: {
    createProduct: async (_, { name, price, category }) => {
      const productData = { name, price, category };
      return await microserviceClient.createProduct(productData);
    },
  },
};
