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
    timestamp: String!
    services: ServiceHealthCollection!
  }

  type ServiceHealthCollection {
    erp: ServiceStatus
    ml: ServiceStatus
    bi: ServiceStatus
  }

  type ServiceStatus {
    status: String!
    message: String
    error: String
    timestamp: String
    statusCode: Int
    service: String
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

    # Queries ML - Features ERP
    empresasFeatures(filter: EmpresaFilter, limit: Int): [EmpresaFeature!]!
    ofertasFeatures(filter: OfertaFilter, limit: Int): [OfertaFeature!]!
    postulantesFeatures(filter: PostulanteFilter, limit: Int): [PostulanteFeature!]!

    # Queries ML - Candidatos MongoDB
    candidatesFeatures(query: FeatureQueryInput): CandidateFeatureList!
    candidateById(candidateId: ID!): CandidateFeature
    candidatesByOffer(offerId: ID!, limit: Int): [CandidateFeature!]!

    # Queries ML - Ofertas MongoDB
    jobOffersFeatures(query: FeatureQueryInput): JobOfferFeatureList!
    jobOfferById(offerId: ID!): JobOfferFeature
    offersByCompany(companyId: ID!, limit: Int): [JobOfferFeature!]!

    # Queries ML - Empresas MongoDB
    companiesFeatures(query: FeatureQueryInput): CompanyFeatureList!
    companyById(companyId: ID!): CompanyFeature

    # Queries ML - Predicciones
    predictCompatibility(input: CompatibilityPredictionInput!): CompatibilityPrediction!
    predictCustomCompatibility(input: CustomCompatibilityPredictionInput!): CustomCompatibilityResult!
    predictBatchCompatibility(input: BatchCompatibilityInput!): BatchCompatibilityResult!
    getTopCandidatesForOffer(input: TopCandidatesInput!): [CompatibilityPrediction!]!

    # Queries ML - Modelo
    modelInfo: ModelInfo
    featureImportance(topN: Int): ModelFeatureImportance
    explainPrediction(candidateId: ID!, offerId: ID!): PredictionExplanation
    trainingDataSummary: TrainingDataSummary
    modelPerformance: PerformanceMetrics
    isModelLoaded: Boolean!
    modelStatus: String!

    # Queries ML - Clustering
    analyzeCandidateClusters(input: ClusteringQueryInput): ClusterAnalysis
    findSimilarCandidates(input: SimilarCandidatesInput!): SimilarCandidates
    getClusterProfileDetails(input: ClusterProfileInput!): ClusterProfile

    # Queries ML - Utilidades
    collectionInfo(collectionName: String!): FeatureCollectionInfo

    # Queries para service_bi (FastAPI)
    analytics: [Analytics!]!
    getAnalytics(metric: String!): [Analytics!]!

    # Queries para service_ml (Go Fiber) - Legacy
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

    # Mutations ML - Modelo
    retrainModel(input: ModelTrainingInput!): ModelTrainingResult!
    updateModelConfig(input: ModelConfigInput!): ModelConfigResult!
    syncData(input: DataSyncInput!): DataSyncResult!
    clearCache(cacheType: String!): CacheResult!
  }

  # ==========================================
  # TIPOS DE DATOS ML (MACHINE LEARNING)
  # ==========================================

  # Tipos de Features (ERP Data)
  type EmpresaFeature {
    id: ID!
    nombre: String!
    correo: String!
    rubro: String!
    ubicacion: String
    tamano_empresa: String
    anos_mercado: Int
    tecnologias_usadas: [String!]
    beneficios_ofrecidos: [String!]
  }

  type OfertaFeature {
    id: ID!
    titulo: String!
    descripcion: String!
    salario: Float
    ubicacion: String
    requisitos: String
    nivel_experiencia: String
    tipo_contrato: String
    modalidad_trabajo: String
    empresa_id: ID!
    tecnologias_requeridas: [String!]
  }

  type PostulanteFeature {
    id: ID!
    nombre: String!
    anios_experiencia: Int!
    nivel_educacion: String!
    habilidades: String!
    idiomas: String!
    certificaciones: String!
    puesto_actual: String!
    salario_esperado: Float
    disponibilidad: String
  }

  # Tipos de Candidatos (MongoDB)
  type CandidateFeature {
    id: ID!
    name: String!
    experience_years: Int!
    education_level: String!
    skills: [String!]!
    languages: [String!]!
    certifications: [String!]!
    current_position: String!
    expected_salary: Float
    cluster_id: Int
    profile_features: [String!]
  }

  type JobOfferFeature {
    id: ID!
    title: String!
    description: String!
    salary_range: String
    location: String
    requirements: [String!]!
    experience_level: String!
    contract_type: String
    work_modality: String
    company_id: ID!
    required_skills: [String!]
    benefits: [String!]
  }

  type CompanyFeature {
    id: ID!
    name: String!
    email: String!
    industry: String!
    location: String
    company_size: String
    years_in_market: Int
    technologies_used: [String!]
    benefits_offered: [String!]
    open_positions: Int
  }

  # Tipos de Predicciones ML
  type CompatibilityPrediction {
    candidate_id: ID
    candidateId: ID
    offer_id: ID
    compatibility_score: Float
    prediction_confidence: Float
    probability: Float
    ranking: Int
    recommendation: String!
    explanation: PredictionExplanation
    timestamp: String
    # Campos adicionales para predictCustomCompatibility
    probabilityPercentage: String
    compatibilityLevel: String
    summary: String
    strengths: [String!]
    suggestions: [String!]
  }

  # Tipo específico para predictCustomCompatibility
  type CustomCompatibilityResult {
    probability: Float
    prediction: Boolean
    confidence: String
    probabilityPercentage: String!
    compatibilityLevel: String!
    recommendation: String!
    summary: String!
    strengths: [String!]!
    weaknesses: [String!]
    suggestions: [String!]!
    detailedAnalysis: String
    decisionFactors: [String!]
    modelUsed: String
    confidenceScore: Float
    predictionDate: String
  }

  type PredictionExplanation {
    key_factors: [String!]!
    score_breakdown: [ScoreBreakdown!]!
    improvement_suggestions: [String!]
    feature_contributions: [FeatureContribution!]
    decision_factors: [String!]
    similarity_analysis: SimilarityAnalysis
  }

  type ScoreBreakdown {
    category: String!
    score: Float!
    weight: Float!
    impact: String!
  }

  type FeatureContribution {
    feature_name: String!
    contribution: Float!
    normalized_value: Float!
    importance: Float!
  }

  type SimilarityAnalysis {
    skill_match: Float!
    experience_match: Float!
    education_match: Float!
    location_compatibility: Float!
  }

  # Tipos de Clustering
  type ClusterAnalysis {
    cluster_count: Int!
    total_candidates: Int!
    cluster_profiles: [ClusterProfile!]!
    clustering_metrics: ClusteringMetrics!
    timestamp: String!
  }

  type ClusterProfile {
    cluster_id: Int!
    cluster_label: String!
    candidate_count: Int!
    avg_experience: Float!
    common_skills: [String!]!
    salary_range: String!
    education_distribution: [EducationDistribution!]!
    centroid_features: [String!]
    typical_profile: TypicalProfile
    diversity_metrics: DiversityMetrics
    representative_members: [ID!]
  }

  type ClusteringMetrics {
    silhouette_score: Float!
    davies_bouldin_score: Float!
    calinski_harabasz_score: Float!
  }

  type EducationDistribution {
    level: String!
    count: Int!
    percentage: Float!
  }

  type TypicalProfile {
    avg_experience: Float!
    common_skills: [String!]!
    education_modes: [String!]!
    salary_statistics: SalaryStatistics!
  }

  type SalaryStatistics {
    min_salary: Float!
    max_salary: Float!
    avg_salary: Float!
    median_salary: Float!
  }

  type DiversityMetrics {
    skill_diversity: Float!
    experience_spread: Float!
    education_variety: Float!
  }

  type SimilarCandidates {
    target_candidate_id: ID!
    targetCandidateId: ID!
    targetClusterId: Int
    similar_candidates: [SimilarCandidate!]!
    similarCandidates: [SimilarCandidate!]!
    search_criteria: SearchCriteria!
    similarityCriteria: [String!]
    timestamp: String!
  }

  type SimilarCandidate {
    candidate_id: ID!
    candidateId: ID!
    similarity_score: Float!
    shared_characteristics: [String!]!
    cluster_id: Int
    clusterId: Int
    clusterConfidence: Float
    distanceToCenter: Float
    distance_metrics: DistanceMetrics!
  }

  type DistanceMetrics {
    euclidean_distance: Float!
    cosine_similarity: Float!
    jaccard_similarity: Float!
  }

  type SearchCriteria {
    similarity_threshold: Float!
    max_results: Int!
    clustering_method: String!
  }

  # Tipos de Modelo ML
  type ModelInfo {
    model_name: String!
    model_version: String!
    model_type: String!
    training_date: String!
    performance_metrics: PerformanceMetrics!
    feature_count: Int!
    training_samples: Int!
    is_loaded: Boolean!
  }

  type PerformanceMetrics {
    accuracy: Float!
    precision: Float!
    recall: Float!
    f1_score: Float!
    auc_roc: Float
    confusion_matrix: [[Int!]!]
    classification_report: String
  }

  type ModelFeatureImportance {
    model_name: String!
    features: [FeatureImportance!]!
    total_features: Int!
    timestamp: String!
  }

  type FeatureImportance {
    feature_name: String!
    importance_score: Float!
    feature_type: String!
    description: String
  }

  type TrainingDataSummary {
    total_samples: Int!
    feature_count: Int!
    target_distribution: [TargetDistribution!]!
    data_quality_metrics: DataQualityMetrics!
    last_updated: String!
  }

  type TargetDistribution {
    value: String!
    count: Int!
    percentage: Float!
  }

  type DataQualityMetrics {
    completeness: Float!
    consistency: Float!
    validity: Float!
    missing_values: Int!
  }

  # Tipos de listas con paginacion
  type CandidateFeatureList {
    candidates: [CandidateFeature!]!
    total_count: Int!
    page_info: PageInfo!
  }

  type JobOfferFeatureList {
    job_offers: [JobOfferFeature!]!
    total_count: Int!
    page_info: PageInfo!
  }

  type CompanyFeatureList {
    companies: [CompanyFeature!]!
    total_count: Int!
    page_info: PageInfo!
  }

  type PageInfo {
    has_next_page: Boolean!
    has_previous_page: Boolean!
    start_cursor: String
    end_cursor: String
  }

  # Tipos de resultados de operaciones
  type BatchCompatibilityResult {
    predictions: [CompatibilityPrediction!]!
    batch_summary: BatchSummary!
    timestamp: String!
  }

  type BatchSummary {
    total_predictions: Int!
    average_score: Float!
    high_compatibility_count: Int!
    processing_time: Float!
  }

  type ModelTrainingResult {
    training_id: ID!
    status: String!
    message: String!
    estimated_duration: Int!
    timestamp: String!
  }

  type ModelConfigResult {
    config_id: ID!
    applied_settings: [String!]!
    status: String!
    message: String!
    timestamp: String!
  }

  type DataSyncResult {
    sync_id: ID!
    source: String!
    destination: String!
    records_processed: Int!
    status: String!
    timestamp: String!
  }

  type CacheResult {
    cache_type: String!
    cleared_items: Int!
    status: String!
    timestamp: String!
  }

  type FeatureCollectionInfo {
    collection_name: String!
    document_count: Int!
    size_bytes: Int!
    indexes: [String!]!
    last_modified: String!
    schema_info: String
  }

  # Inputs para filtros y queries
  input EmpresaFilter {
    nombre: String
    rubro: String
    ubicacion: String
  }

  input OfertaFilter {
    titulo: String
    ubicacion: String
    nivel_experiencia: String
    empresa_id: ID
  }

  input PostulanteFilter {
    nivel_educacion: String
    anios_experiencia_min: Int
    anios_experiencia_max: Int
  }

  input FeatureQueryInput {
    limit: Int
    offset: Int
    filters: String
    sort_by: String
    sort_order: String
  }

  input CompatibilityPredictionInput {
    candidate_id: ID!
    offer_id: ID!
    include_explanation: Boolean
  }

  input CustomCompatibilityPredictionInput {
    candidateData: CandidateDataInput!
    offerData: OfferDataInput!
    includeExplanation: Boolean
  }

  input CandidateDataInput {
    aniosExperiencia: Int!
    nivelEducacion: String!
    habilidades: String!
    idiomas: String!
    certificaciones: String
    puestoActual: String
    salarioEsperado: Float
  }

  input OfferDataInput {
    titulo: String!
    salario: Float
    ubicacion: String
    requisitos: String
    contract_type: String
  }

  input BatchCompatibilityInput {
    predictions: [CompatibilityPredictionInput!]!
    include_explanations: Boolean
  }

  input TopCandidatesInput {
    offer_id: ID
    offerId: ID
    limit: Int
    topN: Int
    min_score: Float
  }

  input ClusteringQueryInput {
    algorithm: String
    n_clusters: Int
    include_metrics: Boolean
  }

  input SimilarCandidatesInput {
    candidate_id: ID
    candidateId: ID
    similarity_threshold: Float
    maxSimilar: Int
    max_results: Int
    clustering_method: String
    algorithm: String
    includeMetrics: Boolean
  }

  input ClusterProfileInput {
    cluster_id: Int!
    include_members: Boolean
    include_diversity: Boolean
  }

  input ModelTrainingInput {
    algorithm: String
    parameters: String
    validation_split: Float
    epochs: Int
  }

  input ModelConfigInput {
    model_name: String!
    config_json: String!
  }

  input DataSyncInput {
    source: String!
    destination: String!
    batch_size: Int
    force_sync: Boolean
  }

  # Subscriptions (para futuras implementaciones)
  type Subscription {
    userCreated: User!
    productCreated: Product!
    recommendationGenerated: AIRecommendation!
    # Subscriptions ML
    modelTrainingProgress: ModelTrainingResult!
    newPrediction: CompatibilityPrediction!
    clusteringUpdated: ClusterAnalysis!
  }
`;
