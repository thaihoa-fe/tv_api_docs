import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TextArea from '@atlaskit/textarea';
import Button from '@atlaskit/button';
import InlineMessage from '@atlaskit/inline-message';

import { Title, Label, Field, Spacer, Footer } from '../Form';

const Wrapper = styled.div`
  padding: 0 8px;
`;

function Settings({ defaultSettings, onSave }) {
  const [telcoPublicKey, setTelcoPublicKey] = useState(
    defaultSettings && defaultSettings.telcoPublicKey
  );
  const [clientPrivateKey, setClientPrivateKey] = useState(
    defaultSettings && defaultSettings.clientPrivateKey
  );
  const [showMessage, setShowMessage] = useState(false);
  const timeout = useRef();
  const didUnmount = useRef(false);

  useEffect(() => {
    return () => {
      didUnmount.current = true;
    };
  }, []);

  const save = () => {
    setShowMessage(true);
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
      if (didUnmount.current) {
        return;
      }
      setShowMessage(false);
    }, 1000);
    onSave({ telcoPublicKey, clientPrivateKey });
  };

  return (
    <Wrapper>
      <Title>Settings</Title>
      <Field>
        <Label>Telco Public Key:</Label>
        <TextArea
          defaultValue={telcoPublicKey}
          minimumRows={10}
          isMonospaced
          onChange={event => setTelcoPublicKey(event.target.value)}
        />
      </Field>
      <Field>
        <Label>Client Private Key:</Label>
        <TextArea
          defaultValue={clientPrivateKey}
          minimumRows={10}
          isMonospaced
          onChange={event => setClientPrivateKey(event.target.value)}
        />
      </Field>
      <Footer>
        <Button appearance="primary" onClick={save}>
          Save
        </Button>
        <Spacer />
        {showMessage && <InlineMessage title="Saved" type="confirmation" />}
      </Footer>
    </Wrapper>
  );
}

Settings.propTypes = {
  defaultSettings: PropTypes.shape({}),
  onSave: PropTypes.func,
};

Settings.defaultProps = {
  defaultSettings: null,
  onSave: () => {},
};

export default Settings;
