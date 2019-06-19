import React, { useState } from 'react';
import { navigate } from 'gatsby';
import styled from 'styled-components';

import * as apis from '../apis';
import GlobalStyle from '../components/Layout/GlobalStyle';
import LoginPanel from '../components/Layout/LoginPanel';
import { isExpired, persistAuthToken } from '../utils/auth';
import isBrowser from '../utils/browserDetect';

const LoginContainer = styled.div`
  width: 100%;
  height: 100vh;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function LoginPage() {
  const [formError, setFormError] = useState('');

  const handleSubmit = data =>
    apis
      .login(data)
      .then(token => {
        persistAuthToken(token);
        navigate('/');
      })
      .catch(err => {
        console.error(err);
        setFormError('Username or password is incorrect');
      });

  if (isBrowser() && !isExpired()) {
    navigate('/');
    return <div />;
  }

  return (
    <LoginContainer>
      <GlobalStyle bodyBgColor="#f5f7fa" />
      <LoginPanel
        onSubmit={handleSubmit}
        formError={formError}
        clearFormError={() => setFormError('')}
      />
    </LoginContainer>
  );
}

export default LoginPage;
