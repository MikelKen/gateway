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
      const query = `query obtenerEmpresas($limit: Int) {
        obtenerEmpresas(limit: $limit) {
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
      const query = `query obtenerOfertasTrabajo($limit: Int) {
        obtenerOfertasTrabajo(limit: $limit) {
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
      const query = `query obtenerPostulaciones($limit: Int) {
        obtenerPostulaciones(limit: $limit) {
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
      const query = `query obtenerEntrevistas($limit: Int) {
        obtenerEntrevistas(limit: $limit) {
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
      const query = `query obtenerEvaluaciones($limit: Int) {
        obtenerEvaluaciones(limit: $limit) {
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
      const query = `query obtenerVisualizacionesOferta($limit: Int) {
        obtenerVisualizacionesOferta(limit: $limit) {
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
      const query = `mutation crearEmpresa($nombre: String!, $correo: String!, $rubro: String!) {
        crearEmpresa(nombre: $nombre, correo: $correo, rubro: $rubro) {
          ${fields}
        }
      }`;
      const data = await forwardToERP(query, args);
      return data.crearEmpresa;
    },

    updateEmpresa: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `mutation actualizarEmpresa($id: UUID!, $nombre: String, $correo: String, $rubro: String) {
        actualizarEmpresa(id: $id, nombre: $nombre, correo: $correo, rubro: $rubro) {
          ${fields}
        }
      }`;
      const data = await forwardToERP(query, args);
      return data.actualizarEmpresa;
    },

    deleteEmpresa: async (_, args, context, info) => {
      const query = `mutation eliminarEmpresa($id: UUID!) {
        eliminarEmpresa(id: $id)
      }`;
      const data = await forwardToERP(query, args);
      return data.eliminarEmpresa;
    },

    // === OFERTAS DE TRABAJO ===
    createOfertaTrabajo: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `mutation crearOfertaTrabajo($titulo: String!, $descripcion: String!, $salario: Float, $ubicacion: String, $requisitos: String, $fechaPublicacion: String, $empresaId: UUID!) {
        crearOfertaTrabajo(titulo: $titulo, descripcion: $descripcion, salario: $salario, ubicacion: $ubicacion, requisitos: $requisitos, fechaPublicacion: $fechaPublicacion, empresaId: $empresaId) {
          ${fields}
        }
      }`;
      const data = await forwardToERP(query, args);
      return data.crearOfertaTrabajo;
    },

    updateOfertaTrabajo: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `mutation actualizarOfertaTrabajo($id: UUID!, $titulo: String, $descripcion: String, $salario: Float, $ubicacion: String, $requisitos: String, $fechaPublicacion: String) {
        actualizarOfertaTrabajo(id: $id, titulo: $titulo, descripcion: $descripcion, salario: $salario, ubicacion: $ubicacion, requisitos: $requisitos, fechaPublicacion: $fechaPublicacion) {
          ${fields}
        }
      }`;
      const data = await forwardToERP(query, args);
      return data.actualizarOfertaTrabajo;
    },

    deleteOfertaTrabajo: async (_, args, context, info) => {
      const query = `mutation eliminarOfertaTrabajo($id: UUID!) {
        eliminarOfertaTrabajo(id: $id)
      }`;
      const data = await forwardToERP(query, args);
      return data.eliminarOfertaTrabajo;
    },

    // === POSTULACIONES ===
    createPostulacion: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `mutation crearPostulacion($nombre: String!, $aniosExperiencia: Int!, $nivelEducacion: String!, $habilidades: String!, $idiomas: String!, $certificaciones: String!, $puestoActual: String!, $urlCv: String!, $fechaPostulacion: String!, $estado: String!, $telefono: String!, $email: String!, $ofertaId: UUID!) {
        crearPostulacion(nombre: $nombre, aniosExperiencia: $aniosExperiencia, nivelEducacion: $nivelEducacion, habilidades: $habilidades, idiomas: $idiomas, certificaciones: $certificaciones, puestoActual: $puestoActual, urlCv: $urlCv, fechaPostulacion: $fechaPostulacion, estado: $estado, telefono: $telefono, email: $email, ofertaId: $ofertaId) {
          ${fields}
        }
      }`;
      const data = await forwardToERP(query, args);
      return data.crearPostulacion;
    },

    updatePostulacion: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `mutation actualizarPostulacion($id: UUID!, $nombre: String, $aniosExperiencia: Int, $nivelEducacion: String, $habilidades: String, $idiomas: String, $certificaciones: String, $puestoActual: String, $urlCv: String, $fechaPostulacion: String, $estado: String, $telefono: String, $email: String) {
        actualizarPostulacion(id: $id, nombre: $nombre, aniosExperiencia: $aniosExperiencia, nivelEducacion: $nivelEducacion, habilidades: $habilidades, idiomas: $idiomas, certificaciones: $certificaciones, puestoActual: $puestoActual, urlCv: $urlCv, fechaPostulacion: $fechaPostulacion, estado: $estado, telefono: $telefono, email: $email) {
          ${fields}
        }
      }`;
      const data = await forwardToERP(query, args);
      return data.actualizarPostulacion;
    },

    deletePostulacion: async (_, args, context, info) => {
      const query = `mutation eliminarPostulacion($id: UUID!) {
        eliminarPostulacion(id: $id)
      }`;
      const data = await forwardToERP(query, args);
      return data.eliminarPostulacion;
    },

    // === ENTREVISTAS ===
    createEntrevista: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `mutation crearEntrevista($fecha: String!, $duracionMin: Int, $objetivosTotales: String, $objetivosCubiertos: String, $entrevistador: String, $postulacionId: UUID!) {
        crearEntrevista(fecha: $fecha, duracionMin: $duracionMin, objetivosTotales: $objetivosTotales, objetivosCubiertos: $objetivosCubiertos, entrevistador: $entrevistador, postulacionId: $postulacionId) {
          ${fields}
        }
      }`;
      const data = await forwardToERP(query, args);
      return data.crearEntrevista;
    },

    updateEntrevista: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `mutation actualizarEntrevista($id: UUID!, $fecha: String, $duracionMin: Int, $objetivosTotales: String, $objetivosCubiertos: String, $entrevistador: String) {
        actualizarEntrevista(id: $id, fecha: $fecha, duracionMin: $duracionMin, objetivosTotales: $objetivosTotales, objetivosCubiertos: $objetivosCubiertos, entrevistador: $entrevistador) {
          ${fields}
        }
      }`;
      const data = await forwardToERP(query, args);
      return data.actualizarEntrevista;
    },

    deleteEntrevista: async (_, args, context, info) => {
      const query = `mutation eliminarEntrevista($id: UUID!) {
        eliminarEntrevista(id: $id)
      }`;
      const data = await forwardToERP(query, args);
      return data.eliminarEntrevista;
    },

    // === EVALUACIONES ===
    createEvaluacion: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `mutation crearEvaluacion($calificacionTecnica: Float, $calificacionActitud: Float, $calificacionGeneral: Float, $comentarios: String, $entrevistaId: UUID!) {
        crearEvaluacion(calificacionTecnica: $calificacionTecnica, calificacionActitud: $calificacionActitud, calificacionGeneral: $calificacionGeneral, comentarios: $comentarios, entrevistaId: $entrevistaId) {
          ${fields}
        }
      }`;
      const data = await forwardToERP(query, args);
      return data.crearEvaluacion;
    },

    updateEvaluacion: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `mutation actualizarEvaluacion($id: UUID!, $calificacionTecnica: Float, $calificacionActitud: Float, $calificacionGeneral: Float, $comentarios: String) {
        actualizarEvaluacion(id: $id, calificacionTecnica: $calificacionTecnica, calificacionActitud: $calificacionActitud, calificacionGeneral: $calificacionGeneral, comentarios: $comentarios) {
          ${fields}
        }
      }`;
      const data = await forwardToERP(query, args);
      return data.actualizarEvaluacion;
    },

    deleteEvaluacion: async (_, args, context, info) => {
      const query = `mutation eliminarEvaluacion($id: UUID!) {
        eliminarEvaluacion(id: $id)
      }`;
      const data = await forwardToERP(query, args);
      return data.eliminarEvaluacion;
    },

    // === VISUALIZACIONES DE OFERTA ===
    createVisualizacionOferta: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `mutation crearVisualizacionOferta($fechaVisualizacion: String!, $origen: String!, $ofertaId: UUID!) {
        crearVisualizacionOferta(fechaVisualizacion: $fechaVisualizacion, origen: $origen, ofertaId: $ofertaId) {
          ${fields}
        }
      }`;
      const data = await forwardToERP(query, args);
      return data.crearVisualizacionOferta;
    },

    updateVisualizacionOferta: async (_, args, context, info) => {
      const fields = selectionSetToString(info.fieldNodes[0].selectionSet.selections);
      const query = `mutation actualizarVisualizacionOferta($id: UUID!, $fechaVisualizacion: String, $origen: String) {
        actualizarVisualizacionOferta(id: $id, fechaVisualizacion: $fechaVisualizacion, origen: $origen) {
          ${fields}
        }
      }`;
      const data = await forwardToERP(query, args);
      return data.actualizarVisualizacionOferta;
    },

    deleteVisualizacionOferta: async (_, args, context, info) => {
      const query = `mutation eliminarVisualizacionOferta($id: UUID!) {
        eliminarVisualizacionOferta(id: $id)
      }`;
      const data = await forwardToERP(query, args);
      return data.eliminarVisualizacionOferta;
    },
  },
};
