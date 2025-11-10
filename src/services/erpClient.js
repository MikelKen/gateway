import axios from "axios";
import { erpConfig } from "./erpConfig.js";

class ERPClient {
  constructor() {
    this.client = axios.create({
      baseURL: erpConfig.url,
      timeout: erpConfig.timeout,
      headers: erpConfig.headers,
    });

    this.setupInterceptors();
  }

  setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        console.log(`🏢 ERP Request: ${config.method?.toUpperCase()} ${config.url}`);
        if (config.data) {
          console.log("📊 Query/Mutation:", config.data.query?.substring(0, 100) + "...");
        }
        return config;
      },
      (error) => {
        console.error("❌ ERP Request Error:", error.message);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        console.log(`📥 ERP Response: ${response.status} ${response.statusText}`);
        return response;
      },
      (error) => {
        console.error("❌ ERP Response Error:", error.message);
        if (error.response?.data?.errors) {
          console.error("GraphQL Errors:", error.response.data.errors);
        }
        return Promise.reject(error);
      }
    );
  }

  async executeQuery(query, variables = {}) {
    try {
      const response = await this.client.post(erpConfig.graphqlEndpoint, {
        query,
        variables,
      });

      if (response.data.errors) {
        console.error("GraphQL Errors:", response.data.errors);
        throw new Error(`GraphQL Error: ${response.data.errors[0].message}`);
      }

      return response.data.data;
    } catch (error) {
      console.error("Error executing query:", error.message);
      throw error;
    }
  }

  async executeMutation(mutation, variables = {}) {
    try {
      const response = await this.client.post(erpConfig.graphqlEndpoint, {
        query: mutation,
        variables,
      });

      if (response.data.errors) {
        console.error("GraphQL Errors:", response.data.errors);
        throw new Error(`GraphQL Error: ${response.data.errors[0].message}`);
      }

      return response.data.data;
    } catch (error) {
      console.error("Error executing mutation:", error.message);
      throw error;
    }
  }

  // === MÉTODOS PARA EMPRESAS ===

  async getAllEmpresas() {
    try {
      const data = await this.executeQuery(erpConfig.queries.GET_ALL_EMPRESAS);
      return data.obtenerEmpresas || [];
    } catch (error) {
      console.error("Error fetching empresas:", error.message);
      return [];
    }
  }

  async getEmpresaById(id) {
    try {
      const data = await this.executeQuery(erpConfig.queries.GET_EMPRESA_BY_ID, { id });
      return data.obtenerEmpresaPorId;
    } catch (error) {
      console.error(`Error fetching empresa ${id}:`, error.message);
      return null;
    }
  }

  async createEmpresa(empresaData) {
    try {
      const data = await this.executeMutation(erpConfig.mutations.CREATE_EMPRESA, empresaData);
      return data.crearEmpresa;
    } catch (error) {
      console.error("Error creating empresa:", error.message);
      throw error;
    }
  }

  async deleteEmpresa(id) {
    try {
      const data = await this.executeMutation(erpConfig.mutations.DELETE_EMPRESA, { id });
      return data.eliminarEmpresa;
    } catch (error) {
      console.error(`Error deleting empresa ${id}:`, error.message);
      throw error;
    }
  }

  // === MÉTODOS PARA OFERTAS DE TRABAJO ===

  async getAllOfertas() {
    try {
      const data = await this.executeQuery(erpConfig.queries.GET_ALL_OFERTAS);
      return data.obtenerOfertasTrabajo || [];
    } catch (error) {
      console.error("Error fetching ofertas:", error.message);
      return [];
    }
  }

  async getAllOfertasByCompanyId(companyId, limit = 10) {
    try {
      const data = await this.executeQuery(erpConfig.queries.GET_OFERTA_BY_COMPANY_ID, { empresaId: companyId, limit });
      return data.obtenerOfertasPorEmpresa || [];
    } catch (error) {
      console.error("Error fetching ofertas:", error.message);
      return [];
    }
  }

  async getOfertaById(id) {
    try {
      const data = await this.executeQuery(erpConfig.queries.GET_OFERTA_BY_ID, { id });
      return data.obtenerOfertaTrabajoPorId;
    } catch (error) {
      console.error(`Error fetching oferta ${id}:`, error.message);
      return null;
    }
  }

  async createOferta(ofertaData) {
    try {
      const data = await this.executeMutation(erpConfig.mutations.CREATE_OFERTA, ofertaData);
      return data.crearOfertaTrabajo;
    } catch (error) {
      console.error("Error creating oferta:", error.message);
      throw error;
    }
  }

  async deleteOferta(id) {
    try {
      const data = await this.executeMutation(erpConfig.mutations.DELETE_OFERTA, { id });
      return data.eliminarOfertaTrabajo;
    } catch (error) {
      console.error(`Error deleting oferta ${id}:`, error.message);
      throw error;
    }
  }

  // === MÉTODOS PARA POSTULACIONES ===

  async getAllPostulaciones() {
    try {
      const data = await this.executeQuery(erpConfig.queries.GET_ALL_POSTULACIONES);
      return data.obtenerPostulaciones || [];
    } catch (error) {
      console.error("Error fetching postulaciones:", error.message);
      return [];
    }
  }

  async getPostulacionById(id) {
    try {
      const data = await this.executeQuery(erpConfig.queries.GET_POSTULACION_BY_ID, { id });
      return data.obtenerPostulacionPorId;
    } catch (error) {
      console.error(`Error fetching postulacion ${id}:`, error.message);
      return null;
    }
  }

  async createPostulacion(postulacionData) {
    try {
      const data = await this.executeMutation(erpConfig.mutations.CREATE_POSTULACION, postulacionData);
      return data.crearPostulacion;
    } catch (error) {
      console.error("Error creating postulacion:", error.message);
      throw error;
    }
  }

  async deletePostulacion(id) {
    try {
      const data = await this.executeMutation(erpConfig.mutations.DELETE_POSTULACION, { id });
      return data.eliminarPostulacion;
    } catch (error) {
      console.error(`Error deleting postulacion ${id}:`, error.message);
      throw error;
    }
  }

  // === MÉTODOS PARA ENTREVISTAS ===

  async getAllEntrevistas() {
    try {
      const data = await this.executeQuery(erpConfig.queries.GET_ALL_ENTREVISTAS);
      return data.obtenerEntrevistas || [];
    } catch (error) {
      console.error("Error fetching entrevistas:", error.message);
      return [];
    }
  }

  async getEntrevistaById(id) {
    try {
      const data = await this.executeQuery(erpConfig.queries.GET_ENTREVISTA_BY_ID, { id });
      return data.obtenerEntrevistaPorId;
    } catch (error) {
      console.error(`Error fetching entrevista ${id}:`, error.message);
      return null;
    }
  }

  async createEntrevista(entrevistaData) {
    try {
      const data = await this.executeMutation(erpConfig.mutations.CREATE_ENTREVISTA, entrevistaData);
      return data.crearEntrevista;
    } catch (error) {
      console.error("Error creating entrevista:", error.message);
      throw error;
    }
  }

  async deleteEntrevista(id) {
    try {
      const data = await this.executeMutation(erpConfig.mutations.DELETE_ENTREVISTA, { id });
      return data.eliminarEntrevista;
    } catch (error) {
      console.error(`Error deleting entrevista ${id}:`, error.message);
      throw error;
    }
  }

  // === MÉTODOS PARA EVALUACIONES ===

  async getAllEvaluaciones() {
    try {
      const data = await this.executeQuery(erpConfig.queries.GET_ALL_EVALUACIONES);
      return data.obtenerEvaluaciones || [];
    } catch (error) {
      console.error("Error fetching evaluaciones:", error.message);
      return [];
    }
  }

  async getEvaluacionById(id) {
    try {
      const data = await this.executeQuery(erpConfig.queries.GET_EVALUACION_BY_ID, { id });
      return data.obtenerEvaluacionPorId;
    } catch (error) {
      console.error(`Error fetching evaluacion ${id}:`, error.message);
      return null;
    }
  }

  async createEvaluacion(evaluacionData) {
    try {
      const data = await this.executeMutation(erpConfig.mutations.CREATE_EVALUACION, evaluacionData);
      return data.crearEvaluacion;
    } catch (error) {
      console.error("Error creating evaluacion:", error.message);
      throw error;
    }
  }

  async deleteEvaluacion(id) {
    try {
      const data = await this.executeMutation(erpConfig.mutations.DELETE_EVALUACION, { id });
      return data.eliminarEvaluacion;
    } catch (error) {
      console.error(`Error deleting evaluacion ${id}:`, error.message);
      throw error;
    }
  }

  // === MÉTODOS PARA VISUALIZACIONES DE OFERTAS ===

  async getAllVisualizaciones() {
    try {
      const data = await this.executeQuery(erpConfig.queries.GET_ALL_VISUALIZACIONES);
      return data.obtenerVisualizacionesOferta || [];
    } catch (error) {
      console.error("Error fetching visualizaciones:", error.message);
      return [];
    }
  }

  async getVisualizacionById(id) {
    try {
      const data = await this.executeQuery(erpConfig.queries.GET_VISUALIZACION_BY_ID, { id });
      return data.obtenerVisualizacionOfertaPorId;
    } catch (error) {
      console.error(`Error fetching visualizacion ${id}:`, error.message);
      return null;
    }
  }

  async createVisualizacion(visualizacionData) {
    try {
      const data = await this.executeMutation(erpConfig.mutations.CREATE_VISUALIZACION, visualizacionData);
      return data.crearVisualizacionOferta;
    } catch (error) {
      console.error("Error creating visualizacion:", error.message);
      throw error;
    }
  }

  async deleteVisualizacion(id) {
    try {
      const data = await this.executeMutation(erpConfig.mutations.DELETE_VISUALIZACION, { id });
      return data.eliminarVisualizacionOferta;
    } catch (error) {
      console.error(`Error deleting visualizacion ${id}:`, error.message);
      throw error;
    }
  }

  // === MÉTODO DE HEALTH CHECK ===

  async healthCheck() {
    try {
      // Intentamos hacer un health check usando el actuator endpoint
      await this.client.get("/api/actuator/health", { timeout: 2000 });
      return {
        status: "healthy",
        service: "service_erp",
        endpoint: `${erpConfig.url}/api/actuator/health`,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        status: "unhealthy",
        service: "service_erp",
        endpoint: `${erpConfig.url}/api/actuator/health`,
        error: error.message,
        timestamp: new Date().toISOString(),
      };
    }
  }
}

// Singleton instance
export const erpClient = new ERPClient();
