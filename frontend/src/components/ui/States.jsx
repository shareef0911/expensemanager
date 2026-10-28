export const Loading = () => <div className="state" role="status">Loading…</div>;

export const ErrorState = ({ message, onRetry }) => (
  <div className="state state--error" role="alert">
    <p>{message}</p>
    {onRetry && <button className="btn" onClick={onRetry}>Try again</button>}
  </div>
);

export const EmptyState = ({ title, hint, children }) => (
  <div className="state">
    <h3>{title}</h3>
    {hint && <p className="muted">{hint}</p>}
    {children}
  </div>
);

export const Banner = ({ message }) => (message ? <p className="banner" role="alert">{message}</p> : null);

/** Renders loading / error until data exists, then calls children(data). */
export function Async({ state, children }) {
  if (!state.data) return state.error ? <ErrorState message={state.error} onRetry={state.reload} /> : <Loading />;
  return children(state.data);
}
