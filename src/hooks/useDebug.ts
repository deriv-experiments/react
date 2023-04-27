import { useState, useEffect } from 'react';
import Deriv from '../index.js';

export function useDebug () {
  const [state, setState] = useState([]);

  useEffect(() => {
    const handleDebugAdd = (data) => {
      setState([
        ...state,
        data
      ]);
    }

    Deriv.on('debug:add', handleDebugAdd)
    Deriv.once('debug', data => {
      setState(data); 
    });

    Deriv.send('debug');
    return () => Deriv.off('debug:add', handleDebugAdd)
  }, []);

  return state;
}

export default useDebug;
