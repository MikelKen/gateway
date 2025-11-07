import axios from "axios";

const ML_URL = process.env.SERVICE_ML_URL || "http://localhost:8000/graphql";

// Convierte la selección GraphQL a string respetando la estructura anidada
function selectionSetToString(selections) {
  if (!selections) return "";
  
  return selections
    .map(selection => {
      if (selection.selectionSet) {
        return `${selection.name.value} {
          ${selectionSetToString(selection.selectionSet.selections)}
        }`;
      } else {
        return selection.name.value;
      }
    })
    .join("\n          ");
}

// Función que reenvía queries a ML
async function forwardToML(query, variables = {}) {
  try {
    console.log(`🤖 Forwarding to ML: ${query.substring(0, 100)}...`);
    const response = await axios.post(ML_URL, {
      query,
      variables,
    });

    if (response.data.errors) {
      console.error("❌ ML Error:", response.data.errors);
      throw new Error(response.data.errors[0].message);
    }

    return response.data.data;
  } catch (error) {
    console.error("❌ Error forwarding to ML:", error.message);
    throw error;
  }
}

export const mlResolvers = {
  Query: {
    // === FEATURES ===
    candidatesFeatures: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `query candidatesFeatures($query: FeatureQueryInput) {
        candidatesFeatures(query: $query) {
          ${fields}
        }
      }`;
      const data = await forwardToML(query, args);
      return data.candidatesFeatures;
    },

    jobOffersFeatures: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `query jobOffersFeatures($query: FeatureQueryInput) {
        jobOffersFeatures(query: $query) {
          ${fields}
        }
      }`;
      const data = await forwardToML(query, args);
      return data.jobOffersFeatures;
    },

    companiesFeatures: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `query companiesFeatures($query: FeatureQueryInput) {
        companiesFeatures(query: $query) {
          ${fields}
        }
      }`;
      const data = await forwardToML(query, args);
      return data.companiesFeatures;
    },

    candidateById: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `query candidateById($candidateId: String!) {
        candidateById(candidateId: $candidateId) {
          ${fields}
        }
      }`;
      const data = await forwardToML(query, args);
      return data.candidateById;
    },

    jobOfferById: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `query jobOfferById($offerId: String!) {
        jobOfferById(offerId: $offerId) {
          ${fields}
        }
      }`;
      const data = await forwardToML(query, args);
      return data.jobOfferById;
    },

    companyById: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `query companyById($companyId: String!) {
        companyById(companyId: $companyId) {
          ${fields}
        }
      }`;
      const data = await forwardToML(query, args);
      return data.companyById;
    },

    candidatesByOffer: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `query candidatesByOffer($offerId: String!, $limit: Int) {
        candidatesByOffer(offerId: $offerId, limit: $limit) {
          ${fields}
        }
      }`;
      const data = await forwardToML(query, args);
      return data.candidatesByOffer;
    },

    offersByCompany: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `query offersByCompany($companyId: String!, $limit: Int) {
        offersByCompany(companyId: $companyId, limit: $limit) {
          ${fields}
        }
      }`;
      const data = await forwardToML(query, args);
      return data.offersByCompany;
    },

    collectionInfo: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `query collectionInfo($collectionName: String!) {
        collectionInfo(collectionName: $collectionName) {
          ${fields}
        }
      }`;
      const data = await forwardToML(query, args);
      return data.collectionInfo;
    },

    // === PREDICCIONES ===
    predictCompatibility: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `query predictCompatibility($input: CompatibilityPredictionInput!) {
        predictCompatibility(input: $input) {
          ${fields}
        }
      }`;
      const data = await forwardToML(query, args);
      return data.predictCompatibility;
    },

    predictCustomCompatibility: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `query predictCustomCompatibility($input: CustomCompatibilityPredictionInput!) {
        predictCustomCompatibility(input: $input) {
          ${fields}
        }
      }`;
      const data = await forwardToML(query, args);
      return data.predictCustomCompatibility;
    },

    predictBatchCompatibility: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `query predictBatchCompatibility($input: BatchCompatibilityInput!) {
        predictBatchCompatibility(input: $input) {
          ${fields}
        }
      }`;
      const data = await forwardToML(query, args);
      return data.predictBatchCompatibility;
    },

    getTopCandidatesForOffer: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `query getTopCandidatesForOffer($input: TopCandidatesInput!) {
        getTopCandidatesForOffer(input: $input) {
          ${fields}
        }
      }`;
      const data = await forwardToML(query, args);
      return data.getTopCandidatesForOffer;
    },

    // === MODELO ===
    modelInfo: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `query modelInfo {
        modelInfo {
          ${fields}
        }
      }`;
      const data = await forwardToML(query, args);
      return data.modelInfo;
    },

    featureImportance: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `query featureImportance($topN: Int) {
        featureImportance(topN: $topN) {
          ${fields}
        }
      }`;
      const data = await forwardToML(query, args);
      return data.featureImportance;
    },

    explainPrediction: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `query explainPrediction($candidateId: String!, $offerId: String!) {
        explainPrediction(candidateId: $candidateId, offerId: $offerId) {
          ${fields}
        }
      }`;
      const data = await forwardToML(query, args);
      return data.explainPrediction;
    },

    trainingDataSummary: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `query trainingDataSummary {
        trainingDataSummary {
          ${fields}
        }
      }`;
      const data = await forwardToML(query, args);
      return data.trainingDataSummary;
    },

    modelPerformance: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `query modelPerformance {
        modelPerformance {
          ${fields}
        }
      }`;
      const data = await forwardToML(query, args);
      return data.modelPerformance;
    },

    isModelLoaded: async () => {
      const query = `query isModelLoaded {
        isModelLoaded
      }`;
      const data = await forwardToML(query);
      return data.isModelLoaded;
    },

    modelStatus: async () => {
      const query = `query modelStatus {
        modelStatus
      }`;
      const data = await forwardToML(query);
      return data.modelStatus;
    },

    // === CLUSTERING ===
    analyzeCandidateClusters: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `query analyzeCandidateClusters($input: ClusteringQueryInput) {
        analyzeCandidateClusters(input: $input) {
          ${fields}
        }
      }`;
      const data = await forwardToML(query, args);
      return data.analyzeCandidateClusters;
    },

    findSimilarCandidates: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `query findSimilarCandidates($input: SimilarCandidatesInput!) {
        findSimilarCandidates(input: $input) {
          ${fields}
        }
      }`;
      const data = await forwardToML(query, args);
      return data.findSimilarCandidates;
    },

    getClusterProfileDetails: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `query getClusterProfileDetails($input: ClusterProfileInput!) {
        getClusterProfileDetails(input: $input) {
          ${fields}
        }
      }`;
      const data = await forwardToML(query, args);
      return data.getClusterProfileDetails;
    },
  },
};
