const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Helper to centralize standard headers (like inserting JWT tokens automatically)
export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, headers });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Network transaction pipeline failed.');
  }
  
  return data;
};
