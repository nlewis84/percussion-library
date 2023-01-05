import { useCallback, useMemo, useState } from 'react';

export const useTextField = (initialValue = '') => {
  const [value, setValue] = useState(initialValue);

  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  return useMemo(() => ({
    onChange,
    value,
  }), [value, onChange]);
};
