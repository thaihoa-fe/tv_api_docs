import React from 'react';
import styled from 'styled-components';
import Button from '@atlaskit/button';
import AddIcon from '@atlaskit/icon/glyph/add';

const AddButton = styled(Button).attrs({
  iconBefore: <AddIcon />,
})`
  margin-top: 16px;
`;

export default AddButton;
