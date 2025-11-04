import { erpClient } from "../../services/erpClient.js";

export const erpResolvers = {
  Query: {
    // === RESOLVERS PARA EMPRESAS ===
    empresas: async () => {
      try {
        return await erpClient.getAllEmpresas();
      } catch (error) {
        console.error("Error in empresas resolver:", error.message);
        throw new Error("Failed to fetch empresas");
      }
    },

    empresa: async (_, { id }) => {
      try {
        return await erpClient.getEmpresaById(id);
      } catch (error) {
        console.error(`Error in empresa resolver for id ${id}:`, error.message);
        throw new Error(`Failed to fetch empresa with id ${id}`);
      }
    },

    // === RESOLVERS PARA OFERTAS DE TRABAJO ===
    ofertasTrabajo: async () => {
      try {
        return await erpClient.getAllOfertas();
      } catch (error) {
        console.error("Error in ofertasTrabajo resolver:", error.message);
        throw new Error("Failed to fetch ofertas de trabajo");
      }
    },

    ofertaTrabajo: async (_, { id }) => {
      try {
        return await erpClient.getOfertaById(id);
      } catch (error) {
        console.error(`Error in ofertaTrabajo resolver for id ${id}:`, error.message);
        throw new Error(`Failed to fetch oferta de trabajo with id ${id}`);
      }
    },

    // === RESOLVERS PARA POSTULACIONES ===
    postulaciones: async () => {
      try {
        return await erpClient.getAllPostulaciones();
      } catch (error) {
        console.error("Error in postulaciones resolver:", error.message);
        throw new Error("Failed to fetch postulaciones");
      }
    },

    postulacion: async (_, { id }) => {
      try {
        return await erpClient.getPostulacionById(id);
      } catch (error) {
        console.error(`Error in postulacion resolver for id ${id}:`, error.message);
        throw new Error(`Failed to fetch postulacion with id ${id}`);
      }
    },

    // === RESOLVERS PARA ENTREVISTAS ===
    entrevistas: async () => {
      try {
        return await erpClient.getAllEntrevistas();
      } catch (error) {
        console.error("Error in entrevistas resolver:", error.message);
        throw new Error("Failed to fetch entrevistas");
      }
    },

    entrevista: async (_, { id }) => {
      try {
        return await erpClient.getEntrevistaById(id);
      } catch (error) {
        console.error(`Error in entrevista resolver for id ${id}:`, error.message);
        throw new Error(`Failed to fetch entrevista with id ${id}`);
      }
    },

    // === RESOLVERS PARA EVALUACIONES ===
    evaluaciones: async () => {
      try {
        return await erpClient.getAllEvaluaciones();
      } catch (error) {
        console.error("Error in evaluaciones resolver:", error.message);
        throw new Error("Failed to fetch evaluaciones");
      }
    },

    evaluacion: async (_, { id }) => {
      try {
        return await erpClient.getEvaluacionById(id);
      } catch (error) {
        console.error(`Error in evaluacion resolver for id ${id}:`, error.message);
        throw new Error(`Failed to fetch evaluacion with id ${id}`);
      }
    },

    // === RESOLVERS PARA VISUALIZACIONES DE OFERTAS ===
    visualizacionesOferta: async () => {
      try {
        return await erpClient.getAllVisualizaciones();
      } catch (error) {
        console.error("Error in visualizacionesOferta resolver:", error.message);
        throw new Error("Failed to fetch visualizaciones de oferta");
      }
    },

    visualizacionOferta: async (_, { id }) => {
      try {
        return await erpClient.getVisualizacionById(id);
      } catch (error) {
        console.error(`Error in visualizacionOferta resolver for id ${id}:`, error.message);
        throw new Error(`Failed to fetch visualizacion de oferta with id ${id}`);
      }
    },
  },

  Mutation: {
    // === MUTATIONS PARA EMPRESAS ===
    createEmpresa: async (_, { nombre, correo, rubro }) => {
      try {
        return await erpClient.createEmpresa({ nombre, correo, rubro });
      } catch (error) {
        console.error("Error in createEmpresa mutation:", error.message);
        throw new Error("Failed to create empresa");
      }
    },

    deleteEmpresa: async (_, { id }) => {
      try {
        return await erpClient.deleteEmpresa(id);
      } catch (error) {
        console.error(`Error in deleteEmpresa mutation for id ${id}:`, error.message);
        throw new Error(`Failed to delete empresa with id ${id}`);
      }
    },

    // === MUTATIONS PARA OFERTAS DE TRABAJO ===
    createOfertaTrabajo: async (_, args) => {
      try {
        const { titulo, descripcion, salario, ubicacion, requisitos, fechaPublicacion, empresaId } = args;
        return await erpClient.createOferta({
          titulo,
          descripcion,
          salario,
          ubicacion,
          requisitos,
          fechaPublicacion,
          empresaId,
        });
      } catch (error) {
        console.error("Error in createOfertaTrabajo mutation:", error.message);
        throw new Error("Failed to create oferta de trabajo");
      }
    },

    deleteOfertaTrabajo: async (_, { id }) => {
      try {
        return await erpClient.deleteOferta(id);
      } catch (error) {
        console.error(`Error in deleteOfertaTrabajo mutation for id ${id}:`, error.message);
        throw new Error(`Failed to delete oferta de trabajo with id ${id}`);
      }
    },

    // === MUTATIONS PARA POSTULACIONES ===
    createPostulacion: async (_, args) => {
      try {
        const {
          nombre,
          aniosExperiencia,
          nivelEducacion,
          habilidades,
          idiomas,
          certificaciones,
          puestoActual,
          urlCv,
          fechaPostulacion,
          estado,
          ofertaId,
        } = args;

        return await erpClient.createPostulacion({
          nombre,
          aniosExperiencia,
          nivelEducacion,
          habilidades,
          idiomas,
          certificaciones,
          puestoActual,
          urlCv,
          fechaPostulacion,
          estado,
          ofertaId,
        });
      } catch (error) {
        console.error("Error in createPostulacion mutation:", error.message);
        throw new Error("Failed to create postulacion");
      }
    },

    deletePostulacion: async (_, { id }) => {
      try {
        return await erpClient.deletePostulacion(id);
      } catch (error) {
        console.error(`Error in deletePostulacion mutation for id ${id}:`, error.message);
        throw new Error(`Failed to delete postulacion with id ${id}`);
      }
    },

    // === MUTATIONS PARA ENTREVISTAS ===
    createEntrevista: async (_, args) => {
      try {
        const { fecha, duracionMin, objetivosTotales, objetivosCubiertos, entrevistador, postulacionId } = args;

        return await erpClient.createEntrevista({
          fecha,
          duracionMin,
          objetivosTotales,
          objetivosCubiertos,
          entrevistador,
          postulacionId,
        });
      } catch (error) {
        console.error("Error in createEntrevista mutation:", error.message);
        throw new Error("Failed to create entrevista");
      }
    },

    deleteEntrevista: async (_, { id }) => {
      try {
        return await erpClient.deleteEntrevista(id);
      } catch (error) {
        console.error(`Error in deleteEntrevista mutation for id ${id}:`, error.message);
        throw new Error(`Failed to delete entrevista with id ${id}`);
      }
    },

    // === MUTATIONS PARA EVALUACIONES ===
    createEvaluacion: async (_, args) => {
      try {
        const { calificacionTecnica, calificacionActitud, calificacionGeneral, comentarios, entrevistaId } = args;

        return await erpClient.createEvaluacion({
          calificacionTecnica,
          calificacionActitud,
          calificacionGeneral,
          comentarios,
          entrevistaId,
        });
      } catch (error) {
        console.error("Error in createEvaluacion mutation:", error.message);
        throw new Error("Failed to create evaluacion");
      }
    },

    deleteEvaluacion: async (_, { id }) => {
      try {
        return await erpClient.deleteEvaluacion(id);
      } catch (error) {
        console.error(`Error in deleteEvaluacion mutation for id ${id}:`, error.message);
        throw new Error(`Failed to delete evaluacion with id ${id}`);
      }
    },

    // === MUTATIONS PARA VISUALIZACIONES DE OFERTAS ===
    createVisualizacionOferta: async (_, args) => {
      try {
        const { fechaVisualizacion, origen, ofertaId } = args;
        return await erpClient.createVisualizacion({
          fechaVisualizacion,
          origen,
          ofertaId,
        });
      } catch (error) {
        console.error("Error in createVisualizacionOferta mutation:", error.message);
        throw new Error("Failed to create visualizacion de oferta");
      }
    },

    deleteVisualizacionOferta: async (_, { id }) => {
      try {
        return await erpClient.deleteVisualizacion(id);
      } catch (error) {
        console.error(`Error in deleteVisualizacionOferta mutation for id ${id}:`, error.message);
        throw new Error(`Failed to delete visualizacion de oferta with id ${id}`);
      }
    },
  },
};
