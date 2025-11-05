const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

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

  try {
    const response = await fetch(url, {
      ...options,
      headers
    });

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error(`Server returned non-JSON response: ${response.statusText}`);
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API Call Error:', error);
    throw error;
  }
};

export const authAPI = {
  register: (data) => apiCall('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  login: (email, password) => apiCall('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  }),
  getCurrentUser: () => apiCall('/auth/me'),
  updateProfile: (data) => apiCall('/auth/update', {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  changePassword: (data) => apiCall('/auth/change-password', {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  getPrivacySettings: () => apiCall('/auth/privacy-settings'),
  updatePrivacySettings: (settings) => apiCall('/auth/privacy-settings', {
    method: 'PUT',
    body: JSON.stringify(settings)
  }),
  deleteAccount: () => apiCall('/auth/account', {
    method: 'DELETE'
  })
};

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
  }),
  getPreferences: () => apiCall('/notifications/preferences'),
  updatePreferences: (preferences) => apiCall('/notifications/preferences', {
    method: 'PUT',
    body: JSON.stringify(preferences)
  })
};

export const supportAPI = {
  sendSupportMessage: (data) => apiCall('/support/contact', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  getFAQs: () => apiCall('/support/faqs'),
  reportBug: (data) => apiCall('/support/bug-report', {
    method: 'POST',
    body: JSON.stringify(data)
  })
};