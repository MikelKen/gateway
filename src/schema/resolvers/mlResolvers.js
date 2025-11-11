import axios from "axios";

const ML_URL = process.env.SERVICE_ML_URL || "http://localhost:8000/graphql";

// Convierte camelCase a snake_case
function camelToSnake(str) {
  return str.replace(/([A-Z])/g, "_$1").toLowerCase();
}

// Convierte snake_case a camelCase
function snakeToCamel(str) {
  return str.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
}

// Convierte objetos de camelCase a snake_case recursivamente
function convertKeysToSnakeCase(obj) {
  if (Array.isArray(obj)) {
    return obj.map((item) => convertKeysToSnakeCase(item));
  } else if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce((result, key) => {
      const snakeKey = camelToSnake(key);
      result[snakeKey] = convertKeysToSnakeCase(obj[key]);
      return result;
    }, {});
  }
  return obj;
}

// Convierte objetos de snake_case a camelCase recursivamente
function convertKeysToCamelCase(obj) {
  if (Array.isArray(obj)) {
    return obj.map((item) => convertKeysToCamelCase(item));
  } else if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce((result, key) => {
      const camelKey = snakeToCamel(key);
      result[camelKey] = convertKeysToCamelCase(obj[key]);
      // También mantener la versión snake_case para compatibilidad
      if (key !== camelKey) {
        result[key] = convertKeysToCamelCase(obj[key]);
      }
      return result;
    }, {});
  }
  return obj;
}

// Convierte la selección GraphQL a string respetando la estructura anidada
function selectionSetToString(selections) {
  if (!selections) return "";

  return selections
    .map((selection) => {
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

      // Convertir argumentos de snake_case a camelCase para el servicio ML
      let input = args.input || {};
      const convertedInput = {};

      // Mapear snake_case a camelCase
      if (input.max_results !== undefined) {
        convertedInput.maxResults = input.max_results;
      }
      if (input.maxResults !== undefined) {
        convertedInput.maxResults = input.maxResults;
      }
      if (input.include_outliers !== undefined) {
        convertedInput.includeOutliers = input.include_outliers;
      }
      if (input.includeOutliers !== undefined) {
        convertedInput.includeOutliers = input.includeOutliers;
      }
      if (input.algorithm !== undefined) {
        convertedInput.algorithm = input.algorithm;
      }

      const query = `query analyzeCandidateClusters($input: ClusteringQueryInput) {
        analyzeCandidateClusters(input: $input) {
          ${fields}
        }
      }`;

      const data = await forwardToML(query, { input: convertedInput });
      return data.analyzeCandidateClusters;
    },

    findSimilarCandidates: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);

      // Convertir argumentos de snake_case a camelCase para el servicio ML
      let input = args.input || {};
      const convertedInput = {};

      // Mapear snake_case a camelCase
      if (input.candidate_id !== undefined) {
        convertedInput.candidateId = input.candidate_id;
      }
      if (input.candidateId !== undefined) {
        convertedInput.candidateId = input.candidateId;
      }
      if (input.max_results !== undefined) {
        convertedInput.maxSimilar = input.max_results;
      }
      if (input.maxSimilar !== undefined) {
        convertedInput.maxSimilar = input.maxSimilar;
      }
      if (input.similarity_threshold !== undefined) {
        convertedInput.similarityThreshold = input.similarity_threshold;
      }
      if (input.clustering_method !== undefined) {
        convertedInput.algorithm = input.clustering_method;
      }
      if (input.algorithm !== undefined) {
        convertedInput.algorithm = input.algorithm;
      }
      if (input.includeMetrics !== undefined) {
        convertedInput.includeMetrics = input.includeMetrics;
      }

      const query = `query findSimilarCandidates($input: SimilarCandidatesInput!) {
        findSimilarCandidates(input: $input) {
          ${fields}
        }
      }`;
      const data = await forwardToML(query, { input: convertedInput });
      return data.findSimilarCandidates;
    },

    getClusterProfileDetails: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);

      // Convertir argumentos de snake_case a camelCase para el servicio ML
      let input = args.input || {};
      const convertedInput = {};

      // Mapear snake_case a camelCase
      if (input.cluster_id !== undefined) {
        convertedInput.clusterId = input.cluster_id;
      }
      if (input.clusterId !== undefined) {
        convertedInput.clusterId = input.clusterId;
      }
      if (input.include_details !== undefined) {
        convertedInput.includeDetails = input.include_details;
      }
      if (input.includeDetails !== undefined) {
        convertedInput.includeDetails = input.includeDetails;
      }
      if (input.algorithm !== undefined) {
        convertedInput.algorithm = input.algorithm;
      }

      const query = `query getClusterProfileDetails($input: ClusterProfileInput!) {
        getClusterProfileDetails(input: $input) {
          ${fields}
        }
      }`;
      const data = await forwardToML(query, { input: convertedInput });
      return data.getClusterProfileDetails;
    },

    getCandidatesInCluster: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);

      // Convertir argumentos de snake_case a camelCase para el servicio ML
      let input = args.input || {};
      const convertedInput = {};

      // Mapear propiedades
      if (input.cluster_id !== undefined) {
        convertedInput.clusterId = input.cluster_id;
      }
      if (input.clusterId !== undefined) {
        convertedInput.clusterId = input.clusterId;
      }
      if (input.algorithm !== undefined) {
        convertedInput.algorithm = input.algorithm;
      }
      if (input.limit !== undefined) {
        convertedInput.limit = input.limit;
      }
      if (input.include_details !== undefined) {
        convertedInput.includeDetails = input.include_details;
      }
      if (input.includeDetails !== undefined) {
        convertedInput.includeDetails = input.includeDetails;
      }

      const query = `query getCandidatesInCluster($input: GetCandidatesInClusterInput!) {
        getCandidatesInCluster(input: $input) {
          ${fields}
        }
      }`;
      const data = await forwardToML(query, { input: convertedInput });
      return data.getCandidatesInCluster;
    },
  },
};
