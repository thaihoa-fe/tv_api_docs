import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '@atlaskit/button';
import Tabs from '@atlaskit/tabs';

import isBrowser from '../../utils/browserDetect';
import Markdown from '../Markdown';
import Params from './Params';
import Headers from './Headers';
import Body from './Body';
import Response from './Response';
import { getColorByMethod, initBody, initKeyValueItems, buildRequest } from './utils';

const Title = styled.h1`
  font-size: 1.5rem;
  margin: 20px 8px 30px 8px;
`;

const Description = styled(Markdown)`
  margin: 0 8px;
`;

const Container = styled.div`
  flex: 1;
  margin: 16px 0;
`;

const API = styled.div`
  display: flex;
  align-items: center;
  margin: 16px 8px;
  padding: 6px;
  border: 1px solid ${props => getColorByMethod(props.method)};
  border-radius: 4px;
`;

const Method = styled.div`
  font-size: 0.875rem;
  font-weight: 700;
  min-width: 80px;
  text-align: center;
  color: #ffffff;
  padding: 6px 15px;
  border-radius: 3px;
  background: ${props => getColorByMethod(props.method)};
`;

const Endpoint = styled.div`
  padding: 0 10px;
  font-size: 1rem;
  font-weight: 600;
  word-break: break-all;
`;

const Actions = styled.div`
  margin: 0 8px;
  padding: 12px 0;
  border-top: 1px solid #ebecf0;
`;

const ErrorMessage = styled.div`
  margin: 8px;
  font-size: 1rem;
  color: #de350b;
`;

function Explorer({
  title,
  description,
  baseURL,
  endpoint,
  method,
  defaultParams,
  defaultHeaders,
  defaultBody,
  defaultResponse,
  onSuccess,
}) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [params, setParams] = useState(initKeyValueItems(defaultParams));
  const [headers, setHeaders] = useState(initKeyValueItems(defaultHeaders));
  const [body, setBody] = useState(initBody(defaultBody));
  const [response, setResponse] = useState(defaultResponse);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleTabChange = (_, selectedIndex) => setSelectedTab(selectedIndex);
  const handleParamsChange = newParams => setParams(newParams);
  const handleHeadersChange = newHeaders => setHeaders(newHeaders);
  const handleBodyChange = newBody => setBody(newBody);

  const processBody = () => {
    return body ? JSON.parse(body) : null;
  };

  const send = async () => {
    try {
      setLoading(true);
      setErrorMessage('');
      setResponse(null);
      const request = buildRequest({
        baseURL,
        endpoint,
        method,
        params,
        headers,
        body: processBody(),
      });
      const responseData = await request();
      setResponse(responseData);
      setLoading(false);
      onSuccess(responseData);
    } catch (error) {
      setLoading(false);
      if (error.response) {
        setResponse(error.response);
      } else {
        setErrorMessage(error);
        console.error(error);
      }
    }
  };

  const tabs = [
    {
      label: 'Headers',
      content: (
        <Container>
          <Headers headers={headers} onChange={handleHeadersChange} />
        </Container>
      ),
    },
  ];

  if (method.toUpperCase() !== 'GET' && defaultBody && defaultBody.length) {
    tabs.unshift({
      label: 'Body',
      content: (
        <Container>
          <Body value={body} onChange={handleBodyChange} />
        </Container>
      ),
    });
  }

  if (defaultParams && defaultParams.length) {
    tabs.unshift({
      label: 'Params',
      content: (
        <Container>
          <Params params={params} onChange={handleParamsChange} />
        </Container>
      ),
    });
  }

  if (!isBrowser()) {
    // This component doesn't support SSR
    return null;
  }

  return (
    <>
      <Title>{title}</Title>
      <Description source={description} />
      <API method={method}>
        <Method method={method}>{method}</Method>
        <Endpoint>{endpoint}</Endpoint>
      </API>
      <Tabs tabs={tabs} selected={selectedTab} onSelect={handleTabChange} />
      <Actions>
        <Button
          appearance="primary"
          onClick={send}
          isLoading={loading}
          isDisabled={loading}
          theme={(themeFn, themeProps) => {
            const { buttonStyles, spinnerStyles } = themeFn(themeProps);
            return {
              buttonStyles: {
                ...buttonStyles,
                fontSize: '1.25rem',
                padding: '0 50px',
                boxSizing: 'content-box',
              },
              spinnerStyles,
            };
          }}
        >
          Send
        </Button>
      </Actions>
      {errorMessage && <ErrorMessage>{String(errorMessage)}</ErrorMessage>}
      <Response response={response} />
    </>
  );
}

Explorer.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  baseURL: PropTypes.string,
  endpoint: PropTypes.string,
  method: PropTypes.oneOf(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']),
  defaultParams: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      defaultValue: PropTypes.string,
      description: PropTypes.string,
    })
  ),
  defaultHeaders: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      defaultValue: PropTypes.string,
      description: PropTypes.string,
    })
  ),
  defaultBody: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      type: PropTypes.string,
      defaultValue: PropTypes.string,
      description: PropTypes.string,
      required: PropTypes.bool,
    })
  ),
  defaultResponse: PropTypes.shape({
    data: PropTypes.shape({}),
    status: PropTypes.number,
  }),
  onSuccess: PropTypes.func,
};

Explorer.defaultProps = {
  title: '',
  description: '',
  baseURL: '',
  endpoint: '',
  method: 'GET',
  defaultHeaders: [],
  defaultParams: [],
  defaultBody: [],
  defaultResponse: null,
  onSuccess: () => {},
};

export default Explorer;
