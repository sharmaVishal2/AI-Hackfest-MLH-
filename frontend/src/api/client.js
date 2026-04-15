import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const attachAuthInterceptor = (getAccessTokenSilently) => {
  return api.interceptors.request.use(async (config) => {
    const token = await getAccessTokenSilently();
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      },
    };
  });
};

export const detachAuthInterceptor = (interceptorId) => {
  api.interceptors.request.eject(interceptorId);
};

export const generateContent = async (payload) => {
  const { data } = await api.post('/api/ai/generate', payload);
  return data;
};

export const saveHistory = async (payload) => {
  const { data } = await api.post('/api/history/save', payload);
  return data;
};

export const fetchHistory = async (userId) => {
  const { data } = await api.get(`/api/history/${userId}`);
  return data;
};

export default api;
