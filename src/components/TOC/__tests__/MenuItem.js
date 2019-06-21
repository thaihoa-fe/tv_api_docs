import React from 'react';
import renderer from 'react-test-renderer';

import MenuItem from '../MenuItem';

describe('MenuItem', () => {
  it('renders level 1 correctly', () => {
    const tree = renderer
      .create(<MenuItem onClick={jest.fn()} text="Introduction" path="/introduction" level={1} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders level 2 correctly', () => {
    const tree = renderer
      .create(
        <MenuItem
          onClick={jest.fn()}
          text="Introduction"
          path="/introduction"
          level={2}
          id="introduction"
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
