import React, { useEffect } from 'react';
import { navigate } from 'gatsby';
import { isExpired, clearAuthToken } from '../../utils/auth';
import isBrowser from '../../utils/browserDetect';

/*
Leave it here for later usage
*/

function Auth({ children, ...rest }) {
  useEffect(() => {
    const id = setInterval(() => {
      if (isExpired() && isBrowser()) {
        clearAuthToken();
        navigate('/login');
      }
    }, 10000);
    return () => clearInterval(id);
  }, []);

  if (isExpired() && isBrowser()) {
    clearAuthToken();
    navigate('/login');
    return null;
  }

  return React.Children.map(children, (child, index) => {
    return React.cloneElement(child, {
      index,
      ...rest,
    });
  });
}

export default Auth;
