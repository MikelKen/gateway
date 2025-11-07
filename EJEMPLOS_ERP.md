# Ejemplos de Peticiones GraphQL - ERP Service

Este documento contiene ejemplos de cómo usar los resolvers GraphQL del ERP que reenvía queries dinámicamente al servicio ERP en el puerto 8080/api/graphql.

## Estructura de Integración

El Gateway reenvía las queries al ERP de forma pura (GraphQL puro sin HTTP clients):
- **Patrón**: Extract fields → Reconstruct query → Forward to ERP
- **Endpoint**: `http://localhost:8080/api/graphql`
- **Función Helper**: `selectionSetToString()` - Convierte AST a GraphQL string
- **Función Helper**: `forwardToERP()` - Envía query a ERP

## Query - Empresas

### Obtener todas las empresas

```graphql
query {
  empresas {
    id
    nombre
    correo
    rubro
  }
}
```

**Respuesta esperada**:
```json
{
  "data": {
    "empresas": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "nombre": "Tech Corp",
        "correo": "contact@techcorp.com",
        "rubro": "Tecnología"
      },
      {
        "id": "550e8400-e29b-41d4-a716-446655440001",
        "nombre": "Finance Inc",
        "correo": "info@financeinc.com",
        "rubro": "Finanzas"
      }
    ]
  }
}
```

**Cómo funciona internamente**:
1. Gateway recibe la query con los campos solicitados
2. `selectionSetToString()` extrae: `id nombre correo rubro`
3. Reconstruye: `query obtenerEmpresas { obtenerEmpresas { id nombre correo rubro } }`
4. `forwardToERP()` hace axios.post a `http://localhost:8080/api/graphql`
5. Retorna datos del ERP

### Obtener empresa por ID

```graphql
query {
  empresa(id: "550e8400-e29b-41d4-a716-446655440000") {
    id
    nombre
    correo
    rubro
  }
}
```

**Respuesta esperada**:
```json
{
  "data": {
    "empresa": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "nombre": "Tech Corp",
      "correo": "contact@techcorp.com",
      "rubro": "Tecnología"
    }
  }
}
```

---

## Query - Ofertas de Trabajo

### Obtener todas las ofertas

```graphql
query {
  ofertasTrabajo {
    id
    titulo
    descripcion
    salario
    ubicacion
    empresa {
      id
      nombre
    }
  }
}
```

**Respuesta esperada**:
```json
{
  "data": {
    "ofertasTrabajo": [
      {
        "id": "650e8400-e29b-41d4-a716-446655440000",
        "titulo": "Senior Developer",
        "descripcion": "Buscamos ingeniero fullstack",
        "salario": 3500,
        "ubicacion": "Santiago",
        "empresa": {
          "id": "550e8400-e29b-41d4-a716-446655440000",
          "nombre": "Tech Corp"
        }
      }
    ]
  }
}
```

### Obtener oferta por ID (con campos anidados)

```graphql
query {
  ofertaTrabajo(id: "650e8400-e29b-41d4-a716-446655440000") {
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
    }
  }
}
```

---

## Query - Postulaciones

### Obtener todas las postulaciones

```graphql
query {
  postulaciones {
    id
    nombre
    aniosExperiencia
    nivelEducacion
    estado
    ofertaTrabajo {
      id
      titulo
    }
  }
}
```

### Obtener postulación por ID

```graphql
query {
  postulacion(id: "750e8400-e29b-41d4-a716-446655440000") {
    id
    nombre
    aniosExperiencia
    nivelEducacion
    habilidades
    idiomas
    certificaciones
    puestoActual
    urlCv
    fechaPostulacion
    estado
  }
}
```

---

## Query - Entrevistas

### Obtener todas las entrevistas

```graphql
query {
  entrevistas {
    id
    fecha
    duracionMin
    objetivosTotales
    objetivosCubiertos
    entrevistador
    postulacion {
      id
      nombre
    }
  }
}
```

### Obtener entrevista por ID

```graphql
query {
  entrevista(id: "850e8400-e29b-41d4-a716-446655440000") {
    id
    fecha
    duracionMin
    objetivosTotales
    objetivosCubiertos
    entrevistador
  }
}
```

---

## Query - Evaluaciones

### Obtener todas las evaluaciones

```graphql
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
    }
  }
}
```

### Obtener evaluación por ID

```graphql
query {
  evaluacion(id: "950e8400-e29b-41d4-a716-446655440000") {
    id
    calificacionTecnica
    calificacionActitud
    calificacionGeneral
    comentarios
  }
}
```

---

## Query - Visualizaciones de Oferta

### Obtener todas las visualizaciones

```graphql
query {
  visualizacionesOferta {
    id
    fechaVisualizacion
    origen
    ofertaTrabajo {
      id
      titulo
    }
  }
}
```

### Obtener visualización por ID

```graphql
query {
  visualizacionOferta(id: "a50e8400-e29b-41d4-a716-446655440000") {
    id
    fechaVisualizacion
    origen
  }
}
```

---

## Mutation - Crear Empresa

```graphql
mutation {
  crearEmpresa(input: {
    nombre: "Nueva Tech"
    correo: "contact@nuevatech.com"
    rubro: "Tecnología"
  }) {
    id
    nombre
    correo
    rubro
  }
}
```

