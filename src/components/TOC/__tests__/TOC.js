import React from 'react';
import renderer from 'react-test-renderer';
import MenuItem from '../MenuItem';
import { PureTOC as TOC } from '..';
import categories from './__fixtures__/categories.json';

describe('TOC', () => {
  const history = {
    location: {
      pathname: '/about_trusting_social/',
    },
  };

  it('renders correctly with empty categories', () => {
    const tree = renderer.create(<TOC history={history} />).toJSON();
    expect(tree).toBe(null);
  });

  it('renders correctly with categories', () => {
    const testRenderer = renderer.create(<TOC history={history} categories={categories} />);
    const tree = testRenderer.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders with correct quantity of MenuItem with categories', () => {
    const matchItems = categories.filter(
      item => item.path === history.location.pathname || item.depth === 1
    );
    const testInstance = renderer.create(<TOC history={history} categories={categories} />).root;
    expect(testInstance.findAllByType(MenuItem)).toHaveLength(matchItems.length);
  });
});
