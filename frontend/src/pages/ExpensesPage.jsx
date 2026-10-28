import { useState } from 'react';
import { expenseApi } from '../api/expenseApi';
import ExpenseForm from '../components/expense/ExpenseForm';
import ExpenseTable from '../components/expense/ExpenseTable';
import Modal from '../components/ui/Modal';
import PageHeader from '../components/ui/PageHeader';
import { Async, Banner } from '../components/ui/States';
import { useAction } from '../hooks/useAction';
import { useWorkspace } from '../hooks/useWorkspace';
import { CATEGORIES } from '../utils/constants';
import { filterExpenses, sortByDate, sum } from '../utils/expenses';
import { formatMoney } from '../utils/format';

export default function ExpensesPage() {
  const state = useWorkspace();
  const [filters, setFilters] = useState({ eventId: '', category: '', q: '' });
  const [modal, setModal] = useState(null);
  const remove = useAction(expenseApi.remove);
  const setFilter = (key) => (e) => setFilters((f) => ({ ...f, [key]: e.target.value }));

  return (
    <Async state={state}>
      {({ events, expenses }) => {
        const visible = sortByDate(filterExpenses(expenses, filters));
        const categories = [...new Set([...CATEGORIES, ...expenses.map((e) => e.category)])];
        const close = () => setModal(null);

        const save = async (payload) => {
          if (modal.expense) await expenseApi.update(modal.expense.id, payload);
          else await expenseApi.create(payload);
          close();
          state.reload();
        };

        const onDelete = async (expense) => {
          if (!window.confirm(`Delete "${expense.description}"?`)) return;
          const res = await remove.run(expense.id);
          if (res.ok) state.reload();
        };

        return (
          <>
            <PageHeader title="Expenses" subtitle={`${visible.length} shown, ${formatMoney(sum(visible))} in total`}>
              <button className="btn btn--primary" disabled={!events.length} onClick={() => setModal({})}>Add expense</button>
            </PageHeader>
            <div className="toolbar">
              <input placeholder="Search description" value={filters.q} onChange={setFilter('q')} aria-label="Search" />
              <select value={filters.eventId} onChange={setFilter('eventId')} aria-label="Filter by event">
                <option value="">All events</option>
                {events.map((e) => <option key={e.id} value={e.id}>{e.eventName}</option>)}
              </select>
              <select value={filters.category} onChange={setFilter('category')} aria-label="Filter by category">
                <option value="">All categories</option>
                {categories.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <section className="card">
              <Banner message={remove.error} />
              <ExpenseTable expenses={visible} showEvent onEdit={(expense) => setModal({ expense })} onDelete={onDelete} />
            </section>
            {modal && (
              <Modal title={modal.expense ? 'Edit expense' : 'Add expense'} onClose={close}>
                <ExpenseForm events={events} initial={modal.expense} onSubmit={save} onCancel={close} />
              </Modal>
            )}
          </>
        );
      }}
    </Async>
  );
}
