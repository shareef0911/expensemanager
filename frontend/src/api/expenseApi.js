import client from './client';

const BASE = '/api/expense';

export const expenseApi = {
  list: () => client.get(BASE),
  get: (id) => client.get(`${BASE}/${id}`),
  byEvent: (eventId) => client.get(`${BASE}/event/${eventId}`),
  create: (payload) => client.post(BASE, payload),
  update: (id, payload) => client.put(`${BASE}/${id}`, payload),
  remove: (id) => client.delete(`${BASE}/${id}`),
};
