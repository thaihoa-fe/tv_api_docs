import React from 'react';
import renderer from 'react-test-renderer';
import MenuItem from '../MenuItem';
import { PureTOC as TOC } from '..';
import categories from './__fixtures__/categories.json';

describe('TOC', () => {
  it('renders correctly with empty categories', () => {
    const tree = renderer.create(<TOC />).toJSON();
    expect(tree).toBe(null);
  });

  it('renders correctly with categories', () => {
    const testRenderer = renderer.create(<TOC categories={categories} />);
    const tree = testRenderer.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders with correct quantity of MenuItem with categories', () => {
    const testInstance = renderer.create(<TOC categories={categories} />).root;
    expect(testInstance.findAllByType(MenuItem)).toHaveLength(categories.length);
  });
});
