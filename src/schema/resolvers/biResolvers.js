import axios from "axios";

const BI_URL = process.env.SERVICE_BI_URL || "http://localhost:8081";

// Convierte la selección GraphQL a string respetando la estructura anidada
function selectionSetToString(selections) {
  if (!selections) return "";

  return selections
    .map((selection) => {
      if (selection.selectionSet) {
        // Campo con sub-selecciones (nested)
        return `${selection.name.value} {
          ${selectionSetToString(selection.selectionSet.selections)}
        }`;
      } else {
        // Campo simple
        return selection.name.value;
      }
    })
    .join("\n          ");
}

// Función que reenvía CUALQUIER query de BI al servicio BI
async function forwardToBI(query, variables = {}) {
  try {
    console.log(`📊 Forwarding to BI: ${query.substring(0, 100)}...`);
    const payload = { query };

    // Solo incluir variables si hay
    if (Object.keys(variables).length > 0) {
      payload.variables = variables;
    }

    console.log(`📤 Payload:`, JSON.stringify(payload, null, 2));

    const response = await axios.post(`${BI_URL}/query`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 30000, // ⏱️ Timeout de 30 segundos
    });

    if (response.data.errors) {
      console.error("❌ BI Error:", response.data.errors);
      const errorMessage = response.data.errors[0].message;

      // Detectar errores específicos
      if (errorMessage.includes("conn busy")) {
        console.error("⚠️  CONEXIÓN OCUPADA: El pool de conexiones del BI está saturado");
        console.error(
          "💡 Soluciones: 1) Reinicia el BI, 2) Verifica queries lentas en PostgreSQL, 3) Aumenta max_connections"
        );
      }

      throw new Error(errorMessage);
    }

    return response.data.data;
  } catch (error) {
    console.error("❌ Error forwarding to BI:", error.message);

    // Detectar timeout
    if (error.code === "ECONNABORTED") {
      console.error("⚠️  TIMEOUT: La solicitud al BI tardó más de 30 segundos");
      console.error("💡 Probablemente una query lenta en PostgreSQL");
    }

    if (error.response) {
      console.error("❌ Response status:", error.response.status);
      console.error("❌ Response data:", error.response.data);
    }
    throw error;
  }
}

export const biResolvers = {
  Query: {
    evaluacionKPI: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `query evaluacionKPI($evaluacionId: String!) {
        evaluacionKPI(evaluacionId: $evaluacionId) {
          ${fields}
        }
      }`;
      const data = await forwardToBI(query, args);
      return data.evaluacionKPI;
    },

    allEvaluacionesKPI: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `query allEvaluacionesKPI {
        allEvaluacionesKPI {
          ${fields}
        }
      }`;
      const data = await forwardToBI(query, args);
      return data.allEvaluacionesKPI;
    },

    evaluacionesByInterview: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `query evaluacionesByInterview($entrevistaId: String!) {
        evaluacionesByInterview(entrevistaId: $entrevistaId) {
          ${fields}
        }
      }`;
      const data = await forwardToBI(query, args);
      return data.evaluacionesByInterview;
    },

    evaluacionesByCompany: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `query evaluacionesByCompany($empresaId: String!) {
        evaluacionesByCompany(empresaId: $empresaId) {
          ${fields}
        }
      }`;
      const data = await forwardToBI(query, args);
      return data.evaluacionesByCompany;
    },

    evaluacionesByInterviewer: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `query evaluacionesByInterviewer($entrevistador: String!) {
        evaluacionesByInterviewer(entrevistador: $entrevistador) {
          ${fields}
        }
      }`;
      const data = await forwardToBI(query, args);
      return data.evaluacionesByInterviewer;
    },

    jobConversionRate: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `query jobConversionRate($offerId: String!) {
        jobConversionRate(offerId: $offerId) {
          ${fields}
        }
      }`;
      const data = await forwardToBI(query, args);
      return data.jobConversionRate;
    },

    allJobsConversionRate: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `query allJobsConversionRate {
        allJobsConversionRate {
          ${fields}
        }
      }`;
      const data = await forwardToBI(query, args);
      return data.allJobsConversionRate;
    },

    conversionRateByCompany: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `query conversionRateByCompany($empresaId: String!) {
        conversionRateByCompany(empresaId: $empresaId) {
          ${fields}
        }
      }`;
      const data = await forwardToBI(query, args);
      return data.conversionRateByCompany;
    },

    interviewObjectivesKPI: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `query interviewObjectivesKPI($interviewId: String!) {
        interviewObjectivesKPI(interviewId: $interviewId) {
          ${fields}
        }
      }`;
      const data = await forwardToBI(query, args);
      return data.interviewObjectivesKPI;
    },

    allInterviewsObjectivesKPI: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `query allInterviewsObjectivesKPI {
        allInterviewsObjectivesKPI {
          ${fields}
        }
      }`;
      const data = await forwardToBI(query, args);
      return data.allInterviewsObjectivesKPI;
    },

    jobConversionRateByPeriod: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `query jobConversionRateByPeriod($offerId: String!, $startDate: String!, $endDate: String!) {
        jobConversionRateByPeriod(offerId: $offerId, startDate: $startDate, endDate: $endDate) {
          ${fields}
        }
      }`;
      const data = await forwardToBI(query, args);
      return data.jobConversionRateByPeriod;
    },

    allCompaniesConversionRate: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `query allCompaniesConversionRate {
        allCompaniesConversionRate {
          ${fields}
        }
      }`;
      const data = await forwardToBI(query, args);
      return data.allCompaniesConversionRate;
    },

    candidateInterviewsObjectivesKPI: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `query candidateInterviewsObjectivesKPI($candidateName: String!) {
        candidateInterviewsObjectivesKPI(candidateName: $candidateName) {
          ${fields}
        }
      }`;
      const data = await forwardToBI(query, args);
      return data.candidateInterviewsObjectivesKPI;
    },

    interviewObjectivesByCompany: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `query interviewObjectivesByCompany($empresaId: String!) {
        interviewObjectivesByCompany(empresaId: $empresaId) {
          ${fields}
        }
      }`;
      const data = await forwardToBI(query, args);
      return data.interviewObjectivesByCompany;
    },

    allCompaniesInterviewObjectives: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `query allCompaniesInterviewObjectives {
        allCompaniesInterviewObjectives {
          ${fields}
        }
      }`;
      const data = await forwardToBI(query, args);
      return data.allCompaniesInterviewObjectives;
    },
  },
};