**Respuesta esperada**:
```json
{
  "data": {
    "crearEmpresa": {
      "id": "b50e8400-e29b-41d4-a716-446655440000",
      "nombre": "Nueva Tech",
      "correo": "contact@nuevatech.com",
      "rubro": "Tecnología"
    }
  }
}
```

---

## Mutation - Eliminar Empresa

```graphql
mutation {
  eliminarEmpresa(id: "550e8400-e29b-41d4-a716-446655440000") {
    id
    nombre
  }
}
```

---

## Mutation - Crear Oferta de Trabajo

```graphql
mutation {
  crearOfertaTrabajo(input: {
    titulo: "Full Stack Developer"
    descripcion: "Buscamos desarrollador con experiencia en React y Node"
    salario: 4000
    ubicacion: "Valparaíso"
    requisitos: "3+ años experiencia, React, Node.js"
    fechaPublicacion: "2024-01-15"
    empresaId: "550e8400-e29b-41d4-a716-446655440000"
  }) {
    id
    titulo
    salario
    ubicacion
  }
}
```

---

## Mutation - Crear Postulación

```graphql
mutation {
  crearPostulacion(input: {
    nombre: "Juan Pérez"
    aniosExperiencia: 5
    nivelEducacion: "Universitario"
    habilidades: ["React", "Node.js", "PostgreSQL"]
    idiomas: ["Español", "Inglés"]
    certificaciones: ["AWS", "Scrum"]
    puestoActual: "Senior Developer"
    urlCv: "https://cv.example.com/juan-perez"
    fechaPostulacion: "2024-01-15"
    estado: "En revisión"
    ofertaId: "650e8400-e29b-41d4-a716-446655440000"
  }) {
    id
    nombre
    estado
  }
}
```

---

## Mutation - Crear Entrevista

```graphql
mutation {
  crearEntrevista(input: {
    fecha: "2024-01-20T10:00:00Z"
    duracionMin: 60
    objetivosTotales: 5
    objetivosCubiertos: 4
    entrevistador: "María González"
    postulacionId: "750e8400-e29b-41d4-a716-446655440000"
  }) {
    id
    fecha
    duracionMin
  }
}
```

---

## Mutation - Crear Evaluación

```graphql
mutation {
  crearEvaluacion(input: {
    calificacionTecnica: 8.5
    calificacionActitud: 9.0
    calificacionGeneral: 8.7
    comentarios: "Excelente candidato, muy motivado"
    entrevistaId: "850e8400-e29b-41d4-a716-446655440000"
  }) {
    id
    calificacionGeneral
    comentarios
  }
}
```

---

## Mutation - Crear Visualización de Oferta

```graphql
mutation {
  crearVisualizacionOferta(input: {
    fechaVisualizacion: "2024-01-15T14:30:00Z"
    origen: "LinkedIn"
    ofertaId: "650e8400-e29b-41d4-a716-446655440000"
  }) {
    id
    fechaVisualizacion
    origen
  }
}
```

---

## Mutation - Eliminar Registros

### Eliminar oferta de trabajo

```graphql
mutation {
  eliminarOfertaTrabajo(id: "650e8400-e29b-41d4-a716-446655440000") {
    id
    titulo
  }
}
```

### Eliminar postulación

```graphql
mutation {
  eliminarPostulacion(id: "750e8400-e29b-41d4-a716-446655440000") {
    id
    nombre
  }
}
```

### Eliminar entrevista

```graphql
mutation {
  eliminarEntrevista(id: "850e8400-e29b-41d4-a716-446655440000") {
    id
  }
}
```

### Eliminar evaluación

```graphql
mutation {
  eliminarEvaluacion(id: "950e8400-e29b-41d4-a716-446655440000") {
    id
  }
}
```

### Eliminar visualización de oferta

```graphql
mutation {
  eliminarVisualizacionOferta(id: "a50e8400-e29b-41d4-a716-446655440000") {
    id
  }
}
```

---

## Notas Importantes

1. **GraphQL Puro**: Todos los resolvers reenvían las queries dinámicamente al ERP sin usar HTTP clients
2. **Selección Dinámica**: Solo se solicitan los campos que el cliente especifica
3. **Campos Anidados**: Se soportan campos anidados (ejemplo: `empresa { nombre }`)
4. **Variables**: Se pueden usar variables GraphQL en todas las queries
5. **Endpoint**: El ERP responde en `http://localhost:8080/api/graphql`

## Patrones de Uso

### Con variables

```graphql
query obtenerEmpresaPorId($id: UUID!) {
  empresa(id: $id) {
    id
    nombre
    rubro
  }
}
```

Variables:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000"
}
```

### Query múltiple

```graphql
query {
  empresas {
    id
    nombre
  }
  ofertasTrabajo {
    id
    titulo
    salario
  }
}
```

---

## Debugging

Si encuentras errores, el servidor muestra logs como:
```
💼 Forwarding to ERP: query obtenerEmpresas { obtenerEmpresas { ...
❌ Error forwarding to ERP: Connection refused
```

Asegúrate de que el ERP está ejecutándose en `http://localhost:8080/api/graphql`
