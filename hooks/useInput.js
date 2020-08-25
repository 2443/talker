import { useState, useCallback } from 'react';

const useInput = (init) => {
  const [value, setValue] = useState(init);
  const changeValue = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  return [value, setValue, changeValue];
};

export default useInput;
