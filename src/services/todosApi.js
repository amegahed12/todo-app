import axios from "axios";

const API = "http://localhost:3000";

export const todosApi = {
  // Get all todos for a user
  getTodos: async (userId) => {
    const response = await axios.get(`${API}/todos?userId=${userId}`);
    return response.data;
  },

  // Get a single todo by ID
  getTodo: async (id) => {
    const response = await axios.get(`${API}/todos/${id}`);
    return response.data;
  },

  // Create a new todo
  createTodo: async (todoData) => {
    const newTodo = {
      ...todoData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const response = await axios.post(`${API}/todos`, newTodo);
    return response.data;
  },

  // Update a todo
  updateTodo: async (id, todoData) => {
    const updatedTodo = {
      ...todoData,
      updatedAt: new Date().toISOString(),
    };
    const response = await axios.patch(`${API}/todos/${id}`, updatedTodo);
    return response.data;
  },

  // Delete a todo
  deleteTodo: async (id) => {
    await axios.delete(`${API}/todos/${id}`);
  },

  // Toggle todo status
  toggleTodoStatus: async (id, currentStatus) => {
    const newStatus = currentStatus === "completed" ? "pending" : "completed";
    const response = await axios.patch(`${API}/todos/${id}`, {
      status: newStatus,
      updatedAt: new Date().toISOString(),
    });
    return response.data;
  },

  // Get todos by status
  getTodosByStatus: async (userId, status) => {
    const response = await axios.get(
      `${API}/todos?userId=${userId}&status=${status}`
    );
    return response.data;
  },
};
