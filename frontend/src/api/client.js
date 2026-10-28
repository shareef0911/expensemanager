import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  timeout: 10000,
});

client.interceptors.response.use(
  (res) => {
    if (typeof res.data === 'string' && res.data.trim() !== '') {
      return Promise.reject(new Error('The server sent an unreadable response. Check the backend console for errors.'));
    }
    return res.data;
  },
  (err) => {
    const res = err.response;
    let message = 'Cannot reach the server. Check that the backend is running on port 9999.';
    if (res) {
      message = res.data?.message || (res.status === 400 ? 'Some fields are invalid. Please check the form.' : `Request failed (${res.status}).`);
    }
    return Promise.reject(new Error(message));
  },
);

export default client;
