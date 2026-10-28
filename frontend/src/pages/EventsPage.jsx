import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { eventApi } from '../api/eventApi';
import EventForm from '../components/event/EventForm';
import Modal from '../components/ui/Modal';
import PageHeader from '../components/ui/PageHeader';
import { Async, EmptyState } from '../components/ui/States';
import { useAsync } from '../hooks/useAsync';
import { sum } from '../utils/expenses';
import { formatMoney } from '../utils/format';

export default function EventsPage() {
  const state = useAsync(eventApi.list);
  const navigate = useNavigate();
  const [creating, setCreating] = useState(false);

  const create = async (payload) => {
    const event = await eventApi.create(payload);
    navigate(`/events/${event.id}`);
  };

  return (
    <>
      <PageHeader title="Events" subtitle="Trips, parties and anything you split">
        <button className="btn btn--primary" onClick={() => setCreating(true)}>New event</button>
      </PageHeader>
      <Async state={state}>
        {(events) =>
          events.length ? (
            <div className="grid cards">
              {events.map((ev) => (
                <Link key={ev.id} to={`/events/${ev.id}`} className="card event-card">
                  <h3>{ev.eventName}</h3>
                  <p className="muted">{ev.location}</p>
                  <strong className="num">{formatMoney(sum(ev.expenses))}</strong>
                  <span className="muted">{ev.members.length} members, {ev.expenses.length} expenses</span>
                </Link>
              ))}
            </div>
          ) : (
            <EmptyState title="No events yet" hint="Create your first event to start tracking shared expenses." />
          )
        }
      </Async>
      {creating && (
        <Modal title="New event" onClose={() => setCreating(false)}>
          <EventForm onSubmit={create} onCancel={() => setCreating(false)} />
        </Modal>
      )}
    </>
  );
}
