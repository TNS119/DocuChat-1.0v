const getApiBaseUrl = () => {
  if (typeof window === 'undefined') {
    return 'http://localhost:8000';
  }

  const hostname = window.location.hostname;
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:8000';
  }

  return `http://${hostname}:8000`;
};

export const API_BASE_URL = getApiBaseUrl();

export const buildApiUrl = (path) => `${API_BASE_URL}${path}`;
