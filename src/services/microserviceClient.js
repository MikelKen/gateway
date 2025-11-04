import axios from "axios";
import { config } from "./config.js";
import { erpClient } from "./erpClient.js";

class MicroserviceClient {
  constructor() {
    this.clients = {};
    this.erpClient = erpClient; // Cliente especializado para ERP
    this.initializeClients();
  }

  initializeClients() {
    // Crear instancias de axios para cada microservicio (excepto ERP que tiene su propio cliente)
    Object.entries(config.services).forEach(([key, service]) => {
      if (key !== "erp") {
        // Skip ERP ya que tiene su cliente especializado
        this.clients[key] = axios.create({
          baseURL: service.url,
          timeout: config.timeouts.default,
          headers: {
            "Content-Type": "application/json",
          },
        });

        // Interceptor para logging
        this.clients[key].interceptors.request.use(
          (config) => {
            console.log(`📤 Request to ${service.name}: ${config.method?.toUpperCase()} ${config.url}`);
            return config;
          },
          (error) => {
            console.error(`❌ Request error to ${service.name}:`, error.message);
            return Promise.reject(error);
          }
        );

        this.clients[key].interceptors.response.use(
          (response) => {
            console.log(`📥 Response from ${service.name}: ${response.status} ${response.statusText}`);
            return response;
          },
          (error) => {
            console.error(`❌ Response error from ${service.name}:`, error.message);
            return Promise.reject(error);
          }
        );
      }
    });
  }

  // === MÉTODOS PARA ERP (AHORA USANDO ERP CLIENT ESPECIALIZADO) ===

  // Métodos para usuarios (legacy - mantener compatibilidad)
  async getUsers() {
    try {
      // Mapear empresas como usuarios para compatibilidad hacia atrás
      const empresas = await this.erpClient.getAllEmpresas();
      return empresas.map((empresa) => ({
        id: empresa.id,
        name: empresa.nombre,
        email: empresa.correo,
        department: empresa.rubro,
      }));
    } catch (error) {
      console.error("Error fetching users from service_erp:", error.message);
      return [];
    }
  }

  async getUserById(id) {
    try {
      const empresa = await this.erpClient.getEmpresaById(id);
      if (!empresa) return null;

      return {
        id: empresa.id,
        name: empresa.nombre,
        email: empresa.correo,
        department: empresa.rubro,
      };
    } catch (error) {
      console.error(`Error fetching user ${id} from service_erp:`, error.message);
      return null;
    }
  }

  async createUser(userData) {
    try {
      const empresa = await this.erpClient.createEmpresa({
        nombre: userData.name,
        correo: userData.email,
        rubro: userData.department || "General",
      });

      return {
        id: empresa.id,
        name: empresa.nombre,
        email: empresa.correo,
        department: empresa.rubro,
      };
    } catch (error) {
      console.error("Error creating user in service_erp:", error.message);
      throw new Error("Failed to create user");
    }
  }

  // === MÉTODOS DIRECTOS PARA ERP ===

  // Empresas
  async getAllEmpresas() {
    return await this.erpClient.getAllEmpresas();
  }

  async getEmpresaById(id) {
    return await this.erpClient.getEmpresaById(id);
  }

  async createEmpresa(empresaData) {
    return await this.erpClient.createEmpresa(empresaData);
  }

  async deleteEmpresa(id) {
    return await this.erpClient.deleteEmpresa(id);
  }

  // Ofertas de Trabajo
  async getAllOfertas() {
    return await this.erpClient.getAllOfertas();
  }

  async getOfertaById(id) {
    return await this.erpClient.getOfertaById(id);
  }

  async createOferta(ofertaData) {
    return await this.erpClient.createOferta(ofertaData);
  }

  async deleteOferta(id) {
    return await this.erpClient.deleteOferta(id);
  }

  // Postulaciones
  async getAllPostulaciones() {
    return await this.erpClient.getAllPostulaciones();
  }

  async getPostulacionById(id) {
    return await this.erpClient.getPostulacionById(id);
  }

