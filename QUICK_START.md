# 🚀 QUICK START: getCandidatesInCluster

## ⚡ Inicio Rápido en 5 Minutos

---

## 1️⃣ Backend: Gateway (Ya Listo)

### Iniciar el gateway
```bash
cd gateway
npm start
# ✅ Gateway en http://localhost:4000/graphql
```

### Query Básico
```graphql
query {
  getCandidatesInCluster(input: {
    clusterId: 3
    algorithm: "kmeans"
    limit: 10
  }) {
    clusterId
    totalCandidates
    candidates {
      candidateId
      name
      email
    }
  }
}
```

---

## 2️⃣ Frontend: React Setup (10 minutos)

### Instalación
```bash
cd front-sw2-erp-parcial2
npm install @apollo/client graphql
```

### Crear Query
```javascript
// src/graphql/queries/clusterQueries.js
import { gql } from "@apollo/client";

export const GET_CANDIDATES = gql`
  query GetCandidates($clusterId: Int!, $limit: Int) {
    getCandidatesInCluster(input: {
      clusterId: $clusterId
      algorithm: "kmeans"
      limit: $limit
    }) {
      clusterId
      totalCandidates
      candidates {
        candidateId
        name
        email
        yearsExperience
      }
    }
  }
`;
```

### Crear Hook
```javascript
// src/hooks/useCandidates.js
import { useQuery } from "@apollo/client";
import { GET_CANDIDATES } from "../graphql/queries/clusterQueries";

export const useCandidates = (clusterId, limit = 10) => {
  const { data, loading, error } = useQuery(GET_CANDIDATES, {
    variables: { clusterId, limit }
  });
  
  return {
    candidates: data?.getCandidatesInCluster?.candidates || [],
    loading,
    error
  };
};
```

### Usar en Componente
```jsx
// src/components/CandidatesList.jsx
import { useCandidates } from "../hooks/useCandidates";

export function CandidatesList() {
  const { candidates, loading } = useCandidates(3, 20);
  
  if (loading) return <p>Cargando...</p>;
  
  return (
    <ul>
      {candidates.map(c => (
        <li key={c.candidateId}>
          {c.name} - {c.email}
        </li>
      ))}
    </ul>
  );
}
```

### Configurar Apollo en App.jsx
```jsx
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from "@apollo/client";
import { CandidatesList } from "./components/CandidatesList";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:4000/graphql"
  }),
  cache: new InMemoryCache()
});

export function App() {
  return (
    <ApolloProvider client={client}>
      <CandidatesList />
    </ApolloProvider>
  );
}
```

---

## 📊 5 Ejemplos Rápidos

### Ejemplo 1: Básico (10 candidatos)
```graphql
query {
  getCandidatesInCluster(input: {
    clusterId: 3
    limit: 10
  }) {
    candidates { name email yearsExperience }
  }
}
```

### Ejemplo 2: Con Detalles Completos
```graphql
query {
  getCandidatesInCluster(input: {
    clusterId: 3
    limit: 20
    includeDetails: true
  }) {
    candidates {
      name
      email
      skills
      certifications
      englishLevel
    }
  }
}
```

### Ejemplo 3: Cluster Pequeño
```graphql
query {
  getCandidatesInCluster(input: {
    clusterId: 0
    limit: 50
  }) {
    totalCandidates
    candidates { name skills }
  }
}
```

### Ejemplo 4: Análisis de Skills
```graphql
query {
  getCandidatesInCluster(input: {
    clusterId: 3
    limit: 100
  }) {
    candidates { name skills yearsExperience }
  }
}
```

### Ejemplo 5: Exportación Masiva
```graphql
query {
  getCandidatesInCluster(input: {
    clusterId: 3
    limit: 500
    includeDetails: true
  }) {
    candidates {
      candidateId
      name
      email
      yearsExperience
      skills
      certifications
    }
  }
}
```

---

## 🎯 Casos de Uso en 2 Líneas

### Reclutamiento
```javascript
const { candidates } = useCandidates(3, 200);
// Exportar a sistema de reclutamiento
```

### Análisis
```javascript
const { candidates } = useCandidates(1, 100);
// Analizar skills por cluster
```

### Búsqueda
```javascript
const { candidates } = useCandidates(0, 50);
// Encontrar especialistas
```

---

## 🧪 Probar Ahora

### En GraphQL Playground
1. Abre http://localhost:4000/graphql
2. Copia un ejemplo de arriba
3. Dale "Play"

### En Terminal
```bash
cd gateway
node test-get-candidates-in-cluster.js
```

---

## 📊 Parámetros

| Parámetro | Tipo | Obligatorio | Ejemplo |
|-----------|------|-----------|---------|
| clusterId | Int | ✅ | 3 |
| algorithm | String | ❌ | "kmeans" |
| limit | Int | ❌ | 20 |
| includeDetails | Boolean | ❌ | true |

---

## 📁 Archivos Importantes

```
gateway/
├── src/schema/typeDefs.js              ← Query definido
├── src/schema/resolvers/mlResolvers.js ← Resolver
├── EJEMPLOS_GET_CANDIDATES_IN_CLUSTER.md
├── GUIA_INTEGRACION_FRONTEND.md
└── test-get-candidates-in-cluster.js   ← Pruebas
```

---

## ✅ Checklist

- [ ] Backend iniciado en puerto 4000
- [ ] Accedí a http://localhost:4000/graphql
- [ ] Copié un ejemplo y lo probé
- [ ] Instalé @apollo/client en frontend
- [ ] Creé los archivos del hook
- [ ] Agregué ApolloProvider en App.jsx
- [ ] Probé en navegador

---

## 🚀 Flujo Completo

```
Usuario → Frontend (React)
           ↓
       Apollo Client
           ↓
       Gateway (Apollo Server)
           ↓
    mlResolvers.getCandidatesInCluster
           ↓
       Service ML (FastAPI)
           ↓
    clustering_resolvers.get_candidates_in_cluster
           ↓
       MongoDB + PostgreSQL
           ↓
       [Candidatos del Cluster]
```

---

## 💡 Tips Rápidos

✅ **DO:**
- Usar `limit` para controlar tamaño
- Cachear en Apollo
- Usar aliases para múltiples clusters

❌ **DON'T:**
- Solicitar +10000 sin paginar
- Incluir detalles si no los necesitas
- Queries sin `limit`

---

## 📞 Soporte Rápido

**¿No funciona?**
1. Verifica que gateway esté en 4000: `npm start`
2. Checa que ML service esté corriendo
3. Mira logs del gateway: `console.log`

**¿Lento?**
1. Reduce `limit`
2. Quita `includeDetails`
3. Implementa paginación

**¿Errores GraphQL?**
1. Verifica sintaxis del query
2. Checa parámetros necesarios
3. Mira typos en nombres

---

## 🎉 ¡Listo!

Con esto tienes:
- ✅ Query funcionando en backend
- ✅ Frontend conectado
- ✅ 5 ejemplos listos
- ✅ Componentes reutilizables

**Próximo:** Lee `GUIA_INTEGRACION_FRONTEND.md` para más opciones

---

**Documentación Completa:**
- EJEMPLOS_GET_CANDIDATES_IN_CLUSTER.md (11 ejemplos)
- GUIA_INTEGRACION_FRONTEND.md (guía paso a paso)
- README_GET_CANDIDATES_IN_CLUSTER.md (resumen técnico)
