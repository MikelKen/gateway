# 🔷 EJEMPLOS: getCandidatesInCluster Query

Nuevos ejemplos para obtener candidatos detallados de un cluster específico a través del gateway.

---

## 📋 Descripción General

El query `getCandidatesInCluster` permite:

- Obtener todos los candidatos pertenecientes a un cluster específico
- Filtrar por algoritmo (kmeans, dbscan)
- Limitar la cantidad de resultados
- Incluir detalles completos (skills, certificaciones, idioma, etc.)

---

## 🔷 EJEMPLO 1: Obtener primeros 10 candidatos del cluster principal

```graphql
query ObtenerCandidatosClustersBasico {
  getCandidatesInCluster(input: { clusterId: 3, algorithm: "kmeans", limit: 10 }) {
    clusterId
    totalCandidates
    clusterPercentage
    candidates {
      candidateId
      name
      email
      yearsExperience
      workArea
    }
  }
}
```

**Descripción:**

- Obtiene los 10 primeros candidatos del cluster 3 (cluster principal con ~47% de candidatos)
- Retorna información básica: ID, nombre, email, experiencia y área de trabajo
- Ideal para exploración inicial rápida

**Respuesta Esperada:**

```json
{
  "data": {
    "getCandidatesInCluster": {
      "clusterId": 3,
      "totalCandidates": 4678,
      "clusterPercentage": 47.2,
      "candidates": [
        {
          "candidateId": "507f1f77bcf86cd799439011",
          "name": "Juan Pérez García",
          "email": "juan.perez@example.com",
          "yearsExperience": 8,
          "workArea": "Desarrollo"
        },
        ...
      ]
    }
  }
}
```

---

## 🔷 EJEMPLO 2: Obtener datos COMPLETOS de 20 candidatos

```graphql
query ObtenerDetallesCompletos {
  getCandidatesInCluster(input: { clusterId: 3, algorithm: "kmeans", includeDetails: true, limit: 20 }) {
    clusterId
    totalCandidates
    clusterPercentage
    candidates {
      candidateId
      name
      email
      yearsExperience
      educationArea
      workArea
      skills
      certifications
      englishLevel
      distanceToCenter
    }
  }
}
```

**Descripción:**

- Obtiene datos COMPLETOS de 20 candidatos
- Incluye skills, certificaciones, nivel de inglés
- Incluye distancia al centro del cluster (métrica de confianza)
- Ideal para análisis detallado de candidatos

**Respuesta Esperada:**

```json
{
  "data": {
    "getCandidatesInCluster": {
      "clusterId": 3,
      "totalCandidates": 4678,
      "clusterPercentage": 47.2,
      "candidates": [
        {
          "candidateId": "507f1f77bcf86cd799439011",
          "name": "Juan Pérez García",
          "email": "juan.perez@example.com",
          "yearsExperience": 8,
          "educationArea": "Sistemas",
          "workArea": "Desarrollo",
          "skills": ["Python", "Django", "PostgreSQL", "Docker", "AWS"],
          "certifications": ["AWS Solutions Architect", "Docker Certified Associate"],
          "englishLevel": "Avanzado",
          "distanceToCenter": 2.34
        },
        ...
      ]
    }
  }
}
```

---

## 🔷 EJEMPLO 3: Explorar cluster especializado (pequeño)

```graphql
query ExplorarClusterEspecializado {
  getCandidatesInCluster(input: { clusterId: 0, algorithm: "kmeans", limit: 50 }) {
    clusterId
    totalCandidates
    clusterPercentage
    candidates {
      name
      educationArea
      certifications
      englishLevel
    }
  }
}
```

**Descripción:**

- Explora un cluster especializado (cluster 0, solo ~4% de candidatos)
- Enfoque en educación, certificaciones e idiomas
- Ideal para identificar perfiles nicho

**Respuesta Esperada:**

```json
{
  "data": {
    "getCandidatesInCluster": {
      "clusterId": 0,
      "totalCandidates": 382,
      "clusterPercentage": 3.9,
      "candidates": [
        {
          "name": "Carlos López",
          "educationArea": "Ingeniería de Software",
          "certifications": ["CPA", "Microsoft Azure Administrator"],
          "englishLevel": "Avanzado"
        },
        ...
      ]
    }
  }
}
```

---

## 🔷 EJEMPLO 4: Análisis de Skills en un cluster

```graphql
query AnalisisSkillsCluster {
  getCandidatesInCluster(input: { clusterId: 3, algorithm: "kmeans", limit: 100 }) {
    clusterId
    totalCandidates
    candidates {
      name
      skills
      yearsExperience
    }
  }
}
```

**Descripción:**

- Obtiene 100 candidatos del cluster principal
- Enfoque en habilidades técnicas y experiencia
- Ideal para análisis de tendencias de skills

**Respuesta Esperada:**

```json
{
  "data": {
    "getCandidatesInCluster": {
      "clusterId": 3,
      "totalCandidates": 4678,
      "candidates": [
        {
          "name": "Juan Pérez",
          "skills": ["Python", "Django", "PostgreSQL", "Docker"],
          "yearsExperience": 8
        },
        {
          "name": "María García",
          "skills": ["Java", "Spring Boot", "MySQL", "Kubernetes"],
          "yearsExperience": 10
        },
        ...
      ]
    }
  }
}
```

---

## 🔷 EJEMPLO 5: Exportación de candidatos para reclutamiento

