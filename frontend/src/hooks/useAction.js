import { useState } from 'react';

/** Wraps a mutation. `run` never throws; it resolves to `{ ok, data }`. */
export function useAction(fn) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  const run = async (...args) => {
    setPending(true);
    setError(null);
    try {
      return { ok: true, data: await fn(...args) };
    } catch (err) {
      setError(err.message);
      return { ok: false };
    } finally {
      setPending(false);
    }
  };

  return { run, pending, error };
}
