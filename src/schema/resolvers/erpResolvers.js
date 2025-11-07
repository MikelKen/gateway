import axios from "axios";

const ERP_URL = process.env.SERVICE_ERP_URL || "http://localhost:8080";
const ERP_GRAPHQL_ENDPOINT = process.env.ERP_GRAPHQL_ENDPOINT || "/api/graphql";

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

// Función que reenvía queries a ERP
async function forwardToERP(query, variables = {}) {
  try {
    console.log(`💼 Forwarding to ERP: ${query.substring(0, 100)}...`);
    const response = await axios.post(`${ERP_URL}${ERP_GRAPHQL_ENDPOINT}`, {
      query,
      variables,
    });

    if (response.data.errors) {
      console.error("❌ ERP Error:", response.data.errors);
      throw new Error(response.data.errors[0].message);
    }

    return response.data.data;
  } catch (error) {
    console.error("❌ Error forwarding to ERP:", error.message);
    throw error;
  }
}

export const erpResolvers = {
  Query: {
    // === EMPRESAS ===
    empresas: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `query obtenerEmpresas {
        obtenerEmpresas {
          ${fields}
        }
      }`;
      const data = await forwardToERP(query, args);
      return data.obtenerEmpresas;
    },

    empresa: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `query obtenerEmpresaPorId($id: UUID) {
        obtenerEmpresaPorId(id: $id) {
          ${fields}
        }
      }`;
      const data = await forwardToERP(query, args);
      return data.obtenerEmpresaPorId;
    },

    // === OFERTAS DE TRABAJO ===
    ofertasTrabajo: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `query obtenerOfertasTrabajo {
        obtenerOfertasTrabajo {
          ${fields}
        }
      }`;
      const data = await forwardToERP(query, args);
      return data.obtenerOfertasTrabajo;
    },

    ofertaTrabajo: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `query obtenerOfertaTrabajoPorId($id: UUID) {
        obtenerOfertaTrabajoPorId(id: $id) {
          ${fields}
        }
      }`;
      const data = await forwardToERP(query, args);
      return data.obtenerOfertaTrabajoPorId;
    },

    // === POSTULACIONES ===
    postulaciones: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `query obtenerPostulaciones {
        obtenerPostulaciones {
          ${fields}
        }
      }`;
      const data = await forwardToERP(query, args);
      return data.obtenerPostulaciones;
    },

    postulacion: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `query obtenerPostulacionPorId($id: UUID) {
        obtenerPostulacionPorId(id: $id) {
          ${fields}
        }
      }`;
      const data = await forwardToERP(query, args);
      return data.obtenerPostulacionPorId;
    },

    // === ENTREVISTAS ===
    entrevistas: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `query obtenerEntrevistas {
        obtenerEntrevistas {
          ${fields}
        }
      }`;
      const data = await forwardToERP(query, args);
      return data.obtenerEntrevistas;
    },

    entrevista: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `query obtenerEntrevistaPorId($id: UUID) {
        obtenerEntrevistaPorId(id: $id) {
          ${fields}
        }
      }`;
      const data = await forwardToERP(query, args);
      return data.obtenerEntrevistaPorId;
    },

    // === EVALUACIONES ===
    evaluaciones: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `query obtenerEvaluaciones {
        obtenerEvaluaciones {
          ${fields}
        }
      }`;
      const data = await forwardToERP(query, args);
      return data.obtenerEvaluaciones;
    },

    evaluacion: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `query obtenerEvaluacionPorId($id: UUID) {
        obtenerEvaluacionPorId(id: $id) {
          ${fields}
        }
      }`;
      const data = await forwardToERP(query, args);
      return data.obtenerEvaluacionPorId;
    },

    // === VISUALIZACIONES DE OFERTA ===
    visualizacionesOferta: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `query obtenerVisualizacionesOferta {
        obtenerVisualizacionesOferta {
          ${fields}
        }
      }`;
      const data = await forwardToERP(query, args);
      return data.obtenerVisualizacionesOferta;
    },

    visualizacionOferta: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `query obtenerVisualizacionOfertaPorId($id: UUID) {
        obtenerVisualizacionOfertaPorId(id: $id) {
          ${fields}
        }
      }`;
      const data = await forwardToERP(query, args);
      return data.obtenerVisualizacionOfertaPorId;
    },
  },

  Mutation: {
    // === EMPRESAS ===
    createEmpresa: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `mutation crearEmpresa($input: EmpresaInput) {
        crearEmpresa(input: $input) {
          ${fields}
        }
      }`;
      const data = await forwardToERP(query, args);
      return data.crearEmpresa;
    },

    deleteEmpresa: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `mutation eliminarEmpresa($id: UUID) {
        eliminarEmpresa(id: $id) {
          ${fields}
        }
      }`;
      const data = await forwardToERP(query, args);
      return data.eliminarEmpresa;
    },

    // === OFERTAS DE TRABAJO ===
    createOfertaTrabajo: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `mutation crearOfertaTrabajo($input: OfertaTrabajoInput) {
        crearOfertaTrabajo(input: $input) {
          ${fields}
        }
      }`;
      const data = await forwardToERP(query, args);
      return data.crearOfertaTrabajo;
    },

    deleteOfertaTrabajo: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `mutation eliminarOfertaTrabajo($id: UUID) {
        eliminarOfertaTrabajo(id: $id) {
          ${fields}
        }
      }`;
      const data = await forwardToERP(query, args);
      return data.eliminarOfertaTrabajo;
    },

    // === POSTULACIONES ===
    createPostulacion: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `mutation crearPostulacion($input: PostulacionInput) {
        crearPostulacion(input: $input) {
          ${fields}
        }
      }`;
      const data = await forwardToERP(query, args);
      return data.crearPostulacion;
    },

    deletePostulacion: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `mutation eliminarPostulacion($id: UUID) {
        eliminarPostulacion(id: $id) {
          ${fields}
        }
      }`;
      const data = await forwardToERP(query, args);
      return data.eliminarPostulacion;
    },

    // === ENTREVISTAS ===
    createEntrevista: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `mutation crearEntrevista($input: EntrevistaInput) {
        crearEntrevista(input: $input) {
          ${fields}
        }
      }`;
      const data = await forwardToERP(query, args);
      return data.crearEntrevista;
    },

    deleteEntrevista: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `mutation eliminarEntrevista($id: UUID) {
        eliminarEntrevista(id: $id) {
          ${fields}
        }
      }`;
      const data = await forwardToERP(query, args);
      return data.eliminarEntrevista;
    },

    // === EVALUACIONES ===
    createEvaluacion: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `mutation crearEvaluacion($input: EvaluacionInput) {
        crearEvaluacion(input: $input) {
          ${fields}
        }
      }`;
      const data = await forwardToERP(query, args);
      return data.crearEvaluacion;
    },

    deleteEvaluacion: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `mutation eliminarEvaluacion($id: UUID) {
        eliminarEvaluacion(id: $id) {
          ${fields}
        }
      }`;
      const data = await forwardToERP(query, args);
      return data.eliminarEvaluacion;
    },

    // === VISUALIZACIONES DE OFERTA ===
    createVisualizacionOferta: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `mutation crearVisualizacionOferta($input: VisualizacionOfertaInput) {
        crearVisualizacionOferta(input: $input) {
          ${fields}
        }
      }`;
      const data = await forwardToERP(query, args);
      return data.crearVisualizacionOferta;
    },

    deleteVisualizacionOferta: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `mutation eliminarVisualizacionOferta($id: UUID) {
        eliminarVisualizacionOferta(id: $id) {
          ${fields}
        }
      }`;
      const data = await forwardToERP(query, args);
      return data.eliminarVisualizacionOferta;
    },
  },
};
