# Gateway Configuration Summary - ML Service Integration

## 🔧 Configuración Completada

El gateway `service_ai` ha sido completamente configurado para conectarse tanto al microservicio ERP (Spring Boot) como al microservicio ML (FastAPI). Aquí está el resumen completo:

### 📊 Servicios Configurados

1. **Service ERP (Spring Boot)** ✅

   - URL: `http://localhost:8080`
   - Endpoint GraphQL: `/api/graphql`
   - Timeout: 10 segundos

2. **Service ML (FastAPI)** ✅
   - URL: `http://localhost:8000`
   - Endpoint GraphQL: `/graphql`
   - Timeout: 8 segundos

### 📁 Archivos Creados/Modificados

#### Configuración ML

- ✅ `src/services/mlConfig.js` - Configuración completa de consultas y mutaciones ML
- ✅ `src/services/mlClient.js` - Cliente especializado para el servicio ML
- ✅ `src/schema/resolvers/mlResolvers.js` - Resolvers GraphQL para ML

#### Configuración ERP (ya existente)

- ✅ `src/services/erpConfig.js` - Configuración completa del ERP
- ✅ `src/services/erpClient.js` - Cliente especializado para ERP
- ✅ `src/schema/resolvers/erpResolvers.js` - Resolvers GraphQL para ERP

#### Archivos Principales Actualizados

- ✅ `src/services/microserviceClient.js` - Cliente principal con métodos para ambos servicios
- ✅ `src/schema/typeDefs.js` - Esquemas GraphQL completos para ERP y ML
- ✅ `src/schema/resolvers/index.js` - Exportación de todos los resolvers
- ✅ `src/services/config.js` - Configuración central actualizada
- ✅ `.env` - Variables de entorno actualizadas

### 🎯 Características Implementadas

#### Para el Servicio ML:

- **Features ERP**: Consultas de características de empresas, ofertas y postulantes
- **Candidatos MongoDB**: CRUD completo de candidatos con búsquedas avanzadas
- **Ofertas MongoDB**: Gestión de ofertas de trabajo con filtros
- **Empresas MongoDB**: Gestión de empresas con características ML
- **Predicciones ML**: Compatibilidad candidato-oferta, predicciones batch y top candidatos
- **Clustering**: Análisis de clusters de candidatos y búsqueda de similares
- **Información del Modelo**: Métricas, importancia de características y explicaciones
- **Utilidades**: Health check, sincronización y información del servicio

#### Para el Servicio ERP:

- **Empresas**: CRUD completo con paginación y filtros
- **Ofertas de Trabajo**: Gestión completa con estados y categorías
- **Postulaciones**: Seguimiento del proceso de postulación
- **Entrevistas**: Programación y gestión de entrevistas
- **Evaluaciones**: Sistema de evaluación de candidatos
- **Visualizaciones**: Tracking de visualizaciones de ofertas

### 🔄 Métodos Disponibles en MicroserviceClient

El cliente principal ahora expone más de **80 métodos** que incluyen:

#### Métodos ERP (50+):

- `getEmpresas()`, `createEmpresa()`, `updateEmpresa()`, `deleteEmpresa()`
- `getOfertas()`, `createOferta()`, `updateOferta()`, `deleteOferta()`
- `getPostulaciones()`, `createPostulacion()`, `updatePostulacion()`
- `getEntrevistas()`, `createEntrevista()`, `updateEntrevista()`
- `getEvaluaciones()`, `createEvaluacion()`, `updateEvaluacion()`
- `getVisualizaciones()`, `createVisualizacion()`

#### Métodos ML (30+):

- `getEmpresasFeatures()`, `getOfertasFeatures()`, `getPostulantesFeatures()`
- `getCandidatesFeatures()`, `getCandidateById()`, `getCandidatesByOffer()`
- `getJobOffersFeatures()`, `getJobOfferById()`, `getOffersByCompany()`
- `getCompaniesFeatures()`, `getCompanyByIdML()`
- `predictCompatibility()`, `predictCustomCompatibility()`, `predictBatchCompatibility()`
- `getTopCandidatesForOffer()`, `getModelInfo()`, `getFeatureImportance()`
- `analyzeCandidateClusters()`, `findSimilarCandidates()`
- `getMLHealthStatus()`, `getMLServiceInfo()`

### ⚙️ Configuración de Conexión

```javascript
// ERP Service
const erpConfig = {
  url: "http://localhost:8080",
  endpoint: "/api/graphql",
  timeout: 10000,
};

// ML Service
const mlConfig = {
  url: "http://localhost:8000",
  endpoint: "/graphql",
  timeout: 8000,
};
```

### 🔍 Health Check Integrado

El método `healthCheck()` ahora verifica ambos servicios:

```javascript
const status = await microserviceClient.healthCheck();
// Retorna estado de ERP y ML services
```

### 🚀 Uso del Gateway

#### Consultas GraphQL Disponibles:

**Para ERP:**

```graphql
query {
  empresas(limit: 10) {
    id
    razon_social
    sector
  }

  ofertas(filtro: { estado: "ACTIVA" }) {
    id
    titulo
    descripcion
    empresa {
      razon_social
    }
  }
}
```

**Para ML:**

```graphql
query {
  candidatesFeatures(query: "{ skills: 'python' }") {
    candidateId
    features
    skills
  }

  predictCompatibility(input: { candidateId: "123", offerId: "456" }) {
    compatibility
    confidence
    explanation
  }
}
```

### 📊 Esquema GraphQL Completo

El esquema incluye más de **50 tipos GraphQL** que cubren:

- Entidades ERP completas
- Features ML y predicciones
- Tipos de clustering y análisis
- Métricas y performance del modelo
- Inputs para predicciones personalizadas

### 🔧 Próximos Pasos

1. **Levantar los servicios:**

   ```bash
   # ERP Service (puerto 8080)
   cd microservicio-erp-springBoot
   ./mvnw spring-boot:run

   # ML Service (puerto 8000)
   cd service_ml
   python -m uvicorn main:app --host 0.0.0.0 --port 8000

   # Gateway (puerto 4000)
   cd service_ai
   npm start
   ```

2. **Probar las conexiones:**

   - Acceder a `http://localhost:4000/graphql` para GraphQL Playground
   - Ejecutar queries de health check
   - Probar consultas ERP y ML

3. **Monitoreo:**
   - Usar el health check integrado para verificar estado de servicios
   - Revisar logs para debugging
   - Verificar métricas de performance

## ✅ Configuración Completa

El gateway `service_ai` está ahora **completamente configurado** para actuar como punto único de acceso a los microservicios ERP y ML, proporcionando una API GraphQL unificada con más de 80 operaciones disponibles.

**Estado:** 🟢 COMPLETADO
**Servicios Integrados:** ERP ✅ | ML ✅
**Funcionalidades:** CRUD ✅ | Predicciones ✅ | Clustering ✅ | Health Check ✅
