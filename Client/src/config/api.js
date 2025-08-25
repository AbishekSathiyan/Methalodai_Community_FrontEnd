const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API = {
  auth: {
    register: `${API_BASE_URL}/auth/register`,
    login: `${API_BASE_URL}/auth/login`,
    profile: `${API_BASE_URL}/auth/profile`,    
    updateProfile: `${API_BASE_URL}/auth/update-profile`,
  },
  otp: {
    send: `${API_BASE_URL}/otp`,
    verify: `${API_BASE_URL}/otp/verify`,
  },
  friends: {
    get: (userId) => `${API_BASE_URL}/user/friends/${userId}`,
    add: `${API_BASE_URL}/user/friends/`,
    remove: `${API_BASE_URL}/user/friends/`,
  },
  users: {
    list: `${API_BASE_URL}/users/profile`,
    get: (id) => `${API_BASE_URL}/users/${id}`,
  },
};
