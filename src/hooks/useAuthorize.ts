import { useState, useEffect } from 'react';
import Deriv from '../index.ts';

export function useAuthorize () {
  const [state, setState] = useState(null);
  
  useEffect(() => {
    const unsubscribe = Deriv.on('authorize', setState);

    return () => unsubscribe()
  }, []);
  
  return state?.authorize;
}

export default useAuthorize;
