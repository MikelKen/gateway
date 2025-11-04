import { microserviceClient } from "../../services/microserviceClient.js";

export const userResolvers = {
  Query: {
    users: async () => {
      return await microserviceClient.getUsers();
    },

    user: async (_, { id }) => {
      return await microserviceClient.getUserById(id);
    },
  },

  Mutation: {
    createUser: async (_, { name, email, department }) => {
      const userData = { name, email, department };
      return await microserviceClient.createUser(userData);
    },
  },
};
