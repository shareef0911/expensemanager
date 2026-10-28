import { useForm } from '../../hooks/useForm';
import { CATEGORIES } from '../../utils/constants';
import { today } from '../../utils/format';
import { Field, FormShell } from '../ui/Form';

/**
 * events: [{ id, eventName, members }] – one event hides the event picker.
 * initial: an existing expense (with eventId) when editing.
 */
export default function ExpenseForm({ events, initial, onSubmit, onCancel }) {
  const start = initial
    ? {
        description: initial.description, amount: String(initial.amount), category: initial.category,
        expenseDate: initial.expenseDate, eventId: String(initial.eventId), userId: String(initial.paidBy.id),
      }
    : {
        description: '', amount: '', category: CATEGORIES[0], expenseDate: today(),
        eventId: events.length === 1 ? String(events[0].id) : '', userId: '',
      };

  const findEvent = (id) => events.find((e) => String(e.id) === id);

  const form = useForm({
    initial: start,
    validate: (v) => {
      const err = {};
      if (!v.description.trim()) err.description = 'Enter a description';
      if (!(Number(v.amount) > 0)) err.amount = 'Amount must be greater than zero';
      if (!v.expenseDate) err.expenseDate = 'Pick a date';
      if (!v.eventId) err.eventId = 'Choose an event';
      if (!v.userId || !findEvent(v.eventId)?.members.some((m) => String(m.id) === v.userId)) {
        err.userId = 'Choose a member of this event';
      }
      return err;
    },
    onSubmit: (v) => onSubmit({
      description: v.description.trim(), amount: Number(v.amount), category: v.category,
      expenseDate: v.expenseDate, eventId: Number(v.eventId), userId: Number(v.userId),
    }),
  });

  const members = findEvent(form.values.eventId)?.members ?? [];
  const categories = [...new Set([...CATEGORIES, form.values.category])];

  return (
    <FormShell form={form} onCancel={onCancel} submitLabel={initial ? 'Save changes' : 'Add expense'}>
      <Field label="Description" error={form.errors.description}><input {...form.bind('description')} autoFocus /></Field>
      <div className="row">
        <Field label="Amount" error={form.errors.amount}><input type="number" step="0.01" min="0" {...form.bind('amount')} /></Field>
        <Field label="Date" error={form.errors.expenseDate}><input type="date" {...form.bind('expenseDate')} /></Field>
      </div>
      <Field label="Category">
        <select {...form.bind('category')}>{categories.map((c) => <option key={c}>{c}</option>)}</select>
      </Field>
      {events.length > 1 && (
        <Field label="Event" error={form.errors.eventId}>
          <select {...form.bind('eventId')}>
            <option value="">Select an event</option>
            {events.map((e) => <option key={e.id} value={e.id}>{e.eventName}</option>)}
          </select>
        </Field>
      )}
      <Field label="Paid by" error={form.errors.userId} hint={form.values.eventId && !members.length ? 'This event has no members yet. Add members first.' : undefined}>
        <select {...form.bind('userId')}>
          <option value="">Select a member</option>
          {members.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
        </select>
      </Field>
    </FormShell>
  );
}