```graphql
query ExportarCandidatosParaReclutamiento {
  getCandidatesInCluster(input: { clusterId: 3, algorithm: "kmeans", limit: 500, includeDetails: true }) {
    clusterId
    totalCandidates
    clusterPercentage
    candidates {
      candidateId
      name
      email
      yearsExperience
      educationArea
      workArea
      skills
      certifications
      englishLevel
    }
  }
}
```

**Descripción:**

- Exporta 500 candidatos con datos completos para procesamiento
- Ideal para enviar a sistemas de reclutamiento externos
- Incluye toda la información necesaria para evaluación

---

## 🚀 CASOS DE USO PRÁCTICOS

### 1. **Reclutamiento Masivo**

```graphql
# Obtener todos los candidatos de un cluster específico
query {
  getCandidatesInCluster(input: { clusterId: 3, algorithm: "kmeans", limit: 1000 }) {
    candidates {
      candidateId
      name
      email
      skills
    }
  }
}
```

✅ Enviar candidatos a sistemas de reclutamiento automatizado

### 2. **Análisis de Competencias**

```graphql
# Analizar skills predominantes en un cluster
query {
  getCandidatesInCluster(input: { clusterId: 1, algorithm: "kmeans", limit: 200 }) {
    candidates {
      name
      skills
      yearsExperience
    }
  }
}
```

✅ Identificar tendencias de habilidades por perfil

### 3. **Diversidad de Talento**

```graphql
# Comparar varios clusters
query {
  cluster3: getCandidatesInCluster(input: { clusterId: 3, algorithm: "kmeans", limit: 10 }) {
    totalCandidates
    candidates {
      skills
      educationArea
    }
  }
  cluster0: getCandidatesInCluster(input: { clusterId: 0, algorithm: "kmeans", limit: 10 }) {
    totalCandidates
    candidates {
      skills
      educationArea
    }
  }
}
```

✅ Comparar características entre diferentes perfiles

### 4. **Búsqueda de Especialistas**

```graphql
# Encontrar candidatos con habilidades específicas
query {
  getCandidatesInCluster(input: { clusterId: 2, algorithm: "kmeans", limit: 100 }) {
    candidates {
      name
      email
      skills
      englishLevel
    }
  }
}
```

✅ Filtrar candidatos con requirements específicos

---

## 📊 DISTRIBUCIÓN DE CLUSTERS (Referencia)

| Cluster | Candidatos | %         | Perfil        |
| ------- | ---------- | --------- | ------------- |
| 0       | 382        | 3.9%      | Especializado |
| 1       | 492        | 5.0%      | Especializado |
| 2       | 357        | 3.6%      | Especializado |
| **3**   | **4678**   | **47.2%** | **Principal** |
| 4       | 461        | 4.7%      | Especializado |
| ...     | ...        | ...       | ...           |
| 12      | 487        | 4.9%      | Especializado |

---

## 🔧 PARÁMETROS DISPONIBLES

| Parámetro        | Tipo    | Obligatorio | Descripción                                    |
| ---------------- | ------- | ----------- | ---------------------------------------------- |
| `clusterId`      | Int     | ✅          | ID del cluster (0-12)                          |
| `algorithm`      | String  | ❌          | Algoritmo: "kmeans" (default), "dbscan"        |
| `limit`          | Int     | ❌          | Máximo de candidatos a retornar                |
| `includeDetails` | Boolean | ❌          | Incluir skills, certs, idioma (default: false) |

---

## 📈 CAMPOS RETORNADOS

### Información del Cluster

- `clusterId` - Identificador del cluster
- `totalCandidates` - Total de candidatos en el cluster
- `clusterPercentage` - Porcentaje del total

### Información del Candidato

- `candidateId` - ID único del candidato
- `name` - Nombre completo
- `email` - Email de contacto
- `yearsExperience` - Años de experiencia
- `educationArea` - Área de estudio
- `workArea` - Área de trabajo
- `skills` - Lista de habilidades técnicas
- `certifications` - Lista de certificaciones
- `englishLevel` - Nivel de inglés
- `distanceToCenter` - Distancia al centro del cluster (confianza)

---

## 🎯 TIPS Y MEJORES PRÁCTICAS

### ✅ DO's

- ✅ Usar `limit` para controlar tamaño de respuesta
- ✅ Usar `includeDetails: true` solo cuando sea necesario
- ✅ Combinar múltiples clusters en una sola query (alias)
- ✅ Cachear resultados cuando sea posible

### ❌ DON'Ts

- ❌ No solicitar más de 10000 candidatos de una vez
- ❌ No incluir detalles si solo necesitas IDs y nombres
- ❌ No hacer requests sin `limit` (puede sobrecargar)

---

## 🔗 QUERIES RELACIONADAS

```graphql
# Ver perfil del cluster
query {
  getClusterProfileDetails(input: { clusterId: 3, algorithm: "kmeans" }) {
    size
    percentage
    topCharacteristics
    description
  }
}

# Ver análisis completo de clustering
query {
  analyzeCandidateClusters(input: { algorithm: "kmeans" }) {
    clustersFound
    clusterProfiles {
      clusterId
      size
      percentage
    }
  }
}

# Encontrar candidatos similares a uno específico
query {
  findSimilarCandidates(input: { candidateId: "507f1f77bcf86cd799439011", algorithm: "kmeans", maxSimilar: 10 }) {
    similarCandidates {
      candidateId
      similarity_score
    }
  }
}
```

---

**¡Ejemplos listos para usar! 🚀**
