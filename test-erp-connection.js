import axios from "axios";

// Test de conexión al ERP con la URL corregida
async function testERPConnection() {
  console.log("🧪 Testing ERP Connection...");
  console.log("=" * 50);

  const erpUrl = "http://localhost:8080";
  const graphqlEndpoint = "/api/graphql";
  const fullUrl = erpUrl + graphqlEndpoint;

  console.log(`📍 Testing URL: ${fullUrl}`);

  // Test 1: Health Check
  try {
    console.log("\n1️⃣ Testing Health Check...");
    const healthResponse = await axios.get(`${erpUrl}/api/actuator/health`, { timeout: 5000 });
    console.log("✅ Health Check: SUCCESS");
    console.log(`   Status: ${healthResponse.status}`);
    console.log(`   Data: ${JSON.stringify(healthResponse.data, null, 2)}`);
  } catch (error) {
    console.log("❌ Health Check: FAILED");
    console.log(`   Error: ${error.message}`);
  }

  // Test 2: GraphQL Endpoint
  try {
    console.log("\n2️⃣ Testing GraphQL Endpoint...");

    const query = `
      query {
        obtenerEmpresas {
          id
          nombre
          correo
          rubro
        }
      }
    `;

    const response = await axios.post(
      fullUrl,
      {
        query: query,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        timeout: 10000,
      }
    );

    console.log("✅ GraphQL Query: SUCCESS");
    console.log(`   Status: ${response.status}`);
    console.log(`   Response: ${JSON.stringify(response.data, null, 2)}`);
  } catch (error) {
    console.log("❌ GraphQL Query: FAILED");
    console.log(`   Status: ${error.response?.status || "N/A"}`);
    console.log(`   Error: ${error.message}`);

    if (error.response?.data) {
      console.log(`   Response Data: ${JSON.stringify(error.response.data, null, 2)}`);
    }
  }

  console.log("\n🏁 Test completed!");
}

// Ejecutar test
testERPConnection().catch(console.error);
