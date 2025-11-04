# Gateway ERP - Documentación de Uso

Esta documentación describe cómo usar el gateway del `service_ai` para conectarse al microservicio ERP de Spring Boot.

## Configuración Inicial

### 1. Variables de Entorno

Copia el archivo `.env.example` a `.env` y configura las variables:

```bash
cp .env.example .env
```

### 2. Configuración del ERP

El gateway está configurado para comunicarse con el microservicio ERP a través de GraphQL. Asegúrate de que el ERP esté ejecutándose en el puerto 8080.

## Estructura de Archivos Creados

```
service_ai/
├── src/
│   ├── services/
│   │   ├── erpConfig.js          # Configuración específica para ERP
│   │   ├── erpClient.js          # Cliente especializado para ERP
│   │   └── microserviceClient.js # Cliente principal actualizado
│   └── schema/
│       ├── typeDefs.js           # Tipos GraphQL actualizados
│       └── resolvers/
│           ├── erpResolvers.js   # Resolvers para ERP
│           └── index.js          # Índice de resolvers actualizado
├── .env.example                  # Variables de entorno actualizadas
└── ERP_GATEWAY_USAGE.md         # Esta documentación
```

## Queries Disponibles

### Empresas

```graphql
# Obtener todas las empresas
query {
  empresas {
    id
    nombre
    correo
    rubro
  }
}

# Obtener empresa por ID
query {
  empresa(id: "uuid-here") {
    id
    nombre
    correo
    rubro
  }
}
```

### Ofertas de Trabajo

```graphql
# Obtener todas las ofertas
query {
  ofertasTrabajo {
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

# Obtener oferta por ID
query {
  ofertaTrabajo(id: "uuid-here") {
    id
    titulo
    descripcion
    empresa {
      nombre
      correo
    }
  }
}
```

### Postulaciones

```graphql
# Obtener todas las postulaciones
query {
  postulaciones {
    id
    nombre
    puestoActual
    oferta {
      id
      titulo
      empresa {
        nombre
      }
    }
  }
}

# Obtener postulación por ID
query {
  postulacion(id: "uuid-here") {
    id
    nombre
    puestoActual
    oferta {
      titulo
      empresa {
        nombre
      }
    }
  }
}
```

### Entrevistas

```graphql
# Obtener todas las entrevistas
query {
  entrevistas {
    id
    fecha
    duracionMin
    entrevistador
    postulacion {
      id
      nombre
      oferta {
        titulo
      }
    }
  }
}

# Obtener entrevista por ID
query {
  entrevista(id: "uuid-here") {
    id
    fecha
    duracionMin
    entrevistador
    postulacion {
      nombre
    }
  }
}
```

### Evaluaciones

```graphql
# Obtener todas las evaluaciones
query {
  evaluaciones {
    id
    calificacionTecnica
    calificacionActitud
    calificacionGeneral
    comentarios
    entrevista {
      id
      fecha
      postulacion {
        nombre
      }
    }
  }
}

# Obtener evaluación por ID
query {
  evaluacion(id: "uuid-here") {
    id
    calificacionTecnica
    calificacionActitud
    calificacionGeneral
    comentarios
    entrevista {
      fecha
    }
  }
}
```

### Visualizaciones de Ofertas

```graphql
# Obtener todas las visualizaciones
query {
  visualizacionesOferta {
    id
    fechaVisualizacion
    origen
    oferta {
      id
      titulo
      empresa {
        nombre
      }
    }
  }
}

# Obtener visualización por ID
query {
  visualizacionOferta(id: "uuid-here") {
    id
    fechaVisualizacion
    origen
    oferta {
      titulo
    }
  }
}
```

## Mutations Disponibles

### Crear Empresa

```graphql
mutation {
  createEmpresa(nombre: "Tech Corp", correo: "contact@techcorp.com", rubro: "Tecnología") {
    id
    nombre
    correo
    rubro
  }
}
```

### Crear Oferta de Trabajo

```graphql
mutation {
  createOfertaTrabajo(
    titulo: "Desarrollador Full Stack"
    descripcion: "Desarrollador con experiencia en Java y React"
    salario: 8000.0
    ubicacion: "Santa Cruz, Bolivia"
    requisitos: "3+ años de experiencia"
    fechaPublicacion: "2024-11-04"
    empresaId: "uuid-empresa"
  ) {
    id
    titulo
    descripcion
    salario
    empresa {
      nombre
    }
  }
}
```

### Crear Postulación

