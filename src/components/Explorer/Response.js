import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AceEditor from 'react-ace';

import 'brace/mode/json';
import 'brace/theme/tomorrow';

const Title = styled.h3`
  display: flex;
  align-items: center;
  margin: 0 0 16px 0;
  padding: 12px;
  font-size: 1.125rem;
  font-weight: 500;
  border: 1px solid #dddddd;
  border-radius: 2px;
`;

const Status = styled.span`
  font-weight: 400;
  margin-left: 5px;
  color: ${props => (props.code >= 400 ? '#dd1144' : '#4ba144')};
`;

const Container = styled.div`
  margin: 8px;
`;

const EditorWrapper = styled.div`
  border: 1px solid #dddddd;
  border-radius: 2px;
`;

function Response({ response }) {
  if (!response) {
    return null;
  }

  const jsonString = response.data ? JSON.stringify(response.data, null, 2) : '';

  return (
    <Container>
      <Title>
        Response:
        <Status code={response.status}>{response.status}</Status>
      </Title>
      <EditorWrapper>
        <AceEditor
          placeholder="No response data"
          mode="json"
          theme="tomorrow"
          width="100%"
          value={jsonString}
          minLines={18}
          maxLines={25}
          fontSize={14}
          tabSize={2}
          readOnly
          showGutter
          showPrintMargin={false}
          highlightActiveLine={false}
        />
      </EditorWrapper>
    </Container>
  );
}

Response.propTypes = {
  response: PropTypes.shape({
    data: PropTypes.shape({}),
    status: PropTypes.number,
  }),
};

Response.defaultProps = {
  response: null,
};

export default Response;
