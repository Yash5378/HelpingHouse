// Test script for unified sign-in API
// This demonstrates how the new unified sign-in endpoint works

const testUnifiedSignin = async () => {
  console.log("🧪 Testing Unified Sign-in API");
  console.log("===============================\n");

  // Test cases
  const testCases = [
    {
      name: "Doner Sign-in",
      email: "doner@example.com",
      password: "password123",
      expectedRole: "doner",
    },
    {
      name: "Helping House Sign-in",
      email: "helpinghouse@example.com",
      password: "password123",
      expectedRole: "helping_house",
    },
    {
      name: "Invalid Email",
      email: "nonexistent@example.com",
      password: "password123",
      expectedError: "User not found",
    },
    {
      name: "Invalid Password",
      email: "doner@example.com",
      password: "wrongpassword",
      expectedError: "Invalid credentials",
    },
  ];

  console.log("📋 API Endpoint: POST /signin");
  console.log("📝 Request Body: { email, password }");
  console.log("🎯 Response: { success, token, user, userType, message }\n");

  for (const testCase of testCases) {
    console.log(`🔍 Testing: ${testCase.name}`);
    console.log(`   Email: ${testCase.email}`);

    try {
      const response = await fetch("http://localhost:3000/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: testCase.email,
          password: testCase.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(`   ✅ Success: ${data.userType} authenticated`);
        console.log(`   👤 User: ${data.user.name} (${data.user.email})`);
        console.log(`   🔑 Token: ${data.token.substring(0, 20)}...`);
      } else {
        console.log(`   ❌ Error: ${data.message}`);
      }
    } catch (error) {
      console.log(`   ❌ Network Error: ${error.message}`);
    }

    console.log(""); // Empty line between tests
  }

  console.log("🎉 Test completed!");
  console.log(
    "\n💡 Note: Make sure your server is running and you have test users in the database."
  );
};

// Example frontend usage
console.log("📱 Frontend Usage Example:");
console.log("==========================");
console.log(`
const signinUser = async (email, password) => {
  try {
    const response = await fetch('/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (data.success) {
      // Store token and user info
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('userType', data.userType);

      // Redirect based on user type
      if (data.userType === 'doner') {
        window.location.href = '/doner-dashboard';
      } else {
        window.location.href = '/helping-house-dashboard';
      }
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error('Sign-in failed:', error);
  }
};
`);

// Uncomment the line below to run the actual test
// testUnifiedSignin();

export default testUnifiedSignin;
