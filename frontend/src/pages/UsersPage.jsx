import { useState } from 'react';
import { userApi } from '../api/userApi';
import UserForm from '../components/event/UserForm';
import Modal from '../components/ui/Modal';
import PageHeader from '../components/ui/PageHeader';
import { Async, Banner, EmptyState } from '../components/ui/States';
import { useAction } from '../hooks/useAction';
import { useWorkspace } from '../hooks/useWorkspace';
import { initials } from '../utils/format';

export default function UsersPage() {
  const state = useWorkspace();
  const [adding, setAdding] = useState(false);
  const remove = useAction(userApi.remove);

  const create = async (payload) => {
    await userApi.create(payload);
    setAdding(false);
    state.reload();
  };

  const onDelete = async (user) => {
    if (!window.confirm(`Delete ${user.name}?`)) return;
    const res = await remove.run(user.id);
    if (res.ok) state.reload();
  };

  return (
    <>
      <PageHeader title="People" subtitle="Everyone who can join events and pay for expenses">
        <button className="btn btn--primary" onClick={() => setAdding(true)}>Add person</button>
      </PageHeader>
      <Async state={state}>
        {({ users, events }) => (
          <section className="card">
            <Banner message={remove.error && `${remove.error} A person who paid for expenses or belongs to an event may need to be removed from them first.`} />
            {users.length ? (
              <div className="table-wrap">
                <table className="table">
                  <thead><tr><th>Name</th><th>Email</th><th className="right">Events</th><th /></tr></thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u.id}>
                        <td><span className="avatar" aria-hidden="true">{initials(u.name)}</span> {u.name}</td>
                        <td>{u.email}</td>
                        <td className="right num">{events.filter((ev) => ev.members.some((m) => m.id === u.id)).length}</td>
                        <td className="right"><button className="btn btn--ghost btn--danger" onClick={() => onDelete(u)}>Delete</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <EmptyState title="No people yet" hint="Add the people you share expenses with." />
            )}
          </section>
        )}
      </Async>
      {adding && (
        <Modal title="Add person" onClose={() => setAdding(false)}>
          <UserForm onSubmit={create} onCancel={() => setAdding(false)} />
        </Modal>
      )}
    </>
  );
}
