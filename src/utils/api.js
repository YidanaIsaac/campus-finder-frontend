const API_BASE_URL = 'http://localhost:5000/api';

// Get token from localStorage
const getToken = () => localStorage.getItem('token');

const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'API error');
  }

  return response.json();
};

// Authentication
export const authAPI = {
  register: (data) => apiCall('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  login: (email, password) => apiCall('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  }),
  getCurrentUser: () => apiCall('/auth/me')
};

// Items
export const itemsAPI = {
  getLostItems: (filters = {}) => {
    const query = new URLSearchParams(filters).toString();
    return apiCall(`/items/lost${query ? '?' + query : ''}`);
  },
  getFoundItems: (filters = {}) => {
    const query = new URLSearchParams(filters).toString();
    return apiCall(`/items/found${query ? '?' + query : ''}`);
  },
  createLostItem: (data) => apiCall('/items/lost', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  createFoundItem: (data) => apiCall('/items/found', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  getItem: (id, type = 'lost') => apiCall(`/items/${type}/${id}`),
  updateItem: (id, data, type = 'lost') => apiCall(`/items/${type}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  deleteItem: (id, type = 'lost') => apiCall(`/items/${type}/${id}`, {
    method: 'DELETE'
  }),
  claimFoundItem: (id) => apiCall(`/items/found/${id}/claim`, {
    method: 'PATCH'
  }),
  getUserItems: () => apiCall('/items/user/items')
};

// Notifications
export const notificationsAPI = {
  getNotifications: () => apiCall('/notifications'),
  markAsRead: (id) => apiCall(`/notifications/${id}/read`, {
    method: 'PATCH'
  }),
  markAllAsRead: () => apiCall('/notifications/read-all', {
    method: 'PATCH'
  }),
  deleteNotification: (id) => apiCall(`/notifications/${id}`, {
    method: 'DELETE'
  })
};
