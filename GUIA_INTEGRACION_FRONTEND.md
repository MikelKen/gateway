# 🎯 GUÍA DE INTEGRACIÓN: getCandidatesInCluster en Frontend

## 📌 Resumen

Guía paso a paso para integrar el query `getCandidatesInCluster` en tu frontend React con Apollo Client.

---

## 🚀 Instalación de Dependencias

```bash
# Si aún no tienes Apollo Client instalado
npm install @apollo/client graphql
```

---

## 📁 Estructura de Carpetas Recomendada

```
src/
├── graphql/
│   ├── queries/
│   │   ├── candidatesClusteringQueries.js     ← Aquí irán los queries
│   │   └── index.js
│   ├── types/
│   │   └── clustering.types.ts
│   └── index.js
├── hooks/
│   ├── useCandidatesInCluster.js              ← Hook personalizado
│   └── index.js
├── components/
│   ├── ClusteringDashboard.jsx                ← Componentes
│   ├── CandidatesList.jsx
│   └── ClusterSelector.jsx
└── pages/
    └── ClusteringPage.jsx
```

---

## 1️⃣ Crear las Queries GraphQL

**Archivo: `src/graphql/queries/candidatesClusteringQueries.js`**

```javascript
import { gql } from "@apollo/client";

// 🔷 Query básico: Obtener candidatos con datos mínimos
export const GET_CANDIDATES_IN_CLUSTER_BASIC = gql`
  query GetCandidatesInClusterBasic($clusterId: Int!, $limit: Int) {
    getCandidatesInCluster(input: {
      clusterId: $clusterId
      algorithm: "kmeans"
      limit: $limit
    }) {
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
`;

// 🔷 Query con detalles completos
export const GET_CANDIDATES_IN_CLUSTER_FULL = gql`
  query GetCandidatesInClusterFull($clusterId: Int!, $limit: Int, $includeDetails: Boolean) {
    getCandidatesInCluster(input: {
      clusterId: $clusterId
      algorithm: "kmeans"
      limit: $limit
      includeDetails: $includeDetails
    }) {
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
`;

// 🔷 Query para análisis de skills
export const GET_CANDIDATES_SKILLS = gql`
  query GetCandidatesSkills($clusterId: Int!, $limit: Int) {
    getCandidatesInCluster(input: {
      clusterId: $clusterId
      algorithm: "kmeans"
      limit: $limit
    }) {
      clusterId
      totalCandidates
      candidates {
        name
        skills
        yearsExperience
      }
    }
  }
`;

// 🔷 Query para exportación
export const GET_CANDIDATES_FOR_EXPORT = gql`
  query GetCandidatesForExport($clusterId: Int!, $limit: Int) {
    getCandidatesInCluster(input: {
      clusterId: $clusterId
      algorithm: "kmeans"
      limit: $limit
      includeDetails: true
    }) {
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
`;
```

---

## 2️⃣ Crear un Hook Personalizado

**Archivo: `src/hooks/useCandidatesInCluster.js`**

```javascript
import { useQuery } from "@apollo/client";
import { GET_CANDIDATES_IN_CLUSTER_FULL } from "../graphql/queries/candidatesClusteringQueries";

/**
 * Hook para obtener candidatos de un cluster
 * @param {number} clusterId - ID del cluster
 * @param {number} limit - Número máximo de candidatos
 * @param {boolean} includeDetails - Incluir datos completos
 * @returns {Object} Datos, loading, error
 */
export const useCandidatesInCluster = (clusterId, limit = 10, includeDetails = false) => {
  const { data, loading, error, refetch } = useQuery(GET_CANDIDATES_IN_CLUSTER_FULL, {
    variables: {
      clusterId,
      limit,
      includeDetails,
    },
    skip: !clusterId, // No ejecutar si no hay clusterId
    pollInterval: 0, // Desactivar polling automático
    fetchPolicy: "cache-first", // Usar caché primero
  });

  return {
    cluster: data?.getCandidatesInCluster,
    candidates: data?.getCandidatesInCluster?.candidates || [],
    totalCandidates: data?.getCandidatesInCluster?.totalCandidates || 0,
    clusterPercentage: data?.getCandidatesInCluster?.clusterPercentage || 0,
    loading,
    error,
    refetch,
  };
};
```

---

## 3️⃣ Crear Componentes React

### Componente: Lista de Candidatos

**Archivo: `src/components/CandidatesList.jsx`**

```jsx
import React, { useState } from "react";
import { useCandidatesInCluster } from "../hooks/useCandidatesInCluster";

export const CandidatesList = ({ clusterId, limit = 20, showDetails = false }) => {
  const { candidates, totalCandidates, clusterPercentage, loading, error } = 
    useCandidatesInCluster(clusterId, limit, showDetails);

  if (loading) return <div className="loading">⏳ Cargando candidatos...</div>;
  if (error) return <div className="error">❌ Error: {error.message}</div>;

  return (
    <div className="candidates-container">
      <div className="cluster-info">
        <h2>Cluster {clusterId}</h2>
        <p>
          Total: {totalCandidates} candidatos ({clusterPercentage?.toFixed(1)}%)
        </p>
      </div>

      <div className="candidates-list">
        {candidates.length === 0 ? (
          <p>No hay candidatos en este cluster</p>
        ) : (
          <table className="candidates-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Experiencia</th>
                {showDetails && (
                  <>
                    <th>Área de Trabajo</th>
                    <th>Educación</th>
                    <th>Skills</th>
                    <th>Certificaciones</th>
                    <th>Inglés</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate) => (
                <tr key={candidate.candidateId}>
                  <td>{candidate.name}</td>
                  <td>{candidate.email}</td>
                  <td>{candidate.yearsExperience} años</td>
                  {showDetails && (
                    <>
                      <td>{candidate.workArea}</td>
                      <td>{candidate.educationArea}</td>
                      <td>
                        {candidate.skills?.slice(0, 3).join(", ")}
                        {candidate.skills?.length > 3 && "..."}
                      </td>
                      <td>{candidate.certifications?.length || 0}</td>
                      <td>{candidate.englishLevel}</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
```

### Componente: Selector de Clusters

**Archivo: `src/components/ClusterSelector.jsx`**

```jsx
import React, { useState } from "react";
import { CandidatesList } from "./CandidatesList";

export const ClusterSelector = () => {
  const [selectedCluster, setSelectedCluster] = useState(3);
  const [limit, setLimit] = useState(20);
  const [showDetails, setShowDetails] = useState(false);

  // Distribución de clusters
  const clusters = [
    { id: 0, name: "Cluster 0 (3.9%)", percentage: 3.9, size: 382 },
    { id: 1, name: "Cluster 1 (5.0%)", percentage: 5.0, size: 492 },
    { id: 2, name: "Cluster 2 (3.6%)", percentage: 3.6, size: 357 },
    { id: 3, name: "Cluster 3 - PRINCIPAL (47.2%)", percentage: 47.2, size: 4678 },
    { id: 4, name: "Cluster 4 (4.7%)", percentage: 4.7, size: 461 },
  ];

  return (
    <div className="cluster-selector-container">
      <div className="controls">
        <div className="control-group">
          <label htmlFor="cluster">Selecciona un Cluster:</label>
          <select
            id="cluster"
            value={selectedCluster}
            onChange={(e) => setSelectedCluster(Number(e.target.value))}
            className="cluster-select"
          >
            {clusters.map((cluster) => (
              <option key={cluster.id} value={cluster.id}>
                {cluster.name}
              </option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label htmlFor="limit">Límite de Candidatos:</label>
          <input
            id="limit"
            type="number"
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            min="1"
            max="1000"
            className="limit-input"
          />
        </div>

        <div className="control-group">
          <label>
            <input
              type="checkbox"
              checked={showDetails}
              onChange={(e) => setShowDetails(e.target.checked)}
            />
            Mostrar Detalles Completos
          </label>
        </div>
      </div>

      <CandidatesList
        clusterId={selectedCluster}
        limit={limit}
        showDetails={showDetails}
      />
    </div>
  );
};
```

### Dashboard Principal

**Archivo: `src/pages/ClusteringPage.jsx`**

```jsx
import React from "react";
import { ClusterSelector } from "../components/ClusterSelector";
import "../styles/clustering.css";

export const ClusteringPage = () => {
  return (
    <div className="clustering-page">
      <header className="page-header">
        <h1>🧬 Análisis de Clusters de Candidatos</h1>
        <p>Explora y analiza candidatos agrupados por perfiles similares</p>
      </header>

      <main className="page-content">
        <section className="info-section">
          <h2>📊 Información del Sistema</h2>
          <div className="info-grid">
            <div className="info-card">
              <h3>Total de Candidatos</h3>
              <p>9,907</p>
            </div>
            <div className="info-card">
              <h3>Clusters Identificados</h3>
              <p>13</p>
            </div>
            <div className="info-card">
              <h3>Algoritmo</h3>
              <p>K-Means</p>
            </div>
            <div className="info-card">
              <h3>Silhouette Score</h3>
              <p>0.374</p>
            </div>
          </div>
        </section>

        <section className="selector-section">
          <ClusterSelector />
        </section>
      </main>
    </div>
  );
};
```

---

## 4️⃣ Estilos CSS

**Archivo: `src/styles/clustering.css`**

```css
.clustering-page {
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

.page-header {
  text-align: center;
  color: white;
  margin-bottom: 2rem;
}

.page-header h1 {
  font-size: 2.5rem;
  margin: 0;
}

.page-header p {
  font-size: 1.1rem;
  opacity: 0.9;
  margin-top: 0.5rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 1rem 0;
}

.info-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.info-card h3 {
  margin: 0;
  color: #667eea;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.info-card p {
  font-size: 2rem;
  font-weight: bold;
  color: #764ba2;
  margin: 0.5rem 0 0 0;
}

.controls {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.control-group label {
  font-weight: 500;
  color: #333;
}

.cluster-select,
.limit-input {
  padding: 0.75rem;
  border: 2px solid #667eea;
  border-radius: 4px;
  font-size: 1rem;
}

.cluster-select:focus,
.limit-input:focus {
  outline: none;
  border-color: #764ba2;
  box-shadow: 0 0 0 3px rgba(118, 75, 162, 0.1);
}

.candidates-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  margin-top: 1rem;
}

.candidates-table thead {
  background: #667eea;
  color: white;
}

.candidates-table th,
.candidates-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.candidates-table tr:hover {
  background: #f5f5f5;
}

.loading,
.error {
  padding: 2rem;
  text-align: center;
  background: white;
  border-radius: 8px;
  margin: 1rem 0;
}

.loading {
  color: #667eea;
  font-size: 1.1rem;
}

.error {
  color: #e74c3c;
  background: #ffe6e6;
}
```

---

## 5️⃣ Integración en tu App Principal

**Archivo: `src/App.jsx`**

```jsx
import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from "@apollo/client";
import { ClusteringPage } from "./pages/ClusteringPage";

// Configurar Apollo Client
const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:4000/graphql", // URL del gateway
    credentials: "include",
  }),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getCandidatesInCluster: {
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
});

export function App() {
  return (
    <ApolloProvider client={client}>
      <div className="app">
        <ClusteringPage />
      </div>
    </ApolloProvider>
  );
}

export default App;
```

---

## 6️⃣ Configurar Variables de Entorno

**Archivo: `.env`**

```env
REACT_APP_GATEWAY_URL=http://localhost:4000/graphql
REACT_APP_CLUSTER_LIMIT=20
REACT_APP_DEFAULT_ALGORITHM=kmeans
```

---

## 7️⃣ Usar en Componentes

```jsx
import { useCandidatesInCluster } from "../hooks/useCandidatesInCluster";

function MiComponente() {
  const { candidates, loading, error } = useCandidatesInCluster(3, 50, true);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {candidates.map((candidate) => (
        <div key={candidate.candidateId}>
          <h3>{candidate.name}</h3>
          <p>{candidate.email}</p>
          <p>Experiencia: {candidate.yearsExperience} años</p>
        </div>
      ))}
    </div>
  );
}
```

---

## 📊 Casos de Uso Comunes

### 1. Obtener candidatos para exportar

```javascript
const { candidates } = useCandidatesInCluster(3, 500, true);

const exportToCSV = () => {
  const csv = candidates.map(c => 
    `${c.name},${c.email},${c.yearsExperience}`
  ).join('\n');
  
  downloadCSV(csv, 'candidatos.csv');
};
```

### 2. Filtrar por skills

```javascript
const filteredCandidates = candidates.filter(c => 
  c.skills?.includes('Python')
);
```

### 3. Página de detalles de candidato

```jsx
function CandidateDetail({ candidateId }) {
  const { candidates } = useCandidatesInCluster(3, 1, true);
  const candidate = candidates[0];
  
  return (
    <div>
      <h1>{candidate.name}</h1>
      <h2>Skills</h2>
      <ul>
        {candidate.skills?.map(skill => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

## 🧪 Pruebas Unitarias

**Archivo: `src/hooks/__tests__/useCandidatesInCluster.test.js`**

```javascript
import { renderHook, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { useCandidatesInCluster } from '../useCandidatesInCluster';
import { GET_CANDIDATES_IN_CLUSTER_FULL } from '../../graphql/queries/candidatesClusteringQueries';

const mockData = {
  getCandidatesInCluster: {
    clusterId: 3,
    totalCandidates: 4678,
    clusterPercentage: 47.2,
    candidates: [
      {
        candidateId: '1',
        name: 'Juan',
        email: 'juan@example.com',
        yearsExperience: 8,
        __typename: 'CandidateInCluster'
      }
    ],
    __typename: 'CandidatesInCluster'
  }
};

const mockRequest = {
  query: GET_CANDIDATES_IN_CLUSTER_FULL,
  variables: { clusterId: 3, limit: 10, includeDetails: false },
  result: { data: mockData }
};

test('debería cargar candidatos del cluster', async () => {
  const wrapper = ({ children }) => (
    <MockedProvider mocks={[mockRequest]} addTypename={true}>
      {children}
    </MockedProvider>
  );

  const { result } = renderHook(() => useCandidatesInCluster(3, 10), { wrapper });

  expect(result.current.loading).toBe(true);

  await waitFor(() => expect(result.current.loading).toBe(false));

  expect(result.current.candidates).toHaveLength(1);
  expect(result.current.candidates[0].name).toBe('Juan');
});
```

---

## 📝 Checklist de Integración

- ✅ Crear queries GraphQL en `graphql/queries/`
- ✅ Crear hook personalizado en `hooks/`
- ✅ Crear componentes React
- ✅ Configurar Apollo Client
- ✅ Agregar estilos CSS
- ✅ Probar en componentes
- ✅ Agregar manejo de errores
- ✅ Implementar caché
- ✅ Escribir tests
- ✅ Documentar uso

---

## 🚀 Próximos Pasos

1. **Copiar archivos** a tu proyecto
2. **Ajustar URLs** del gateway según tu entorno
3. **Personalizar estilos** según tu diseño
4. **Agregar más queries** según necesites
5. **Implementar paginación** si es necesario

---

**¡Listo para usar en tu frontend! 🎉**
