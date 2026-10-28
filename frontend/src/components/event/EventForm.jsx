import { useForm } from '../../hooks/useForm';
import { Field, FormShell } from '../ui/Form';

export default function EventForm({ onSubmit, onCancel }) {
  const form = useForm({
    initial: { eventName: '', location: '' },
    validate: (v) => ({
      ...(!v.eventName.trim() && { eventName: 'Enter an event name' }),
      ...(!v.location.trim() && { location: 'Enter a location' }),
    }),
    onSubmit: (v) => onSubmit({ eventName: v.eventName.trim(), location: v.location.trim() }),
  });

  return (
    <FormShell form={form} onCancel={onCancel} submitLabel="Create event">
      <Field label="Event name" error={form.errors.eventName}><input {...form.bind('eventName')} autoFocus /></Field>
      <Field label="Location" error={form.errors.location}><input {...form.bind('location')} /></Field>
    </FormShell>
  );
}
