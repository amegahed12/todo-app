import axios from "axios";

const API = "http://localhost:3000";

export const authApi = {
  // Login user
  login: async (username, password) => {
    const response = await axios.get(`${API}/users?username=${username}`);
    const users = response.data;

    if (users.length === 0) {
      throw new Error("User not found");
    }

    const user = users[0];
    if (user.password !== password) {
      throw new Error("Invalid password");
    }

    // Store user data in localStorage
    localStorage.setItem(
      "user",
      JSON.stringify({
        id: user.id,
        username: user.username,
        email: user.email,
      })
    );
    localStorage.setItem("token", `demo-token-${user.id}`);

    return user;
  },

  // Register new user
  register: async (username, email, password) => {
    // Check if username already exists
    const existingUser = await axios.get(`${API}/users?username=${username}`);
    if (existingUser.data.length > 0) {
      throw new Error("Username already exists");
    }

    const newUser = {
      username,
      email,
      password,
      createdAt: new Date().toISOString(),
    };

    const response = await axios.post(`${API}/users`, newUser);
    return response.data;
  },

  // Logout user
  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return localStorage.getItem("token") !== null;
  },
};