```graphql
mutation {
  createPostulacion(
    nombre: "Juan Pérez"
    aniosExperiencia: 5
    nivelEducacion: "Universitario"
    habilidades: "Java, Spring Boot, React"
    idiomas: "Español, Inglés"
    certificaciones: "Oracle Certified"
    puestoActual: "Desarrollador Senior"
    urlCv: "https://example.com/cv.pdf"
    fechaPostulacion: "2024-11-04"
    estado: "En proceso"
    ofertaId: "uuid-oferta"
  ) {
    id
    nombre
    puestoActual
    oferta {
      titulo
    }
  }
}
```

### Crear Entrevista

```graphql
mutation {
  createEntrevista(
    fecha: "2024-11-10"
    duracionMin: 60
    objetivosTotales: "Evaluar conocimientos técnicos"
    objetivosCubiertos: "Conocimientos básicos"
    entrevistador: "María González"
    postulacionId: "uuid-postulacion"
  ) {
    id
    fecha
    duracionMin
    entrevistador
    postulacion {
      nombre
    }
  }
}
```

### Crear Evaluación

```graphql
mutation {
  createEvaluacion(
    calificacionTecnica: 8.5
    calificacionActitud: 9.0
    calificacionGeneral: 8.75
    comentarios: "Candidato con buen potencial"
    entrevistaId: "uuid-entrevista"
  ) {
    id
    calificacionTecnica
    calificacionActitud
    calificacionGeneral
    comentarios
    entrevista {
      fecha
    }
  }
}
```

### Crear Visualización de Oferta

```graphql
mutation {
  createVisualizacionOferta(fechaVisualizacion: "2024-11-04", origen: "Portal Web", ofertaId: "uuid-oferta") {
    id
    fechaVisualizacion
    origen
    oferta {
      titulo
    }
  }
}
```

## Eliminar Entidades

Todas las entidades tienen mutations de eliminación:

```graphql
# Eliminar empresa
mutation {
  deleteEmpresa(id: "uuid-here")
}

# Eliminar oferta de trabajo
mutation {
  deleteOfertaTrabajo(id: "uuid-here")
}

# Eliminar postulación
mutation {
  deletePostulacion(id: "uuid-here")
}

# Eliminar entrevista
mutation {
  deleteEntrevista(id: "uuid-here")
}

# Eliminar evaluación
mutation {
  deleteEvaluacion(id: "uuid-here")
}

# Eliminar visualización de oferta
mutation {
  deleteVisualizacionOferta(id: "uuid-here")
}
```

## Health Check

Para verificar el estado de los servicios:

```graphql
query {
  healthCheck {
    gateway
    services {
      service_erp {
        status
        message
      }
      service_bi {
        status
        message
      }
      service_ml {
        status
        message
      }
    }
  }
}
```

## Uso Programático

### Desde JavaScript/Node.js

```javascript
import { microserviceClient } from "./src/services/microserviceClient.js";

// Obtener todas las empresas
const empresas = await microserviceClient.getAllEmpresas();

// Crear nueva empresa
const nuevaEmpresa = await microserviceClient.createEmpresa({
  nombre: "Nueva Empresa",
  correo: "contacto@nuevaempresa.com",
  rubro: "Tecnología",
});
```

### Desde el cliente ERP específico

```javascript
import { erpClient } from "./src/services/erpClient.js";

// Operaciones directas con el ERP
const ofertas = await erpClient.getAllOfertas();
const empresa = await erpClient.getEmpresaById("uuid-here");
```

## Configuración Avanzada

### Timeout y Retry

El cliente ERP está configurado con:

- Timeout: 10 segundos
- Reintentos: 3 intentos
- Delay entre reintentos: 1 segundo

### Logging

Todos las operaciones se registran en la consola con prefijos específicos:

- 🏢 Para requests al ERP
- 📊 Para queries/mutations GraphQL
- ❌ Para errores

### Error Handling

El cliente maneja automáticamente:

- Errores de conexión
- Errores de GraphQL
- Timeouts
- Errores de validación

## Troubleshooting

### Problemas Comunes

1. **Error de conexión**: Verificar que el ERP esté ejecutándose en puerto 8080
2. **Timeout**: Aumentar el valor en `erpConfig.js`
3. **Errores GraphQL**: Revisar los logs para detalles específicos

### Debugging

Activar logging detallado configurando:

```bash
LOG_LEVEL=debug
ENABLE_QUERY_LOGGING=true
```

## Próximos Pasos

1. Implementar cache para consultas frecuentes
2. Agregar autenticación y autorización
3. Implementar subscriptions para updates en tiempo real
4. Agregar métricas y monitoreo
