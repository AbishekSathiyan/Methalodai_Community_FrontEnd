const axios = require('axios');

async function registerUser() {
  try {
    const timestamp = Date.now(); // unique
    const response = await axios.post('http://localhost:5000/api/auth/register', {
      name: 'John Doe',
      email: `user${timestamp}@example.com`,
      password: 'mypassword123',
      customId: `UID${timestamp}`,
      dob: '1990-01-01',
      firebaseUid: `firebase${timestamp}` // required by schema
    });

    console.log('✅ User registered successfully:');
    console.log(response.data);
  } catch (error) {
    if (error.response) {
      console.log('⚠️ Error from backend:');
      console.log(error.response.data);
    } else {
      console.log('❌ Network or other error:');
      console.log(error.message);
    }
  }
}

registerUser();
