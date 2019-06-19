import { useState, useEffect } from 'react';

import * as API from '../apis';

function useTelcoPublicKey() {
  const [key, setKey] = useState('');

  useEffect(() => {
    const fetchKey = async () => {
      setKey(await API.getTelcoPublicKey());
    };

    fetchKey();
  }, []);

  return key;
}

export default useTelcoPublicKey;
