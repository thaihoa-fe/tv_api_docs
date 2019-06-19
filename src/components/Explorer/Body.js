import React from 'react';
import styled from 'styled-components';
import AceEditor from 'react-ace';

import 'brace/mode/json';
import 'brace/theme/monokai';

const Wrapper = styled.div`
  border: 1px solid #272721;
  border-radius: 2px;
`;

function Body(props) {
  return (
    <Wrapper>
      <AceEditor
        placeholder="Request body in JSON format"
        mode="json"
        theme="monokai"
        width="100%"
        minLines={18}
        maxLines={25}
        fontSize={14}
        tabSize={2}
        showGutter
        showPrintMargin={false}
        highlightActiveLine
        {...props}
      />
    </Wrapper>
  );
}

export default Body;
