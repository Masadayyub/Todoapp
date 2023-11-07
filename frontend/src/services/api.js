import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const authAPI = {
  register: async (userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users/register`, userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Registration failed');
    }
  },
  login: async (userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users/login`, userData);
      const token = response.data.token;

      // Store the received token securely in the browser
      localStorage.setItem('token', token);
      console.log(token, "is recieved as token ")
      return token;
    } catch (error) {
      throw new Error(error.response.data.message || 'Login failed');
    }
  },
  isAuthenticated: () => {
    return localStorage.getItem('token') !== null;
  },
};

const todoAPI = {
  getUserTodos: async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.get(`${API_BASE_URL}/todos`, {
        headers: {
          Authorization: `Bearer ${token}` // Include token in the 'Authorization' header
        }
      });
      console.log(response.data)
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Failed to fetch user todos');
    }
  },
  createTodo: async (newTodo) => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.post(`${API_BASE_URL}/todos`, newTodo, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Failed to create todo');
    }
  },
  updateTodo: async (todoId, updatedTodo) => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.put(`${API_BASE_URL}/todos/${todoId}`, updatedTodo, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Failed to update todo');
    }
  },
  deleteTodo: async (todoId) => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.delete(`${API_BASE_URL}/todos/${todoId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Failed to delete todo');
    }
  }
};

export { authAPI, todoAPI };
