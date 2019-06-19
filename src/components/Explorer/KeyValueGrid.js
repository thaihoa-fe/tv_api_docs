import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import shortid from 'shortid';
import CrossIcon from '@atlaskit/icon/glyph/cross';

import DataGrid from '../DataGrid';
import AddButton from './AddButton';

const RemoveButton = styled.span`
  cursor: pointer;
`;

const columns = [
  { key: 'key', name: 'Key', editable: true },
  { key: 'value', name: 'Value', editable: true },
  { key: 'description', name: 'Description', editable: false },
];

function newRows() {
  return { id: shortid.generate(), key: '', name: '', editable: true, selected: true };
}

function KeyValueGrid({ items, onChange }) {
  const latestItems = useRef(items);
  const selectedIndexes = items
    .map((item, index) => (item.selected ? index : -1))
    .filter(index => index !== -1);

  useEffect(() => {
    latestItems.current = items;
  }, [items]);

  const handleRowsUpdate = ({ fromRow, toRow, updated }) => {
    const updatedRows = [...items];
    for (let i = fromRow; i <= toRow; i++) {
      updatedRows[i] = { ...updatedRows[i], ...updated };
    }
    onChange(updatedRows);
  };

  const handleAdd = () => {
    onChange([...items, newRows()]);
  };

  const handleRemove = id => {
    onChange(latestItems.current.filter(item => item.id !== id));
  };

  const handleRowsSelect = selectedRows => {
    const rowIndexes = selectedRows.map(row => row.rowIdx);
    const updatedRows = [...items];
    rowIndexes.forEach(index => {
      updatedRows[index].selected = true;
    });
    onChange(updatedRows);
  };

  const handleRowsDeselect = deselectedRows => {
    const rowIndexes = deselectedRows.map(row => row.rowIdx);
    const updatedRows = [...items];
    rowIndexes.forEach(index => {
      updatedRows[index].selected = false;
    });
    onChange(updatedRows);
  };

  return (
    <>
      <DataGrid
        rowKey="id"
        columns={columns}
        rowGetter={index => items[index]}
        rowsCount={items.length}
        onGridRowsUpdated={handleRowsUpdate}
        enableCellSelect
        enableCellAutoFocus={false}
        rowSelection={{
          showCheckbox: true,
          enableShiftSelect: true,
          onRowsSelected: handleRowsSelect,
          onRowsDeselected: handleRowsDeselect,
          selectBy: {
            indexes: selectedIndexes,
          },
        }}
        getCellActions={(column, row) => {
          if (column.key !== 'description') {
            return null;
          }
          return [
            {
              icon: (
                <RemoveButton>
                  <CrossIcon size="small" />
                </RemoveButton>
              ),
              callback: () => handleRemove(row.id),
            },
          ];
        }}
      />
      <AddButton onClick={handleAdd}>Add New</AddButton>
    </>
  );
}

KeyValueGrid.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string,
      description: PropTypes.string,
    })
  ),
  onChange: PropTypes.func,
};

KeyValueGrid.defaultProps = {
  items: [],
  onChange: () => {},
};

export default KeyValueGrid;
