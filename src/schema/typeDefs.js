import { gql } from "apollo-server-express";

export const typeDefs = gql`
  # Tipos de datos existentes
  type User {
    id: ID!
    name: String!
    email: String!
    department: String
  }

  type Product {
    id: ID!
    name: String!
    price: Float!
    category: String
  }

  type Analytics {
    id: ID!
    metric: String!
    value: Float!
    timestamp: String!
    source: String!
    tags: [String!]!
  }

  type AIRecommendation {
    id: ID!
    userId: ID!
    productId: ID!
    score: Float!
    reason: String
  }

  # Tipos de datos del ERP (Spring Boot)
  scalar UUID
  scalar DateTime

  type Empresa {
    id: UUID!
    nombre: String!
    correo: String!
    rubro: String!
  }

  type OfertaTrabajo {
    id: UUID!
    titulo: String!
    descripcion: String!
    salario: Float
    ubicacion: String
    requisitos: String
    fechaPublicacion: String
    empresa: Empresa!
  }

  type Postulacion {
    id: UUID!
    nombre: String!
    aniosExperiencia: Int!
    nivelEducacion: String!
    habilidades: String!
    idiomas: String!
    certificaciones: String!
    puestoActual: String!
    urlCv: String!
    fechaPostulacion: String!
    estado: String!
    oferta: OfertaTrabajo!
  }

  type Entrevista {
    id: UUID!
    fecha: String!
    duracionMin: Int
    objetivosTotales: String
    objetivosCubiertos: String
    entrevistador: String
    postulacion: Postulacion!
  }

  type Evaluacion {
    id: UUID!
    calificacionTecnica: Float
    calificacionActitud: Float
    calificacionGeneral: Float
    comentarios: String
    entrevista: Entrevista!
  }

  type VisualizacionOferta {
    id: UUID!
    fechaVisualizacion: String!
    origen: String!
    oferta: OfertaTrabajo!
  }

  # Health Status types
  type HealthStatus {
    gateway: String!
    services: ServiceHealth!
  }

  type ServiceHealth {
    service_erp: ServiceStatus!
    service_bi: ServiceStatus!
    service_ml: ServiceStatus!
  }

  type ServiceStatus {
    status: String!
    message: String
  }

  # Queries
  type Query {
    # Queries de salud y estado
    health: String!
    healthCheck: HealthStatus!

    # Queries para service_erp (Spring Boot)
    users: [User!]!
    user(id: ID!): User

    # Queries ERP - Empresas
    empresas: [Empresa!]!
    empresa(id: UUID!): Empresa

    # Queries ERP - Ofertas de Trabajo
    ofertasTrabajo: [OfertaTrabajo!]!
    ofertaTrabajo(id: UUID!): OfertaTrabajo

    # Queries ERP - Postulaciones
    postulaciones: [Postulacion!]!
    postulacion(id: UUID!): Postulacion

    # Queries ERP - Entrevistas
    entrevistas: [Entrevista!]!
    entrevista(id: UUID!): Entrevista

    # Queries ERP - Evaluaciones
    evaluaciones: [Evaluacion!]!
    evaluacion(id: UUID!): Evaluacion

    # Queries ERP - Visualizaciones de Ofertas
    visualizacionesOferta: [VisualizacionOferta!]!
    visualizacionOferta(id: UUID!): VisualizacionOferta

    # Queries para service_bi (FastAPI)
    analytics: [Analytics!]!
    getAnalytics(metric: String!): [Analytics!]!

    # Queries para service_ml (Go Fiber)
    products: [Product!]!
    product(id: ID!): Product

    # Queries para service_ai (Node.js - este mismo)
    recommendations(userId: ID!): [AIRecommendation!]!
  }

  # Mutations
  type Mutation {
    # Mutations para usuarios (legacy)
    createUser(name: String!, email: String!, department: String): User!

    # Mutations ERP - Empresas
    createEmpresa(nombre: String!, correo: String!, rubro: String!): Empresa!
    deleteEmpresa(id: UUID!): String!

    # Mutations ERP - Ofertas de Trabajo
    createOfertaTrabajo(
      titulo: String!
      descripcion: String!
      salario: Float
      ubicacion: String
      requisitos: String
      fechaPublicacion: String
      empresaId: UUID!
    ): OfertaTrabajo!
    deleteOfertaTrabajo(id: UUID!): String!

    # Mutations ERP - Postulaciones
    createPostulacion(
      nombre: String!
      aniosExperiencia: Int!
      nivelEducacion: String!
      habilidades: String!
      idiomas: String!
      certificaciones: String!
      puestoActual: String!
      urlCv: String!
      fechaPostulacion: String!
      estado: String!
      ofertaId: UUID!
    ): Postulacion!
    deletePostulacion(id: UUID!): String!

    # Mutations ERP - Entrevistas
    createEntrevista(
      fecha: String!
      duracionMin: Int
      objetivosTotales: String
      objetivosCubiertos: String
      entrevistador: String
      postulacionId: UUID!
    ): Entrevista!
    deleteEntrevista(id: UUID!): String!

    # Mutations ERP - Evaluaciones
    createEvaluacion(
      calificacionTecnica: Float
      calificacionActitud: Float
      calificacionGeneral: Float
      comentarios: String
      entrevistaId: UUID!
    ): Evaluacion!
    deleteEvaluacion(id: UUID!): String!

    # Mutations ERP - Visualizaciones de Ofertas
    createVisualizacionOferta(fechaVisualizacion: String!, origen: String!, ofertaId: UUID!): VisualizacionOferta!
    deleteVisualizacionOferta(id: UUID!): String!

    # Mutations para productos (legacy)
    createProduct(name: String!, price: Float!, category: String): Product!

    # Mutations para AI
    generateRecommendation(userId: ID!, productId: ID!): AIRecommendation!
  }

  # Subscriptions (para futuras implementaciones)
  type Subscription {
    userCreated: User!
    productCreated: Product!
    recommendationGenerated: AIRecommendation!
  }
`;
