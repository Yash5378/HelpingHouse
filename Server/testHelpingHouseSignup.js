// Test script to verify helping house signup works without certificate
import fetch from "node-fetch";

const testHelpingHouseSignup = async () => {
  console.log("🧪 Testing Helping House Signup (without certificate)");
  console.log("====================================================\n");

  const testData = {
    name: "Test Community Center",
    email: `test${Date.now()}@example.com`, // Unique email
    phone: "1234567890",
    address: "123 Test Street, Test City",
    password: "testpassword123",
    website: "https://testcommunity.org",
    ngoType: "Community Center",
  };

  console.log("📋 Test Data:");
  console.log(JSON.stringify(testData, null, 2));
  console.log("\n📡 API Endpoint: POST /api/helping_house/signup");

  try {
    const response = await fetch(
      "http://localhost:3000/api/helping_house/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testData),
      }
    );

    const data = await response.json();

    console.log(`\n📊 Response Status: ${response.status}`);

    if (response.ok) {
      console.log("✅ Signup Successful!");
      console.log("📋 Response Data:");
      console.log(JSON.stringify(data, null, 2));
    } else {
      console.log("❌ Signup Failed!");
      console.log("📋 Error Response:");
      console.log(JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.log("❌ Network Error:");
    console.log(error.message);
  }

  console.log("\n🎯 Test completed!");
};

// Run the test
testHelpingHouseSignup();
