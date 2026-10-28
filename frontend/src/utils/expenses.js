export const sum = (list) => list.reduce((t, e) => t + e.amount, 0);

export const flattenExpenses = (events) =>
  events.flatMap((ev) => ev.expenses.map((e) => ({ ...e, eventId: ev.id, eventName: ev.eventName })));

export const sortByDate = (list) => [...list].sort((a, b) => b.expenseDate.localeCompare(a.expenseDate) || b.id - a.id);

export function totalsByCategory(expenses) {
  const totals = {};
  expenses.forEach((e) => { totals[e.category] = (totals[e.category] || 0) + e.amount; });
  return Object.entries(totals).map(([category, total]) => ({ category, total })).sort((a, b) => b.total - a.total);
}

export function filterExpenses(expenses, { eventId, category, q }) {
  const needle = q.trim().toLowerCase();
  return expenses.filter((e) =>
    (!eventId || String(e.eventId) === eventId) &&
    (!category || e.category === category) &&
    (!needle || e.description.toLowerCase().includes(needle)));
}

/** Equal split: balance > 0 means the member should get money back. */
export function memberBalances(event) {
  const share = event.members.length ? sum(event.expenses) / event.members.length : 0;
  return event.members.map((user) => {
    const paid = sum(event.expenses.filter((e) => e.paidBy?.id === user.id));
    return { user, paid, balance: paid - share };
  });
}
