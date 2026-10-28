import { useForm } from '../../hooks/useForm';
import { Field, FormShell } from '../ui/Form';

export default function UserForm({ onSubmit, onCancel }) {
  const form = useForm({
    initial: { name: '', email: '' },
    validate: (v) => ({
      ...(!v.name.trim() && { name: 'Enter a name' }),
      ...(!/^\S+@\S+\.\S+$/.test(v.email.trim()) && { email: 'Enter a valid email address' }),
    }),
    onSubmit: (v) => onSubmit({ name: v.name.trim(), email: v.email.trim() }),
  });

  return (
    <FormShell form={form} onCancel={onCancel} submitLabel="Add person">
      <Field label="Name" error={form.errors.name}><input {...form.bind('name')} autoFocus /></Field>
      <Field label="Email" error={form.errors.email}><input type="email" {...form.bind('email')} /></Field>
    </FormShell>
  );
}
