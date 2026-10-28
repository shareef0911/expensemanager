import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { eventApi } from '../api/eventApi';
import { expenseApi } from '../api/expenseApi';
import { userApi } from '../api/userApi';
import ExpenseForm from '../components/expense/ExpenseForm';
import ExpenseTable from '../components/expense/ExpenseTable';
import MembersPanel from '../components/event/MembersPanel';
import Modal from '../components/ui/Modal';
import PageHeader from '../components/ui/PageHeader';
import Stat from '../components/ui/Stat';
import { Async, Banner } from '../components/ui/States';
import { useAction } from '../hooks/useAction';
import { useAsync } from '../hooks/useAsync';
import { sortByDate, sum } from '../utils/expenses';
import { formatMoney } from '../utils/format';

export default function EventDetailPage() {
  const { id } = useParams();
  const state = useAsync(() => Promise.all([eventApi.get(id), userApi.list()]), [id]);
  const [modal, setModal] = useState(null); // { expense? } while the expense form is open
  const remove = useAction(expenseApi.remove);

  return (
    <Async state={state}>
      {([event, users]) => {
        const total = sum(event.expenses);
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
            <Link to="/events" className="back">Back to events</Link>
            <PageHeader title={event.eventName} subtitle={event.location}>
              <button className="btn btn--primary" onClick={() => setModal({})}>Add expense</button>
            </PageHeader>
            <div className="grid stats">
              <Stat label="Total spent" value={formatMoney(total)} />
              <Stat label="Members" value={event.members.length} />
              <Stat label="Per person" value={formatMoney(event.members.length ? total / event.members.length : 0)} />
            </div>
            <div className="grid two">
              <MembersPanel event={event} users={users} onChanged={state.reload} />
              <section className="card">
                <h2>Expenses</h2>
                <Banner message={remove.error} />
                <ExpenseTable expenses={sortByDate(event.expenses)} onEdit={(expense) => setModal({ expense })} onDelete={onDelete} />
              </section>
            </div>
            {modal && (
              <Modal title={modal.expense ? 'Edit expense' : 'Add expense'} onClose={close}>
                <ExpenseForm
                  events={[event]}
                  initial={modal.expense && { ...modal.expense, eventId: event.id }}
                  onSubmit={save}
                  onCancel={close}
                />
              </Modal>
            )}
          </>
        );
      }}
    </Async>
  );
}
