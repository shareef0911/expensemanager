import { useState } from 'react';
import { useAction } from './useAction';

/**
 * Form state + validation + submit handling in one place.
 * validate(values) -> { fieldName: 'message' } (empty object = valid)
 * onSubmit(values) -> async; a thrown error is shown in the form.
 */
export function useForm({ initial, validate, onSubmit }) {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const { run, pending, error } = useAction(onSubmit);

  const bind = (name) => ({
    name,
    value: values[name],
    onChange: (e) => setValues((v) => ({ ...v, [name]: e.target.value })),
  });

  const submit = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length === 0) run(values);
  };

  return { values, errors, bind, submit, pending, error };
}
