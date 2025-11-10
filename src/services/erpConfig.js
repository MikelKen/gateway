/**
 * Configuración específica para la conexión con el microservicio ERP (Spring Boot GraphQL)
 */
export const erpConfig = {
  // URL del microservicio ERP
  url: process.env.SERVICE_ERP_URL || "http://localhost:8080",

  // Endpoint GraphQL del ERP (incluyendo context path)
  graphqlEndpoint: process.env.ERP_GRAPHQL_ENDPOINT || "/api/graphql",

  // Configuración de timeout específica para ERP
  timeout: parseInt(process.env.ERP_TIMEOUT) || 10000, // Headers específicos para comunicación con ERP
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },

  // Configuración de retry para operaciones críticas
  retry: {
    attempts: parseInt(process.env.ERP_RETRY_ATTEMPTS) || 3,
    delay: parseInt(process.env.ERP_RETRY_DELAY) || 1000,
  },

  // Mapeo de entidades del ERP
  entities: {
    EMPRESA: "Empresa",
    OFERTA_TRABAJO: "OfertaTrabajo",
    POSTULACION: "Postulacion",
    ENTREVISTA: "Entrevista",
    EVALUACION: "Evaluacion",
    VISUALIZACION_OFERTA: "VisualizacionOferta",
  },

  // Queries predefinidas para el ERP
  queries: {
    // Queries para Empresas
    GET_ALL_EMPRESAS: `
      query {
        obtenerEmpresas {
          id
          nombre
          correo
          rubro
        }
      }
    `,

    GET_EMPRESA_BY_ID: `
      query GetEmpresaById($id: UUID!) {
        obtenerEmpresaPorId(id: $id) {
          id
          nombre
          correo
          rubro
        }
      }
    `,

    // Queries para Ofertas de Trabajo
    GET_ALL_OFERTAS: `
      query {
        obtenerOfertasTrabajo {
          id
          titulo
          descripcion
          salario
          ubicacion
          requisitos
          fechaPublicacion
          empresa {
            id
            nombre
            correo
            rubro
          }
        }
      }
    `,

    GET_OFERTA_BY_ID: `
      query GetOfertaById($id: UUID!) {
        obtenerOfertaTrabajoPorId(id: $id) {
          id
          titulo
          descripcion
          salario
          ubicacion
          requisitos
          fechaPublicacion
          empresa {
            id
            nombre
            correo
            rubro
          }
        }
      }
    `,
    GET_OFERTA_BY_COMPANY_ID: `
      query ObtenerOfertasPorEmpresa($empresaId: UUID!, $limit: Int) {
        obtenerOfertasPorEmpresa(empresaId: $empresaId, limit: $limit) {
          id
          titulo
          descripcion
          salario
          ubicacion
          requisitos
          fechaPublicacion
          createdAt
          updatedAt
          empresa {
            id
            nombre
            correo
            rubro
          }
        }
      }
    `,

    // Queries para Postulaciones
    GET_ALL_POSTULACIONES: `
      query {
        obtenerPostulaciones {
          id
          nombre
          puestoActual
          oferta {
            id
            titulo
            empresa {
              id
              nombre
            }
          }
        }
      }
    `,

    GET_POSTULACION_BY_ID: `
      query GetPostulacionById($id: UUID!) {
        obtenerPostulacionPorId(id: $id) {
          id
          nombre
          puestoActual
          oferta {
            id
            titulo
            empresa {
              id
              nombre
            }
          }
        }
      }
    `,

    // Queries para Entrevistas
    GET_ALL_ENTREVISTAS: `
      query {
        obtenerEntrevistas {
          id
          fecha
          duracionMin
          entrevistador
          postulacion {
            id
            nombre
            oferta {
              id
              titulo
            }
          }
        }
      }
    `,

    GET_ENTREVISTA_BY_ID: `
      query GetEntrevistaById($id: UUID!) {
        obtenerEntrevistaPorId(id: $id) {
          id
          fecha
          duracionMin
          entrevistador
          postulacion {
            id
            nombre
            oferta {
              id
              titulo
            }
          }
        }
      }
    `,

    // Queries para Evaluaciones
    GET_ALL_EVALUACIONES: `
      query {
        obtenerEvaluaciones {
          id
          calificacionTecnica
          calificacionActitud
          calificacionGeneral
          comentarios
          entrevista {
            id
            fecha
            postulacion {
              id
              nombre
            }
          }
        }
      }
    `,

    GET_EVALUACION_BY_ID: `
      query GetEvaluacionById($id: UUID!) {
        obtenerEvaluacionPorId(id: $id) {
          id
          calificacionTecnica
          calificacionActitud
          calificacionGeneral
          comentarios
          entrevista {
            id
            fecha
            postulacion {
              id
              nombre
            }
          }
        }
      }
    `,

    // Queries para Visualizaciones de Ofertas
    GET_ALL_VISUALIZACIONES: `
      query {
        obtenerVisualizacionesOferta {
          id
          fechaVisualizacion
          origen
          oferta {
            id
            titulo
            empresa {
              id
              nombre
            }
          }
        }
      }
    `,

    GET_VISUALIZACION_BY_ID: `
      query GetVisualizacionById($id: UUID!) {
        obtenerVisualizacionOfertaPorId(id: $id) {
          id
          fechaVisualizacion
          origen
          oferta {
            id
            titulo
            empresa {
              id
              nombre
            }
          }
        }
      }
    `,
  },

  // Mutations predefinidas para el ERP
  mutations: {
    // Mutations para Empresas
    CREATE_EMPRESA: `
      mutation CreateEmpresa($nombre: String!, $correo: String!, $rubro: String!) {
        crearEmpresa(nombre: $nombre, correo: $correo, rubro: $rubro) {
          id
          nombre
          correo
          rubro
        }
      }
    `,

    DELETE_EMPRESA: `
      mutation DeleteEmpresa($id: UUID!) {
        eliminarEmpresa(id: $id)
      }
    `,

    // Mutations para Ofertas de Trabajo
    CREATE_OFERTA: `
      mutation CreateOferta(
        $titulo: String!
        $descripcion: String!
        $salario: Float
        $ubicacion: String
        $requisitos: String
        $fechaPublicacion: String
        $empresaId: UUID!
      ) {
        crearOfertaTrabajo(
          titulo: $titulo
          descripcion: $descripcion
          salario: $salario
          ubicacion: $ubicacion
          requisitos: $requisitos
          fechaPublicacion: $fechaPublicacion
          empresaId: $empresaId
        ) {
          id
          titulo
          descripcion
          salario
          ubicacion
          requisitos
          fechaPublicacion
          empresa {
            id
            nombre
          }
        }
      }
    `,

    DELETE_OFERTA: `
      mutation DeleteOferta($id: UUID!) {
        eliminarOfertaTrabajo(id: $id)
      }
    `,

    // Mutations para Postulaciones
    CREATE_POSTULACION: `
      mutation CreatePostulacion(
        $nombre: String!
        $aniosExperiencia: Int!
        $nivelEducacion: String!
        $habilidades: String!
        $idiomas: String!
        $certificaciones: String!
        $puestoActual: String!
        $urlCv: String!
        $fechaPostulacion: String!
        $estado: String!
        $ofertaId: UUID!
      ) {
        crearPostulacion(
          nombre: $nombre
          aniosExperiencia: $aniosExperiencia
          nivelEducacion: $nivelEducacion
          habilidades: $habilidades
          idiomas: $idiomas
          certificaciones: $certificaciones
          puestoActual: $puestoActual
          urlCv: $urlCv
          fechaPostulacion: $fechaPostulacion
          estado: $estado
          ofertaId: $ofertaId
        ) {
          id
          nombre
          puestoActual
          oferta {
            id
            titulo
          }
        }
      }
    `,

    DELETE_POSTULACION: `
      mutation DeletePostulacion($id: UUID!) {
        eliminarPostulacion(id: $id)
      }
    `,

    // Mutations para Entrevistas
    CREATE_ENTREVISTA: `
      mutation CreateEntrevista(
        $fecha: String!
        $duracionMin: Int
        $objetivosTotales: String
        $objetivosCubiertos: String
        $entrevistador: String
        $postulacionId: UUID!
      ) {
        crearEntrevista(
          fecha: $fecha
          duracionMin: $duracionMin
          objetivosTotales: $objetivosTotales
          objetivosCubiertos: $objetivosCubiertos
          entrevistador: $entrevistador
          postulacionId: $postulacionId
        ) {
          id
          fecha
          duracionMin
          entrevistador
          postulacion {
            id
            nombre
          }
        }
      }
    `,

    DELETE_ENTREVISTA: `
      mutation DeleteEntrevista($id: UUID!) {
        eliminarEntrevista(id: $id)
      }
    `,

    // Mutations para Evaluaciones
    CREATE_EVALUACION: `
      mutation CreateEvaluacion(
        $calificacionTecnica: Float
        $calificacionActitud: Float
        $calificacionGeneral: Float
        $comentarios: String
        $entrevistaId: UUID!
      ) {
        crearEvaluacion(
          calificacionTecnica: $calificacionTecnica
          calificacionActitud: $calificacionActitud
          calificacionGeneral: $calificacionGeneral
          comentarios: $comentarios
          entrevistaId: $entrevistaId
        ) {
          id
          calificacionTecnica
          calificacionActitud
          calificacionGeneral
          comentarios
          entrevista {
            id
            fecha
          }
        }
      }
    `,

    DELETE_EVALUACION: `
      mutation DeleteEvaluacion($id: UUID!) {
        eliminarEvaluacion(id: $id)
      }
    `,

    // Mutations para Visualizaciones de Ofertas
    CREATE_VISUALIZACION: `
      mutation CreateVisualizacion(
        $fechaVisualizacion: String!
        $origen: String!
        $ofertaId: UUID!
      ) {
        crearVisualizacionOferta(
          fechaVisualizacion: $fechaVisualizacion
          origen: $origen
          ofertaId: $ofertaId
        ) {
          id
          fechaVisualizacion
          origen
          oferta {
            id
            titulo
          }
        }
      }
    `,

    DELETE_VISUALIZACION: `
      mutation DeleteVisualizacion($id: UUID!) {
        eliminarVisualizacionOferta(id: $id)
      }
    `,
  },
};
