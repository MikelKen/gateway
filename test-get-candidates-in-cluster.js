// 🧪 Archivo de prueba para validar la implementación del query getCandidatesInCluster

const testQueries = {
  // ========================
  // PRUEBA 1: Básico - 10 candidatos
  // ========================
  test1_basico: `
    query ObtenerCandidatosClustersBasico {
      getCandidatesInCluster(input: {
        clusterId: 3
        algorithm: "kmeans"
        limit: 10
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
  `,

  // ========================
  // PRUEBA 2: Detalles completos - 20 candidatos
  // ========================
  test2_detalles_completos: `
    query ObtenerDetallesCompletos {
      getCandidatesInCluster(input: {
        clusterId: 3
        algorithm: "kmeans"
        includeDetails: true
        limit: 20
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
  `,

  // ========================
  // PRUEBA 3: Cluster especializado
  // ========================
  test3_cluster_especializado: `
    query ExplorarClusterEspecializado {
      getCandidatesInCluster(input: {
        clusterId: 0
        algorithm: "kmeans"
        limit: 50
      }) {
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
  `,

  // ========================
  // PRUEBA 4: Análisis de Skills
  // ========================
  test4_analisis_skills: `
    query AnalisisSkillsCluster {
      getCandidatesInCluster(input: {
        clusterId: 3
        algorithm: "kmeans"
        limit: 100
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
  `,

  // ========================
  // PRUEBA 5: Exportación masiva
  // ========================
  test5_exportacion: `
    query ExportarCandidatos {
      getCandidatesInCluster(input: {
        clusterId: 3
        algorithm: "kmeans"
        limit: 500
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
  `,

  // ========================
  // PRUEBA 6: Comparación de múltiples clusters
  // ========================
  test6_comparacion_clusters: `
    query ComparacionClusters {
      cluster3: getCandidatesInCluster(input: {
        clusterId: 3
        algorithm: "kmeans"
        limit: 20
      }) {
        clusterId
        totalCandidates
        clusterPercentage
        candidates {
          name
          skills
          educationArea
        }
      }
      
      cluster0: getCandidatesInCluster(input: {
        clusterId: 0
        algorithm: "kmeans"
        limit: 20
      }) {
        clusterId
        totalCandidates
        clusterPercentage
        candidates {
          name
          skills
          educationArea
        }
      }
    }
  `,
};

// Ejemplo de cómo usar en una aplicación Node.js/Express
const testGatewayConnection = async () => {
  const fetch = require("node-fetch");

  const GATEWAY_URL = "http://localhost:4000/graphql"; // Ajusta según tu puerto

  try {
    console.log("🧪 Iniciando pruebas del query getCandidatesInCluster...\n");

    // Prueba 1: Básico
    console.log("📋 PRUEBA 1: Obtener 10 candidatos básicos");
    console.log("━".repeat(60));

    const response1 = await fetch(GATEWAY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: testQueries.test1_basico,
      }),
    });

    const data1 = await response1.json();

    if (data1.data && data1.data.getCandidatesInCluster) {
      console.log("✅ Respuesta exitosa!");
      console.log(JSON.stringify(data1.data.getCandidatesInCluster, null, 2));
    } else {
      console.log("❌ Error en la respuesta:");
      console.log(JSON.stringify(data1, null, 2));
    }

    console.log("\n");

    // Prueba 2: Detalles completos
    console.log("📋 PRUEBA 2: Obtener detalles completos");
    console.log("━".repeat(60));

    const response2 = await fetch(GATEWAY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: testQueries.test2_detalles_completos,
      }),
    });

    const data2 = await response2.json();

    if (data2.data && data2.data.getCandidatesInCluster) {
      console.log("✅ Respuesta exitosa!");
      const cluster = data2.data.getCandidatesInCluster;
      console.log(`Cluster ID: ${cluster.clusterId}`);
      console.log(`Total Candidatos: ${cluster.totalCandidates}`);
      console.log(`Porcentaje: ${cluster.clusterPercentage}%`);
      console.log(
        `Primer candidato: ${cluster.candidates[0]?.name} - ${cluster.candidates[0]?.email}`
      );
    } else {
      console.log("❌ Error en la respuesta:");
      console.log(JSON.stringify(data2, null, 2));
    }

    console.log("\n✅ Pruebas completadas exitosamente!");
  } catch (error) {
    console.error("❌ Error durante las pruebas:", error);
  }
};

// Si se ejecuta directamente
if (require.main === module) {
  testGatewayConnection();
}

module.exports = { testQueries, testGatewayConnection };
