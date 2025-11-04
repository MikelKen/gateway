// Configuración centralizada para el gateway
export const config = {
  port: process.env.PORT || 4000,
  nodeEnv: process.env.NODE_ENV || "development",

  // URLs de los microservicios
  services: {
    erp: {
      url: process.env.SERVICE_ERP_URL || "http://localhost:8080",
      name: "service_erp",
      graphqlEndpoint: process.env.ERP_GRAPHQL_ENDPOINT || "/graphql",
      timeout: parseInt(process.env.ERP_TIMEOUT) || 10000,
    },
    bi: {
      url: process.env.SERVICE_BI_URL || "http://localhost:8001",
      name: "service_bi",
    },
    ml: {
      url: process.env.SERVICE_ML_URL || "http://localhost:3001",
      name: "service_ml",
    },
  },

  // Configuración de Apollo Server
  apollo: {
    introspection: process.env.APOLLO_INTROSPECTION === "true" || true,
    playground: process.env.APOLLO_PLAYGROUND === "true" || true,
    path: process.env.APOLLO_PATH || "/graphql",
  },

  // Configuración de CORS
  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: process.env.CORS_CREDENTIALS === "true" || true,
  },

  // Configuración de timeouts
  timeouts: {
    default: parseInt(process.env.DEFAULT_TIMEOUT) || 5000,
    long: parseInt(process.env.LONG_TIMEOUT) || 10000,
  },

  // Configuración de logging
  logging: {
    level: process.env.LOG_LEVEL || "info",
    enableQueryLogging: process.env.ENABLE_QUERY_LOGGING === "true" || true,
  },

  // Configuración de retry para ERP
  retry: {
    attempts: parseInt(process.env.ERP_RETRY_ATTEMPTS) || 3,
    delay: parseInt(process.env.ERP_RETRY_DELAY) || 1000,
  },

  // Configuración de Health Check
  healthCheck: {
    interval: parseInt(process.env.HEALTH_CHECK_INTERVAL) || 30000,
    timeout: parseInt(process.env.HEALTH_CHECK_TIMEOUT) || 2000,
  },

  // Configuración de Rate Limiting (opcional)
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000, // 15 minutos
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  },
};
