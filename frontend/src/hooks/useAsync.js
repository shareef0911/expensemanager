import { useCallback, useEffect, useRef, useState } from 'react';

/** Runs `fn` on mount (and when `deps` change). Keeps stale data while reloading. */
export function useAsync(fn, deps = []) {
  const [state, setState] = useState({ data: null, loading: true, error: null });
  const latest = useRef(0);

  const reload = useCallback(() => {
    const id = ++latest.current;
    setState((s) => ({ ...s, loading: true, error: null }));
    return fn().then(
      (data) => id === latest.current && setState({ data, loading: false, error: null }),
      (err) => id === latest.current && setState((s) => ({ ...s, loading: false, error: err.message })),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    reload();
    return () => { latest.current++; };
  }, [reload]);

  return { ...state, reload };
}
