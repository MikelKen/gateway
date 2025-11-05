/**
 * Configuración específica para la conexión con el microservicio ML (FastAPI + Strawberry GraphQL)
 */
export const mlConfig = {
  // URL del microservicio ML
  url: process.env.SERVICE_ML_URL || "http://localhost:8000",

  // Endpoint GraphQL del ML
  graphqlEndpoint: process.env.ML_GRAPHQL_ENDPOINT || "/graphql",

  // Configuración de timeout específica para ML
  timeout: parseInt(process.env.ML_TIMEOUT) || 15000, // 15 segundos para operaciones ML complejas

  // Headers específicos para comunicación con ML
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },

  // Configuración de retry para operaciones críticas
  retry: {
    attempts: parseInt(process.env.ML_RETRY_ATTEMPTS) || 3,
    delay: parseInt(process.env.ML_RETRY_DELAY) || 2000,
  },

  // Endpoints REST adicionales del ML service
  restEndpoints: {
    health: "/health",
    info: "/info",
    apiHealth: "/api/health",
    syncStatus: "/api/sync/status",
    clustering: "/api/clustering",
  },

  // Mapeo de entidades del ML
  entities: {
    EMPRESA_FEATURE: "EmpresaFeature",
    OFERTA_FEATURE: "OfertaFeature",
    POSTULANTE_FEATURE: "PostulanteFeature",
    CANDIDATE_FEATURE: "CandidateFeature",
    JOB_OFFER_FEATURE: "JobOfferFeature",
    COMPANY_FEATURE: "CompanyFeature",
    COMPATIBILITY_PREDICTION: "CompatibilityPrediction",
    CLUSTER_ANALYSIS: "ClusterAnalysis",
    MODEL_INFO: "ModelInfo",
  },

  // Queries predefinidas para el ML service
  queries: {
    // Queries para Empresas Features
    GET_EMPRESAS_FEATURES: `
      query GetEmpresasFeatures($filter: EmpresaFilter, $limit: Int) {
        empresas(filter: $filter, limit: $limit) {
          id
          nombre
          correo
          rubro
          ubicacion
          tamaño_empresa
          años_mercado
          tecnologias_usadas
          beneficios_ofrecidos
        }
      }
    `,

    // Queries para Ofertas Features
    GET_OFERTAS_FEATURES: `
      query GetOfertasFeatures($filter: OfertaFilter, $limit: Int) {
        ofertas(filter: $filter, limit: $limit) {
          id
          titulo
          descripcion
          salario
          ubicacion
          requisitos
          nivel_experiencia
          tipo_contrato
          modalidad_trabajo
          empresa_id
          tecnologias_requeridas
        }
      }
    `,

    // Queries para Postulantes Features
    GET_POSTULANTES_FEATURES: `
      query GetPostulantesFeatures($filter: PostulanteFilter, $limit: Int) {
        postulantes(filter: $filter, limit: $limit) {
          id
          nombre
          anios_experiencia
          nivel_educacion
          habilidades
          idiomas
          certificaciones
          puesto_actual
          salario_esperado
          disponibilidad
        }
      }
    `,

    // Queries para Candidatos (MongoDB)
    GET_CANDIDATES_FEATURES: `
      query GetCandidatesFeatures($query: FeatureQueryInput) {
        candidatesFeatures(query: $query) {
          candidates {
            id
            name
            experience_years
            education_level
            skills
            languages
            certifications
            current_position
            expected_salary
          }
          total_count
          page_info {
            has_next_page
            has_previous_page
            start_cursor
            end_cursor
          }
        }
      }
    `,

    // Queries para Ofertas de Trabajo (MongoDB)
    GET_JOB_OFFERS_FEATURES: `
      query GetJobOffersFeatures($query: FeatureQueryInput) {
        jobOffersFeatures(query: $query) {
          job_offers {
            id
            title
            description
            salary_range
            location
            requirements
            experience_level
            contract_type
            work_modality
            company_id
          }
          total_count
          page_info {
            has_next_page
            has_previous_page
            start_cursor
            end_cursor
          }
        }
      }
    `,

    // Queries para Empresas (MongoDB)
    GET_COMPANIES_FEATURES: `
      query GetCompaniesFeatures($query: FeatureQueryInput) {
        companiesFeatures(query: $query) {
          companies {
            id
            name
            email
            industry
            location
            company_size
            years_in_market
            technologies_used
            benefits_offered
          }
          total_count
          page_info {
            has_next_page
            has_previous_page
            start_cursor
            end_cursor
          }
        }
      }
    `,

    // Queries para Predicciones ML
    PREDICT_COMPATIBILITY: `
      query PredictCompatibility($input: CompatibilityPredictionInput!) {
        predictCompatibility(input: $input) {
          candidate_id
          offer_id
          compatibility_score
          prediction_confidence
          recommendation
          explanation {
            key_factors
            score_breakdown
            improvement_suggestions
          }
          timestamp
        }
      }
    `,

    PREDICT_CUSTOM_COMPATIBILITY: `
      query PredictCustomCompatibility($input: CustomCompatibilityPredictionInput!) {
        predictCustomCompatibility(input: $input) {
          probability
          prediction
          confidence
          probabilityPercentage
          compatibilityLevel
          recommendation
          summary
          strengths
          weaknesses
          suggestions
          detailedAnalysis
          decisionFactors
          modelUsed
          confidenceScore
          predictionDate
        }
      }
    `,

    PREDICT_BATCH_COMPATIBILITY: `
      query PredictBatchCompatibility($input: BatchCompatibilityInput!) {
        predictBatchCompatibility(input: $input) {
          predictions {
            candidate_id
            offer_id
            compatibility_score
            prediction_confidence
            recommendation
          }
          batch_summary {
            total_predictions
            average_score
            high_compatibility_count
            processing_time
          }
          timestamp
        }
      }
    `,

    GET_TOP_CANDIDATES: `
      query GetTopCandidates($input: TopCandidatesInput!) {
        getTopCandidatesForOffer(input: $input) {
          candidateId
          offerId
          probability
          ranking
          recommendation
        }
      }
    `,

    // Queries para Información del Modelo
    GET_MODEL_INFO: `
      query GetModelInfo {
        modelInfo {
          model_name
          model_version
          model_type
          training_date
          performance_metrics {
            accuracy
            precision
            recall
            f1_score
          }
          feature_count
          training_samples
          is_loaded
        }
      }
    `,

    GET_FEATURE_IMPORTANCE: `
      query GetFeatureImportance($topN: Int) {
        featureImportance(topN: $topN) {
          model_name
          features {
            feature_name
            importance_score
            feature_type
            description
          }
          total_features
          timestamp
        }
      }
    `,

    EXPLAIN_PREDICTION: `
      query ExplainPrediction($candidateId: String!, $offerId: String!) {
        explainPrediction(candidateId: $candidateId, offerId: $offerId) {
          prediction_id
          candidate_id
          offer_id
          compatibility_score
          detailed_explanation {
            feature_contributions
            decision_factors
            similarity_analysis
          }
          confidence_intervals
          alternative_scenarios
          timestamp
        }
      }
    `,

    // Queries para Clustering
    ANALYZE_CANDIDATE_CLUSTERS: `
      query AnalyzeCandidateClusters($input: ClusteringQueryInput) {
        analyzeCandidateClusters(input: $input) {
          cluster_count
          total_candidates
          cluster_profiles {
            cluster_id
            cluster_label
            candidate_count
            avg_experience
            common_skills
            salary_range
            education_distribution
          }
          clustering_metrics {
            silhouette_score
            davies_bouldin_score
            calinski_harabasz_score
          }
          timestamp
        }
      }
    `,

    FIND_SIMILAR_CANDIDATES: `
      query FindSimilarCandidates($input: SimilarCandidatesInput!) {
        findSimilarCandidates(input: $input) {
          target_candidate_id
          similar_candidates {
            candidate_id
            similarity_score
            shared_characteristics
            cluster_id
            distance_metrics
          }
          search_criteria {
            similarity_threshold
            max_results
            clustering_method
          }
          timestamp
        }
      }
    `,

    GET_CLUSTER_PROFILE: `
      query GetClusterProfile($input: ClusterProfileInput!) {
        getClusterProfileDetails(input: $input) {
          cluster_id
          cluster_label
          member_count
          centroid_features
          typical_profile {
            avg_experience
            common_skills
            education_modes
            salary_statistics
          }
          diversity_metrics {
            skill_diversity
            experience_spread
            education_variety
          }
          representative_members
          timestamp
        }
      }
    `,

    // Queries de Estado del Sistema
    MODEL_STATUS: `
      query GetModelStatus {
        modelStatus
      }
    `,

    IS_MODEL_LOADED: `
      query IsModelLoaded {
        isModelLoaded
      }
    `,

    TRAINING_DATA_SUMMARY: `
      query GetTrainingDataSummary {
        trainingDataSummary {
          total_samples
          feature_count
          target_distribution
          data_quality_metrics
          last_updated
        }
      }
    `,

    MODEL_PERFORMANCE: `
      query GetModelPerformance {
        modelPerformance {
          accuracy
          precision
          recall
          f1_score
          auc_roc
          confusion_matrix
          classification_report
          feature_importance_summary
        }
      }
    `,

    // Queries por ID específico
    GET_CANDIDATE_BY_ID: `
      query GetCandidateById($candidateId: String!) {
        candidateById(candidateId: $candidateId) {
          id
          name
          experience_years
          education_level
          skills
          languages
          certifications
          current_position
          expected_salary
          cluster_id
          profile_features
        }
      }
    `,

    GET_JOB_OFFER_BY_ID: `
      query GetJobOfferById($offerId: String!) {
        jobOfferById(offerId: $offerId) {
          id
          title
          description
          salary_range
          location
          requirements
          experience_level
          company_id
          required_skills
          benefits
        }
      }
    `,

    GET_COMPANY_BY_ID: `
      query GetCompanyById($companyId: String!) {
        companyById(companyId: $companyId) {
          id
          name
          email
          industry
          location
          company_size
          years_in_market
          technologies_used
          benefits_offered
          open_positions
        }
      }
    `,

    // Queries de Colecciones
    GET_COLLECTION_INFO: `
      query GetCollectionInfo($collectionName: String!) {
        collectionInfo(collectionName: $collectionName) {
          collection_name
          document_count
          size_bytes
          indexes
          last_modified
          schema_info
        }
      }
    `,

    GET_CANDIDATES_BY_OFFER: `
      query GetCandidatesByOffer($offerId: String!, $limit: Int) {
        candidatesByOffer(offerId: $offerId, limit: $limit) {
          id
          name
          experience_years
          skills
          compatibility_score
          application_date
        }
      }
    `,

    GET_OFFERS_BY_COMPANY: `
      query GetOffersByCompany($companyId: String!, $limit: Int) {
        offersByCompany(companyId: $companyId, limit: $limit) {
          id
          title
          description
          salary_range
          location
          requirements
          posted_date
          application_count
        }
      }
    `,
  },

  // Mutations predefinidas para el ML service
  mutations: {
    // Mutations para entrenamiento del modelo
    RETRAIN_MODEL: `
      mutation RetrainModel($input: ModelTrainingInput!) {
        ml {
          retrainModel(input: $input) {
            training_id
            status
            message
            estimated_duration
            timestamp
          }
        }
      }
    `,

    UPDATE_MODEL_CONFIG: `
      mutation UpdateModelConfig($input: ModelConfigInput!) {
        ml {
          updateModelConfig(input: $input) {
            config_id
            applied_settings
            status
            message
            timestamp
          }
        }
      }
    `,

    // Mutations para gestión de datos
    SYNC_DATA: `
      mutation SyncData($input: DataSyncInput!) {
        ml {
          syncData(input: $input) {
            sync_id
            source
            destination
            records_processed
            status
            timestamp
          }
        }
      }
    `,

    CLEAR_CACHE: `
      mutation ClearCache($cacheType: String!) {
        ml {
          clearCache(cacheType: $cacheType) {
            cache_type
            cleared_items
            status
            timestamp
          }
        }
      }
    `,
  },
};
