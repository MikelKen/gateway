import express from "express";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import { typeDefs } from "./schema/typeDefs.js";
import { resolvers } from "./schema/resolvers/index.js";
import { config } from "./services/config.js";

export async function createServer() {
  const app = express();

  // Configurar CORS
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN || "*",
      credentials: true,
    })
  );

  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true }));

  // Crear servidor Apollo
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: config.apollo.introspection,
    playground: config.apollo.playground,
    context: ({ req }) => {
      // Aquí puedes agregar contexto adicional como autenticación
      return {
        req,
        // authUser: req.user, // si tienes autenticación
      };
    },
    formatError: (error) => {
      console.error("GraphQL Error:", error);
      return {
        message: error.message,
        code: error.extensions?.code,
        path: error.path,
      };
    },
  });

  await server.start();
  server.applyMiddleware({
    app,
    path: config.apollo.path,
    cors: false, // Ya configuramos CORS arriba
  });

  // Ruta de salud básica
  app.get("/health", (req, res) => {
    res.status(200).json({
      status: "healthy",
      service: "graphql-gateway",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  });

  // Ruta para información del servidor
  app.get("/", (req, res) => {
    res.status(200).json({
      message: "GraphQL Gateway for Microservices RRHH",
      graphql: `http://localhost:${config.port}${config.apollo.path}`,
      playground: `http://localhost:${config.port}${config.apollo.path}`,
      health: `http://localhost:${config.port}/health`,
      version: "1.0.0",
    });
  });

  return { app, server };
}

export async function startServer() {
  try {
    const { app, server } = await createServer();

    app.listen(config.port, () => {
      console.log("🚀 ====================================");
      console.log(`📡 GraphQL Gateway running at http://localhost:${config.port}${server.graphqlPath}`);
      console.log(`🎮 GraphQL Playground available at http://localhost:${config.port}${server.graphqlPath}`);
      console.log(`💚 Health check at http://localhost:${config.port}/health`);
      console.log(`🌍 Environment: ${config.nodeEnv}`);
      console.log("🚀 ====================================");
    });
  } catch (error) {
    console.error("❌ Error starting server:", error);
    process.exit(1);
  }
}
