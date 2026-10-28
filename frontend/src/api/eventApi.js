import client from './client';

const BASE = '/api/events';

export const eventApi = {
  list: () => client.get(BASE),
  get: (id) => client.get(`${BASE}/${id}`),
  create: (payload) => client.post(BASE, payload),
  addMember: (eventId, userId) => client.post(`${BASE}/${eventId}/members/${userId}`),
  removeMember: (eventId, userId) => client.delete(`${BASE}/${eventId}/members/${userId}`),
};
