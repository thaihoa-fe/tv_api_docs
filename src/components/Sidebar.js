import styled, { css } from 'styled-components';

export const Menu = styled.ul``;

export const MenuItem = styled.li`
  &:last-of-type {
    margin-bottom: 0 !important;
  }

  ${props =>
    props.onClick &&
    css`
      cursor: pointer;

      &:hover {
        color: #0099e5;
      }
    `}

  ${props =>
    props.selected &&
    css`
      color: #0099e5;
    `}
`;

export const Body = styled.div`
  padding: 15px 20px;
  height: 100%;
  overflow: auto;
`;

export const Footer = styled.footer`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

const Sidebar = styled.nav`
  position: relative;
  width: 300px;

  ${Menu} {
    margin: 10px 0;
    padding: 0;
    line-height: 1.375rem;
    font-size: 1rem;
    font-weight: 600;
    overflow: hidden;

    ${MenuItem} {
      margin-bottom: 18px;
      padding: 0;

      ${Menu} {
        font-size: 0.875rem;
        font-weight: 500;

        ${MenuItem} {
          margin-bottom: 10px;
          padding: 4px 15px;
        }
      }
    }
  }

  @media (max-width: 1024px) {
    width: 200px;
  }

  @media (max-width: 768px) {
    width: 150px;
  }
`;

Sidebar.Body = Body;
Sidebar.Footer = Footer;
Sidebar.Menu = Menu;
Sidebar.MenuItem = MenuItem;

export default Sidebar;