  async createPostulacion(postulacionData) {
    return await this.erpClient.createPostulacion(postulacionData);
  }

  async deletePostulacion(id) {
    return await this.erpClient.deletePostulacion(id);
  }

  // Entrevistas
  async getAllEntrevistas() {
    return await this.erpClient.getAllEntrevistas();
  }

  async getEntrevistaById(id) {
    return await this.erpClient.getEntrevistaById(id);
  }

  async createEntrevista(entrevistaData) {
    return await this.erpClient.createEntrevista(entrevistaData);
  }

  async deleteEntrevista(id) {
    return await this.erpClient.deleteEntrevista(id);
  }

  // Evaluaciones
  async getAllEvaluaciones() {
    return await this.erpClient.getAllEvaluaciones();
  }

  async getEvaluacionById(id) {
    return await this.erpClient.getEvaluacionById(id);
  }

  async createEvaluacion(evaluacionData) {
    return await this.erpClient.createEvaluacion(evaluacionData);
  }

  async deleteEvaluacion(id) {
    return await this.erpClient.deleteEvaluacion(id);
  }

  // Visualizaciones de Ofertas
  async getAllVisualizaciones() {
    return await this.erpClient.getAllVisualizaciones();
  }

  async getVisualizacionById(id) {
    return await this.erpClient.getVisualizacionById(id);
  }

  async createVisualizacion(visualizacionData) {
    return await this.erpClient.createVisualizacion(visualizacionData);
  }

  async deleteVisualizacion(id) {
    return await this.erpClient.deleteVisualizacion(id);
  }

  // Métodos para service_bi (Go Fiber GraphQL)
  async getAnalytics() {
    try {
      const query = `
        query {
          analytics {
            id
            metric
            value
            timestamp
            source
            tags
          }
        }
      `;

      const response = await this.clients.bi.post("/graphql", {
        query: query,
      });

      return response.data.data.analytics || [];
    } catch (error) {
      console.error("Error fetching analytics from service_bi:", error.message);
      return [];
    }
  }

  async getAnalyticsByMetric(metric) {
    try {
      const query = `
        query GetAnalyticsByMetric($metric: String!) {
          analyticsByMetric(metric: $metric) {
            id
            metric
            value
            timestamp
            source
            tags
          }
        }
      `;

      const response = await this.clients.bi.post("/graphql", {
        query: query,
        variables: { metric },
      });

      return response.data.data.analyticsByMetric || [];
    } catch (error) {
      console.error(`Error fetching analytics for metric ${metric} from service_bi:`, error.message);
      return [];
    }
  }

  // Métodos para service_ml (Go Fiber)
  async getProducts() {
    try {
      const response = await this.clients.ml.get("/api/products");
      return response.data;
    } catch (error) {
      console.error("Error fetching products from service_ml:", error.message);
      return [];
    }
  }

  async getProductById(id) {
    try {
      const response = await this.clients.ml.get(`/api/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product ${id} from service_ml:`, error.message);
      return null;
    }
  }

  async createProduct(productData) {
    try {
      const response = await this.clients.ml.post("/api/products", productData);
      return response.data;
    } catch (error) {
      console.error("Error creating product in service_ml:", error.message);
      throw new Error("Failed to create product");
    }
  }

  // Método para verificar salud de los servicios
  async healthCheck() {
    const results = {};

    // Health check para ERP usando cliente especializado
    results.erp = await this.erpClient.healthCheck();

    // Health check para otros servicios
    for (const [key, service] of Object.entries(config.services)) {
      if (key !== "erp") {
        // Skip ERP ya procesado
        try {
          const response = await this.clients[key].get("/health", { timeout: 2000 });
          results[key] = {
            status: "healthy",
            statusCode: response.status,
            service: service.name,
          };
        } catch (error) {
          results[key] = {
            status: "unhealthy",
            error: error.message,
            service: service.name,
          };
        }
      }
    }

    return results;
  }
}

// Singleton instance
export const microserviceClient = new MicroserviceClient();
