import { useState } from 'react';
import { eventApi } from '../../api/eventApi';
import { useAction } from '../../hooks/useAction';
import { memberBalances } from '../../utils/expenses';
import { formatMoney, initials } from '../../utils/format';
import { Banner } from '../ui/States';

const Balance = ({ value }) => {
  if (Math.abs(value) < 0.005) return <span className="pill">Settled</span>;
  return value > 0
    ? <span className="pill pill--get">Gets back {formatMoney(value)}</span>
    : <span className="pill pill--owe">Owes {formatMoney(-value)}</span>;
};

/** Members of an event with what each paid and the equal-split balance. */
export default function MembersPanel({ event, users, onChanged }) {
  const [pick, setPick] = useState('');
  const mutate = useAction(async (call) => { await call(); onChanged(); });
  const available = users.filter((u) => !event.members.some((m) => m.id === u.id));

  const add = async () => {
    const res = await mutate.run(() => eventApi.addMember(event.id, pick));
    if (res.ok) setPick('');
  };

  return (
    <section className="card">
      <h2>Members and balances</h2>
      <Banner message={mutate.error} />
      {!event.members.length && <p className="muted">No members yet. Add the people sharing this event.</p>}
      <ul className="members">
        {memberBalances(event).map(({ user, paid, balance }) => (
          <li key={user.id}>
            <span className="avatar" aria-hidden="true">{initials(user.name)}</span>
            <div className="grow"><strong>{user.name}</strong><span className="muted">Paid {formatMoney(paid)}</span></div>
            <Balance value={balance} />
            <button className="btn btn--ghost btn--danger" onClick={() => mutate.run(() => eventApi.removeMember(event.id, user.id))}>Remove</button>
          </li>
        ))}
      </ul>
      <div className="inline-add">
        <select value={pick} onChange={(e) => setPick(e.target.value)} aria-label="Person to add">
          <option value="">{available.length ? 'Add a person…' : 'Everyone is already in'}</option>
          {available.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}
        </select>
        <button className="btn" disabled={!pick || mutate.pending} onClick={add}>Add member</button>
      </div>
    </section>
  );
}
