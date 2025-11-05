import { mlClient } from "../../services/mlClient.js";

export const mlResolvers = {
  Query: {
    // === RESOLVERS PARA FEATURES ERP ===
    empresasFeatures: async (_, { filter, limit }) => {
      try {
        return await mlClient.getEmpresasFeatures(filter, limit);
      } catch (error) {
        console.error("Error in empresasFeatures resolver:", error.message);
        throw new Error("Failed to fetch empresas features");
      }
    },

    ofertasFeatures: async (_, { filter, limit }) => {
      try {
        return await mlClient.getOfertasFeatures(filter, limit);
      } catch (error) {
        console.error("Error in ofertasFeatures resolver:", error.message);
        throw new Error("Failed to fetch ofertas features");
      }
    },

    postulantesFeatures: async (_, { filter, limit }) => {
      try {
        return await mlClient.getPostulantesFeatures(filter, limit);
      } catch (error) {
        console.error("Error in postulantesFeatures resolver:", error.message);
        throw new Error("Failed to fetch postulantes features");
      }
    },

    // === RESOLVERS PARA CANDIDATOS (MONGODB) ===
    candidatesFeatures: async (_, { query }) => {
      try {
        return await mlClient.getCandidatesFeatures(query);
      } catch (error) {
        console.error("Error in candidatesFeatures resolver:", error.message);
        throw new Error("Failed to fetch candidates features");
      }
    },

    candidateById: async (_, { candidateId }) => {
      try {
        return await mlClient.getCandidateById(candidateId);
      } catch (error) {
        console.error(`Error in candidateById resolver for id ${candidateId}:`, error.message);
        throw new Error(`Failed to fetch candidate with id ${candidateId}`);
      }
    },

    candidatesByOffer: async (_, { offerId, limit }) => {
      try {
        return await mlClient.getCandidatesByOffer(offerId, limit);
      } catch (error) {
        console.error(`Error in candidatesByOffer resolver for offer ${offerId}:`, error.message);
        throw new Error(`Failed to fetch candidates for offer ${offerId}`);
      }
    },

    // === RESOLVERS PARA OFERTAS (MONGODB) ===
    jobOffersFeatures: async (_, { query }) => {
      try {
        return await mlClient.getJobOffersFeatures(query);
      } catch (error) {
        console.error("Error in jobOffersFeatures resolver:", error.message);
        throw new Error("Failed to fetch job offers features");
      }
    },

    jobOfferById: async (_, { offerId }) => {
      try {
        return await mlClient.getJobOfferById(offerId);
      } catch (error) {
        console.error(`Error in jobOfferById resolver for id ${offerId}:`, error.message);
        throw new Error(`Failed to fetch job offer with id ${offerId}`);
      }
    },

    offersByCompany: async (_, { companyId, limit }) => {
      try {
        return await mlClient.getOffersByCompany(companyId, limit);
      } catch (error) {
        console.error(`Error in offersByCompany resolver for company ${companyId}:`, error.message);
        throw new Error(`Failed to fetch offers for company ${companyId}`);
      }
    },

    // === RESOLVERS PARA EMPRESAS (MONGODB) ===
    companiesFeatures: async (_, { query }) => {
      try {
        return await mlClient.getCompaniesFeatures(query);
      } catch (error) {
        console.error("Error in companiesFeatures resolver:", error.message);
        throw new Error("Failed to fetch companies features");
      }
    },

    companyById: async (_, { companyId }) => {
      try {
        return await mlClient.getCompanyById(companyId);
      } catch (error) {
        console.error(`Error in companyById resolver for id ${companyId}:`, error.message);
        throw new Error(`Failed to fetch company with id ${companyId}`);
      }
    },

    // === RESOLVERS PARA PREDICCIONES ML ===
    predictCompatibility: async (_, { input }) => {
      try {
        return await mlClient.predictCompatibility(input);
      } catch (error) {
        console.error("Error in predictCompatibility resolver:", error.message);
        throw new Error("Failed to predict compatibility");
      }
    },

    predictCustomCompatibility: async (_, { input }) => {
      try {
        const result = await mlClient.predictCustomCompatibility(input);

        // Asegurar que todos los campos de array sean arrays válidos
        if (!Array.isArray(result.decisionFactors)) {
          result.decisionFactors = [];
        }
        if (!Array.isArray(result.strengths)) {
          result.strengths = [];
        }
        if (!Array.isArray(result.weaknesses)) {
          result.weaknesses = [];
        }
        if (!Array.isArray(result.suggestions)) {
          result.suggestions = [];
        }

        return result;
      } catch (error) {
        console.error("Error in predictCustomCompatibility resolver:", error.message);
        throw new Error("Failed to predict custom compatibility");
      }
    },

    predictBatchCompatibility: async (_, { input }) => {
      try {
        return await mlClient.predictBatchCompatibility(input);
      } catch (error) {
        console.error("Error in predictBatchCompatibility resolver:", error.message);
        throw new Error("Failed to predict batch compatibility");
      }
    },

    getTopCandidatesForOffer: async (_, { input }) => {
      try {
        return await mlClient.getTopCandidatesForOffer(input);
      } catch (error) {
        console.error("Error in getTopCandidatesForOffer resolver:", error.message);
        throw new Error("Failed to get top candidates for offer");
      }
    },

    // === RESOLVERS PARA INFORMACIÓN DEL MODELO ===
    modelInfo: async () => {
      try {
        return await mlClient.getModelInfo();
      } catch (error) {
        console.error("Error in modelInfo resolver:", error.message);
        throw new Error("Failed to get model info");
      }
    },

    featureImportance: async (_, { topN }) => {
      try {
        return await mlClient.getFeatureImportance(topN);
      } catch (error) {
        console.error("Error in featureImportance resolver:", error.message);
        throw new Error("Failed to get feature importance");
      }
    },

    explainPrediction: async (_, { candidateId, offerId }) => {
      try {
        return await mlClient.explainPrediction(candidateId, offerId);
      } catch (error) {
        console.error("Error in explainPrediction resolver:", error.message);
        throw new Error("Failed to explain prediction");
      }
    },

    trainingDataSummary: async () => {
      try {
        return await mlClient.getTrainingDataSummary();
      } catch (error) {
        console.error("Error in trainingDataSummary resolver:", error.message);
        throw new Error("Failed to get training data summary");
      }
    },

    modelPerformance: async () => {
      try {
        return await mlClient.getModelPerformance();
      } catch (error) {
        console.error("Error in modelPerformance resolver:", error.message);
        throw new Error("Failed to get model performance");
      }
    },

    isModelLoaded: async () => {
      try {
        return await mlClient.isModelLoaded();
      } catch (error) {
        console.error("Error in isModelLoaded resolver:", error.message);
        return false;
      }
    },

    modelStatus: async () => {
      try {
        const status = await mlClient.getModelStatus();
        return JSON.stringify(status, null, 2);
      } catch (error) {
        console.error("Error in modelStatus resolver:", error.message);
        return JSON.stringify({ status: "error", message: error.message }, null, 2);
      }
    },

    // === RESOLVERS PARA CLUSTERING ===
    analyzeCandidateClusters: async (_, { input }) => {
      try {
        return await mlClient.analyzeCandidateClusters(input);
      } catch (error) {
        console.error("Error in analyzeCandidateClusters resolver:", error.message);
        throw new Error("Failed to analyze candidate clusters");
      }
    },

    findSimilarCandidates: async (_, { input }) => {
      try {
        return await mlClient.findSimilarCandidates(input);
      } catch (error) {
        console.error("Error in findSimilarCandidates resolver:", error.message);
        throw new Error("Failed to find similar candidates");
      }
    },

    getClusterProfileDetails: async (_, { input }) => {
      try {
        return await mlClient.getClusterProfileDetails(input);
      } catch (error) {
        console.error("Error in getClusterProfileDetails resolver:", error.message);
        throw new Error("Failed to get cluster profile details");
      }
    },

    // === RESOLVERS PARA UTILIDADES ===
    collectionInfo: async (_, { collectionName }) => {
      try {
        return await mlClient.getCollectionInfo(collectionName);
      } catch (error) {
        console.error(`Error in collectionInfo resolver for ${collectionName}:`, error.message);
        throw new Error(`Failed to get collection info for ${collectionName}`);
      }
    },
  },

  Mutation: {
    // === MUTATIONS PARA MODELO ML ===
    retrainModel: async (_, { input }) => {
      try {
        return await mlClient.retrainModel(input);
      } catch (error) {
        console.error("Error in retrainModel mutation:", error.message);
        throw new Error("Failed to retrain model");
      }
    },

    updateModelConfig: async (_, { input }) => {
      try {
        return await mlClient.updateModelConfig(input);
      } catch (error) {
        console.error("Error in updateModelConfig mutation:", error.message);
        throw new Error("Failed to update model config");
      }
    },

    syncData: async (_, { input }) => {
      try {
        return await mlClient.syncData(input);
      } catch (error) {
        console.error("Error in syncData mutation:", error.message);
        throw new Error("Failed to sync data");
      }
    },

    clearCache: async (_, { cacheType }) => {
      try {
        return await mlClient.clearCache(cacheType);
      } catch (error) {
        console.error("Error in clearCache mutation:", error.message);
        throw new Error("Failed to clear cache");
      }
    },
  },
};
