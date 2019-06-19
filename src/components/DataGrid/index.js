import React from 'react';
import styled from 'styled-components';
import ReactDataGrid from 'react-data-grid';

const Wrapper = styled.div`
  * {
    box-sizing: border-box;
  }

  .react-grid-Main {
    outline: none;
  }

  .react-grid-Grid {
    border-radius: 2px;
  }

  .react-grid-checkbox,
  .react-grid-checkbox-label,
  .radio-custom,
  .radio-custom-label {
    line-height: 0;
  }

  .react-grid-HeaderCell > .react-grid-checkbox-container {
    line-height: 100%;
  }

  .react-grid-checkbox:checked + .react-grid-checkbox-label:after {
    content: '';
    background: #0265ff;
    display: inline-block;
    width: 7px;
    height: 7px;
    border-radius: 1px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .react-grid-checkbox + .react-grid-checkbox-label:before,
  .radio-custom + .radio-custom-label:before {
    content: '';
    background: #fff;
    border: 2px solid #dfe1e5;
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 2px;
    box-sizing: border-box;
  }

  .react-grid-checkbox:checked + .react-grid-checkbox-label:before {
    background: none;
    box-shadow: none;
  }

  .react-grid-checkbox:focus + .react-grid-checkbox-label,
  .radio-custom:focus + .radio-custom-label {
    outline: none;
  }

  .react-grid-HeaderCell--frozen:last-of-type {
    box-shadow: none;
  }

  .rdg-last--frozen {
    box-shadow: none !important;
  }

  .react-grid-Row.row-selected {
    background: #ffffff;

    .react-grid-Cell {
      background: #ffffff;
    }
  }
`;

function DataGrid(props) {
  return (
    <Wrapper>
      <ReactDataGrid {...props} />
    </Wrapper>
  );
}

export default DataGrid;
