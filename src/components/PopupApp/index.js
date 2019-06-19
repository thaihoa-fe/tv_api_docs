import styled from 'styled-components';

const Wrapper = styled.div`
  z-index: 900;
  position: fixed;
  bottom: 100px;
  right: 20px;
  width: 376px;
  min-height: 250px;
  max-height: 704px;
  background: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 5px 40px;
  opacity: 1;
  height: calc(100% - 120px);
  border-radius: 8px;
  overflow: hidden;

  & > {
    iframe,
    div {
      width: 100%;
      height: 100%;
      position: absolute;
    }
  }

  @media (max-width: 414px) {
    width: 100%;
    height: 100%;
    max-height: none;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    border-radius: 0px;
  }
`;

export default Wrapper;
