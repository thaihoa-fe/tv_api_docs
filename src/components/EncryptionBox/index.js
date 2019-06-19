import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TextArea from '@atlaskit/textarea';
import Button from '@atlaskit/button';

import { encrypt, decrypt } from '../../utils/crypto';
import PopupApp from '../PopupApp';
import Markdown from '../Markdown';
import { Title, Label, Field, Footer } from '../Form';

const MODE = {
  ENCRYPTION: 'encryption',
  DECRYPTION: 'decryption',
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  box-sizing: border-box;
`;

const Body = styled.div`
  flex: 1;
  margin-bottom: 20px;
  overflow: auto;
`;

const ShowKeyButton = styled(Button).attrs({
  appearance: 'link',
  spacing: 'none',
})`
  transform: translateY(-12px);
`;

const ErrorContainer = styled.div`
  margin-bottom: 10px;
`;

const Error = styled.span`
  color: #de350b;
`;

function EncryptionBox({ isOpen, mode, telcoPublicKey, clientPrivateKey }) {
  const [message, setMessage] = useState('');
  const [result, setResult] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showKey, setShowKey] = useState(false);

  const encryptMessage = () => {
    if (!telcoPublicKey) {
      setErrorMessage('Missing telco public key, please set it in Settings');
      return;
    }

    try {
      setErrorMessage('');
      setResult(encrypt(message, telcoPublicKey));
    } catch (error) {
      setErrorMessage(error);
      setResult('');
    }
  };

  const decryptMessage = () => {
    if (!clientPrivateKey) {
      setErrorMessage('Missing client private key, please set it in Settings');
      return;
    }

    try {
      setErrorMessage('');
      setResult(decrypt(message, clientPrivateKey));
    } catch (error) {
      setErrorMessage(error);
      setResult('');
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <PopupApp>
      <Wrapper>
        <Title>{`${mode === MODE.ENCRYPTION ? 'Encryption' : 'Decryption'} Tool`}</Title>
        <Body>
          <Field>
            <Label>{`${mode === MODE.ENCRYPTION ? 'Plain' : 'Encrypted'} Message:`}</Label>
            <TextArea
              minimumRows={5}
              isMonospaced
              value={message}
              onChange={event => setMessage(event.target.value)}
            />
          </Field>

          <Field>
            <Label>{`${mode === MODE.ENCRYPTION ? 'Encrypted' : 'Plain'} Message:`}</Label>
            <TextArea minimumRows={5} isMonospaced isReadOnly value={result} />
          </Field>

          <ShowKeyButton onClick={() => setShowKey(!showKey)}>
            {`${showKey ? 'Hide' : 'Show'} ${mode === MODE.ENCRYPTION ? 'Public' : 'Private'} Key`}
          </ShowKeyButton>

          {showKey && mode === MODE.ENCRYPTION && (
            <Markdown>{`\`\`\`\n${telcoPublicKey}\`\`\``}</Markdown>
          )}

          {showKey && mode === MODE.DECRYPTION && (
            <Markdown>{`\`\`\`\n${clientPrivateKey}\`\`\``}</Markdown>
          )}

          {mode === MODE.ENCRYPTION && (
            <Markdown>
              **Notice**: Please configure `Telco Public Key` to encrypt message before sending to
              server in **Settings** menu on the left sidebar.
            </Markdown>
          )}

          {mode === MODE.DECRYPTION && (
            <Markdown>
              **Notice**: Please configure `Client Private Key` to decrypt message from server in
              **Settings** menu on the left sidebar.
            </Markdown>
          )}
        </Body>

        <Footer>
          {mode === MODE.ENCRYPTION && (
            <Button appearance="primary" onClick={encryptMessage}>
              Encrypt
            </Button>
          )}
          {mode === MODE.DECRYPTION && (
            <Button appearance="primary" onClick={decryptMessage}>
              Decrypt
            </Button>
          )}
        </Footer>

        {errorMessage && (
          <ErrorContainer>
            <Error>{String(errorMessage)}</Error>
          </ErrorContainer>
        )}
      </Wrapper>
    </PopupApp>
  );
}

EncryptionBox.propTypes = {
  isOpen: PropTypes.bool,
  mode: PropTypes.oneOf([MODE.ENCRYPTION, MODE.DECRYPTION]),
  telcoPublicKey: PropTypes.string,
  clientPrivateKey: PropTypes.string,
};

EncryptionBox.defaultProps = {
  isOpen: false,
  mode: MODE.ENCRYPTION,
  telcoPublicKey: '',
  clientPrivateKey: '',
};

export default EncryptionBox;
