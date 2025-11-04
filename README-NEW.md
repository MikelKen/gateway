# GraphQL Gateway - Microservices RRHH

Este es el gateway GraphQL que conecta todos los microservicios del sistema RRHH con una arquitectura modular y bien organizada.

## 🏗️ Arquitectura

```
GraphQL Gateway (Node.js:4000)
├── service_erp (Spring Boot:8080) - Gestión de usuarios
├── service_bi (FastAPI:8001) - Analíticas y reportes
├── service_ml (Go Fiber:3001) - Productos y ML
└── service_ai (Node.js:4000) - Recomendaciones IA
```

## 📁 Estructura del Proyecto

```
service_ai/
├── src/
│   ├── schema/
│   │   ├── typeDefs.js              # Definiciones de tipos GraphQL
│   │   └── resolvers/
│   │       ├── index.js             # Combinador de resolvers
│   │       ├── userResolvers.js     # Resolvers para usuarios
│   │       ├── productResolvers.js  # Resolvers para productos
│   │       ├── analyticsResolvers.js # Resolvers para analíticas
│   │       └── aiResolvers.js       # Resolvers para AI
│   ├── services/
│   │   ├── config.js               # Configuración centralizada
│   │   └── microserviceClient.js   # Cliente HTTP para microservicios
│   └── server.js                   # Configuración del servidor Apollo
├── index.js                        # Punto de entrada
├── package.json
├── Dockerfile
└── README.md
```

## 🚀 Inicio Rápido

### Desarrollo Local

1. **Instalar dependencias:**

   ```bash
   npm install
   ```

2. **Ejecutar en modo desarrollo:**

   ```bash
   npm run dev
   ```

3. **Acceder al playground:**
   - GraphQL Playground: http://localhost:4000/graphql
   - Health Check: http://localhost:4000/health

### Docker

1. **Construir la imagen:**

   ```bash
   docker build -t graphql-gateway .
   ```

2. **Ejecutar el contenedor:**
   ```bash
   docker run -p 4000:4000 graphql-gateway
   ```

### Docker Compose (Todos los servicios)

```bash
# Desde el directorio raíz del proyecto
docker-compose up --build
```

## 🧪 Pruebas

### Query de Salud

```graphql
query {
  health
}
```

### Health Check Completo

```graphql
query {
  healthCheck {
    gateway
    services {
      service_erp {
        status
        message
      }
      service_bi {
        status
        message
      }
      service_ml {
        status
        message
      }
    }
  }
}
```

### Obtener Usuarios

```graphql
query {
  users {
    id
    name
    email
    department
  }
}
```

### Crear Usuario

```graphql
mutation {
  createUser(name: "Test User", email: "test@example.com", department: "IT") {
    id
    name
    email
  }
}
```

### Recomendaciones de AI

```graphql
query {
  recommendations(userId: "123") {
    id
    userId
    productId
    score
    reason
  }
}
```

## 📊 Endpoints de los Microservicios

- **Gateway GraphQL**: http://localhost:4000/graphql
- **Service ERP**: http://localhost:8080/api/\*
- **Service BI**: http://localhost:8001/\*
- **Service ML**: http://localhost:3001/api/\*

## 🔧 Configuración

### Variables de Entorno

```bash
# Puerto del gateway
PORT=4000

# Ambiente
NODE_ENV=development

# URLs de microservicios
SERVICE_ERP_URL=http://localhost:8080
SERVICE_BI_URL=http://localhost:8001
SERVICE_ML_URL=http://localhost:3001

# CORS
CORS_ORIGIN=*
```

## 📝 Esquema GraphQL

El gateway expone un esquema unificado que incluye:

- **Users**: Gestión de usuarios (service_erp)
- **Analytics**: Métricas y analíticas (service_bi)
- **Products**: Catálogo de productos (service_ml)
- **Recommendations**: Recomendaciones IA (service_ai)

Ver `graphql-examples.md` para ejemplos completos de queries y mutations.

## 🔄 Flujo de Datos

1. **Cliente** → Envía query GraphQL al Gateway
2. **Gateway** → Resuelve el query identificando el microservicio apropiado
3. **MicroserviceClient** → Hace llamada HTTP al microservicio correspondiente
4. **Microservicio** → Procesa la solicitud y devuelve datos
5. **Gateway** → Combina respuestas y devuelve resultado unificado al cliente

## 🚨 Manejo de Errores

- Timeout automático en llamadas HTTP (5 segundos por defecto)
- Logging detallado de requests y responses
- Fallback graceful cuando un microservicio no está disponible
- Validación de esquemas GraphQL

## 🔒 Seguridad

- CORS configurado
- Validación de entrada en resolvers
- Logging de errores sin exposición de detalles internos
- Rate limiting (próximamente)

## 📈 Monitoreo

- Health checks para cada microservicio
- Métricas de performance
- Logging estructurado
- Apollo Studio integration (próximamente)
