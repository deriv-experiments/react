import { useState, useEffect } from 'react';
import Deriv from '../index.js';

export function useSubscribe (command) {
  const [state, setState] = useState();

  useEffect(() => {
    const unsubscribe = Deriv.subscribe(command, setState);

    return () => unsubscribe()
  }, []);

  return state;
}

export default useSubscribe;
