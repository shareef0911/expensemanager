import { eventApi } from '../api/eventApi';
import { userApi } from '../api/userApi';
import { flattenExpenses } from '../utils/expenses';
import { useAsync } from './useAsync';

// Expenses don't carry their event in the API response, so we derive them from events.
async function loadWorkspace() {
  const [events, users] = await Promise.all([eventApi.list(), userApi.list()]);
  return { events, users, expenses: flattenExpenses(events) };
}

export const useWorkspace = () => useAsync(loadWorkspace);
