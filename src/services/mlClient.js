import axios from "axios";
import { mlConfig } from "./mlConfig.js";

class MLClient {
  constructor() {
    this.client = axios.create({
      baseURL: mlConfig.url,
      timeout: mlConfig.timeout,
      headers: mlConfig.headers,
    });

    this.setupInterceptors();
  }

  setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        console.log(`🤖 ML Request: ${config.method?.toUpperCase()} ${config.url}`);
        if (config.data) {
          console.log("📊 ML Query/Mutation:", config.data.query?.substring(0, 100) + "...");
        }
        return config;
      },
      (error) => {
        console.error("❌ ML Request Error:", error.message);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        console.log(`📥 ML Response: ${response.status} ${response.statusText}`);
        return response;
      },
      (error) => {
        console.error("❌ ML Response Error:", error.message);
        if (error.response?.data?.errors) {
          console.error("GraphQL Errors:", error.response.data.errors);
        }
        return Promise.reject(error);
      }
    );
  }

  async executeQuery(query, variables = {}) {
    try {
      const response = await this.client.post(mlConfig.graphqlEndpoint, {
        query,
        variables,
      });

      if (response.data.errors) {
        console.error("GraphQL Errors:", response.data.errors);
        throw new Error(`GraphQL Error: ${response.data.errors[0].message}`);
      }

      return response.data.data;
    } catch (error) {
      console.error("Error executing ML query:", error.message);
      throw error;
    }
  }

  async executeMutation(mutation, variables = {}) {
    try {
      const response = await this.client.post(mlConfig.graphqlEndpoint, {
        query: mutation,
        variables,
      });

      if (response.data.errors) {
        console.error("GraphQL Errors:", response.data.errors);
        throw new Error(`GraphQL Error: ${response.data.errors[0].message}`);
      }

      return response.data.data;
    } catch (error) {
      console.error("Error executing ML mutation:", error.message);
      throw error;
    }
  }

  // === MÉTODOS PARA EMPRESAS FEATURES ===

  async getEmpresasFeatures(filter = null, limit = 100) {
    try {
      const data = await this.executeQuery(mlConfig.queries.GET_EMPRESAS_FEATURES, { filter, limit });
      return data.empresas || [];
    } catch (error) {
      console.error("Error fetching empresas features:", error.message);
      return [];
    }
  }

  // === MÉTODOS PARA OFERTAS FEATURES ===

  async getOfertasFeatures(filter = null, limit = 100) {
    try {
      const data = await this.executeQuery(mlConfig.queries.GET_OFERTAS_FEATURES, { filter, limit });
      return data.ofertas || [];
    } catch (error) {
      console.error("Error fetching ofertas features:", error.message);
      return [];
    }
  }

  // === MÉTODOS PARA POSTULANTES FEATURES ===

  async getPostulantesFeatures(filter = null, limit = 100) {
    try {
      const data = await this.executeQuery(mlConfig.queries.GET_POSTULANTES_FEATURES, { filter, limit });
      return data.postulantes || [];
    } catch (error) {
      console.error("Error fetching postulantes features:", error.message);
      return [];
    }
  }

  // === MÉTODOS PARA CANDIDATOS (MONGODB) ===

  async getCandidatesFeatures(query = null) {
    try {
      const data = await this.executeQuery(mlConfig.queries.GET_CANDIDATES_FEATURES, { query });
      return data.candidatesFeatures || { candidates: [], total_count: 0 };
    } catch (error) {
      console.error("Error fetching candidates features:", error.message);
      return { candidates: [], total_count: 0 };
    }
  }

  async getCandidateById(candidateId) {
    try {
      const data = await this.executeQuery(mlConfig.queries.GET_CANDIDATE_BY_ID, { candidateId });
      return data.candidateById;
    } catch (error) {
      console.error(`Error fetching candidate ${candidateId}:`, error.message);
      return null;
    }
  }

  // === MÉTODOS PARA OFERTAS DE TRABAJO (MONGODB) ===

  async getJobOffersFeatures(query = null) {
    try {
      const data = await this.executeQuery(mlConfig.queries.GET_JOB_OFFERS_FEATURES, { query });
      return data.jobOffersFeatures || { job_offers: [], total_count: 0 };
    } catch (error) {
      console.error("Error fetching job offers features:", error.message);
      return { job_offers: [], total_count: 0 };
    }
  }

  async getJobOfferById(offerId) {
    try {
      const data = await this.executeQuery(mlConfig.queries.GET_JOB_OFFER_BY_ID, { offerId });
      return data.jobOfferById;
    } catch (error) {
      console.error(`Error fetching job offer ${offerId}:`, error.message);
      return null;
    }
  }

  // === MÉTODOS PARA EMPRESAS (MONGODB) ===

  async getCompaniesFeatures(query = null) {
    try {
      const data = await this.executeQuery(mlConfig.queries.GET_COMPANIES_FEATURES, { query });
      return data.companiesFeatures || { companies: [], total_count: 0 };
    } catch (error) {
      console.error("Error fetching companies features:", error.message);
      return { companies: [], total_count: 0 };
    }
  }

  async getCompanyById(companyId) {
    try {
      const data = await this.executeQuery(mlConfig.queries.GET_COMPANY_BY_ID, { companyId });
      return data.companyById;
    } catch (error) {
      console.error(`Error fetching company ${companyId}:`, error.message);
      return null;
    }
  }

  // === MÉTODOS PARA PREDICCIONES ML ===

  async predictCompatibility(input) {
    try {
      const data = await this.executeQuery(mlConfig.queries.PREDICT_COMPATIBILITY, { input });
      return data.predictCompatibility;
    } catch (error) {
      console.error("Error predicting compatibility:", error.message);
      throw error;
    }
  }

  async predictCustomCompatibility(input) {
    try {
      const data = await this.executeQuery(mlConfig.queries.PREDICT_CUSTOM_COMPATIBILITY, { input });
      return data.predictCustomCompatibility;
    } catch (error) {
      console.error("Error predicting custom compatibility:", error.message);
      throw error;
    }
  }

  async predictBatchCompatibility(input) {
    try {
      const data = await this.executeQuery(mlConfig.queries.PREDICT_BATCH_COMPATIBILITY, { input });
      return data.predictBatchCompatibility;
    } catch (error) {
      console.error("Error predicting batch compatibility:", error.message);
      throw error;
    }
  }

  async getTopCandidatesForOffer(input) {
    try {
      const data = await this.executeQuery(mlConfig.queries.GET_TOP_CANDIDATES, { input });
      return data.getTopCandidatesForOffer || [];
    } catch (error) {
      console.error("Error getting top candidates:", error.message);
      return [];
    }
  }

  // === MÉTODOS PARA INFORMACIÓN DEL MODELO ===

  async getModelInfo() {
    try {
      const data = await this.executeQuery(mlConfig.queries.GET_MODEL_INFO);
      return data.modelInfo;
    } catch (error) {
      console.error("Error getting model info:", error.message);
      return null;
    }
  }

  async getFeatureImportance(topN = 20) {
    try {
      const data = await this.executeQuery(mlConfig.queries.GET_FEATURE_IMPORTANCE, { topN });
      return data.featureImportance;
    } catch (error) {
      console.error("Error getting feature importance:", error.message);
      return null;
    }
  }

  async explainPrediction(candidateId, offerId) {
    try {
      const data = await this.executeQuery(mlConfig.queries.EXPLAIN_PREDICTION, { candidateId, offerId });
      return data.explainPrediction;
    } catch (error) {
      console.error("Error explaining prediction:", error.message);
      return null;
    }
  }

  async getTrainingDataSummary() {
    try {
      const data = await this.executeQuery(mlConfig.queries.TRAINING_DATA_SUMMARY);
      return data.trainingDataSummary;
    } catch (error) {
      console.error("Error getting training data summary:", error.message);
      return null;
    }
  }

  async getModelPerformance() {
    try {
      const data = await this.executeQuery(mlConfig.queries.MODEL_PERFORMANCE);
      return data.modelPerformance;
    } catch (error) {
      console.error("Error getting model performance:", error.message);
      return null;
    }
  }

  async isModelLoaded() {
    try {
      const data = await this.executeQuery(mlConfig.queries.IS_MODEL_LOADED);
      return data.isModelLoaded || false;
    } catch (error) {
      console.error("Error checking if model is loaded:", error.message);
      return false;
    }
  }

  async getModelStatus() {
    try {
      const data = await this.executeQuery(mlConfig.queries.MODEL_STATUS);
      return JSON.parse(data.modelStatus || "{}");
    } catch (error) {
      console.error("Error getting model status:", error.message);
      return { status: "unknown", error: error.message };
    }
  }

  // === MÉTODOS PARA CLUSTERING ===

  async analyzeCandidateClusters(input = null) {
    try {
      const data = await this.executeQuery(mlConfig.queries.ANALYZE_CANDIDATE_CLUSTERS, { input });
      return data.analyzeCandidateClusters;
    } catch (error) {
      console.error("Error analyzing candidate clusters:", error.message);
      return null;
    }
  }

  async findSimilarCandidates(input) {
    try {
      const data = await this.executeQuery(mlConfig.queries.FIND_SIMILAR_CANDIDATES, { input });
      return data.findSimilarCandidates;
    } catch (error) {
      console.error("Error finding similar candidates:", error.message);
      return null;
    }
  }

  async getClusterProfileDetails(input) {
    try {
      const data = await this.executeQuery(mlConfig.queries.GET_CLUSTER_PROFILE, { input });
      return data.getClusterProfileDetails;
    } catch (error) {
      console.error("Error getting cluster profile:", error.message);
      return null;
    }
  }

  // === MÉTODOS PARA CONSULTAS ESPECÍFICAS ===

  async getCandidatesByOffer(offerId, limit = 10) {
    try {
      const data = await this.executeQuery(mlConfig.queries.GET_CANDIDATES_BY_OFFER, { offerId, limit });
      return data.candidatesByOffer || [];
    } catch (error) {
      console.error(`Error getting candidates for offer ${offerId}:`, error.message);
      return [];
    }
  }

  async getOffersByCompany(companyId, limit = 10) {
    try {
      const data = await this.executeQuery(mlConfig.queries.GET_OFFERS_BY_COMPANY, { companyId, limit });
      return data.offersByCompany || [];
    } catch (error) {
      console.error(`Error getting offers for company ${companyId}:`, error.message);
      return [];
    }
  }

  async getCollectionInfo(collectionName) {
    try {
      const data = await this.executeQuery(mlConfig.queries.GET_COLLECTION_INFO, { collectionName });
      return data.collectionInfo;
    } catch (error) {
      console.error(`Error getting collection info for ${collectionName}:`, error.message);
      return null;
    }
  }

  // === MÉTODOS PARA MUTATIONS ===

  async retrainModel(input) {
    try {
      const data = await this.executeMutation(mlConfig.mutations.RETRAIN_MODEL, { input });
      return data.ml.retrainModel;
    } catch (error) {
      console.error("Error retraining model:", error.message);
      throw error;
    }
  }

  async updateModelConfig(input) {
    try {
      const data = await this.executeMutation(mlConfig.mutations.UPDATE_MODEL_CONFIG, { input });
      return data.ml.updateModelConfig;
    } catch (error) {
      console.error("Error updating model config:", error.message);
      throw error;
    }
  }

  async syncData(input) {
    try {
      const data = await this.executeMutation(mlConfig.mutations.SYNC_DATA, { input });
      return data.ml.syncData;
    } catch (error) {
      console.error("Error syncing data:", error.message);
      throw error;
    }
  }

  async clearCache(cacheType) {
    try {
      const data = await this.executeMutation(mlConfig.mutations.CLEAR_CACHE, { cacheType });
      return data.ml.clearCache;
    } catch (error) {
      console.error("Error clearing cache:", error.message);
      throw error;
    }
  }

  // === MÉTODOS REST ===

  async getHealthStatus() {
    try {
      const response = await this.client.get(mlConfig.restEndpoints.health);
      return response.data;
    } catch (error) {
      console.error("Error getting ML health status:", error.message);
      return { status: "unhealthy", error: error.message };
    }
  }

  async getServiceInfo() {
    try {
      const response = await this.client.get(mlConfig.restEndpoints.info);
      return response.data;
    } catch (error) {
      console.error("Error getting ML service info:", error.message);
      return { error: error.message };
    }
  }

  async getSyncStatus() {
    try {
      const response = await this.client.get(mlConfig.restEndpoints.syncStatus);
      return response.data;
    } catch (error) {
      console.error("Error getting sync status:", error.message);
      return { status: "unknown", error: error.message };
    }
  }

  // === MÉTODO DE HEALTH CHECK ===

  async healthCheck() {
    try {
      const response = await this.client.get(mlConfig.restEndpoints.health, { timeout: 3000 });
      return {
        status: "healthy",
        service: "service_ml",
        endpoint: `${mlConfig.url}${mlConfig.restEndpoints.health}`,
        data: response.data,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        status: "unhealthy",
        service: "service_ml",
        endpoint: `${mlConfig.url}${mlConfig.restEndpoints.health}`,
        error: error.message,
        timestamp: new Date().toISOString(),
      };
    }
  }
}

// Singleton instance
export const mlClient = new MLClient();
