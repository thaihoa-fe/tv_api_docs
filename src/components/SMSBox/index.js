import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import PopupApp from '../PopupApp';

const Wrapper = styled(PopupApp)`
  ${props =>
    !props.isOpen &&
    css`
      display: none;
    `}
`;

const RemoteApp = styled.iframe`
  border-width: 0px;
  border-style: none;
  border-color: transparent;
  border-image: initial;
  border-radius: 0px;
`;

function SMSBox({ isOpen, serviceURL }) {
  return (
    <Wrapper isOpen={isOpen}>
      <RemoteApp src={serviceURL} title="SMSC Chat" />
    </Wrapper>
  );
}

SMSBox.propTypes = {
  isOpen: PropTypes.bool,
  serviceURL: PropTypes.string,
};

SMSBox.defaultProps = {
  isOpen: false,
  serviceURL: '',
};

export default SMSBox;
