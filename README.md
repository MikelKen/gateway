# GraphQL Gateway - Microservices RRHH

Este es el gateway GraphQL que conecta todos los microservicios del sistema RRHH.

## 🏗️ Arquitectura

```
GraphQL Gateway (Node.js:4000)
├── service_erp (Spring Boot:8080) - Gestión de usuarios
├── service_bi (FastAPI:8001) - Analíticas y reportes
├── service_ml (Go Fiber:3001) - Productos y ML
└── service_ai (Node.js:4000) - Recomendaciones IA
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

## 📊 Endpoints de los Microservicios

- **Gateway GraphQL**: http://localhost:4000/graphql
- **Service ERP**: http://localhost:8080/api/\*
- **Service BI**: http://localhost:8001/\*
- **Service ML**: http://localhost:3001/api/\*

## 🔧 Configuración

Ver archivo `.env.example` para configuraciones de ambiente.

## 📝 Esquema GraphQL

El gateway expone un esquema unificado que incluye:

- **Users**: Gestión de usuarios (service_erp)
- **Analytics**: Métricas y analíticas (service_bi)
- **Products**: Catálogo de productos (service_ml)
- **Recommendations**: Recomendaciones IA (service_ai)

Ver `graphql-examples.md` para ejemplos completos de queries y mutations.
