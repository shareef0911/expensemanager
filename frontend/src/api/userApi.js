import client from './client';

const BASE = '/api/users';

export const userApi = {
  list: () => client.get(`${BASE}/getUsers`),
  get: (id) => client.get(`${BASE}/getUser/${id}`),
  create: (payload) => client.post(`${BASE}/createUser`, payload),
  remove: (id) => client.delete(`${BASE}/deleteUser/${id}`),
};
