export const Field = ({ label, error, hint, children }) => (
  <label className="field">
    <span>{label}</span>
    {children}
    {(error || hint) && <small className={error ? 'field-error' : 'muted'}>{error || hint}</small>}
  </label>
);

export function FormShell({ form, onCancel, submitLabel, children }) {
  return (
    <form onSubmit={form.submit} noValidate>
      {children}
      {form.error && <p className="banner" role="alert">{form.error}</p>}
      <footer>
        <button type="button" className="btn" onClick={onCancel}>Cancel</button>
        <button className="btn btn--primary" disabled={form.pending}>{form.pending ? 'Saving…' : submitLabel}</button>
      </footer>
    </form>
  );
}
