import * as utils from '../utils';
import data from './__fixtures__/markdownData.json';
import data2 from './__fixtures__/markdownData2.json';

describe('TOC utils', () => {
  test('should parse data correctly with 1 depth level', () => {
    const parsed = utils.normalizeHeading(data);
    expect(parsed).toEqual([
      {
        value: 'Demo',
        path: '/demo/',
        depth: 1,
      },
      {
        value: 'heading 1',
        id: 'heading-1',
        path: '/demo/',
        depth: 2,
      },
      {
        value: 'heading 2',
        id: 'heading-2',
        path: '/demo/',
        depth: 2,
      },
    ]);
  });

  test('should parse data correctly with 2 depth level', () => {
    const parsed = utils.normalizeHeading(data2);
    expect(parsed).toEqual([
      {
        value: 'Demo',
        path: '/demo/',
        depth: 1,
      },
      {
        value: 'heading 1',
        id: 'heading-1',
        path: '/demo/',
        depth: 2,
      },
      {
        value: 'heading 2',
        id: 'heading-2',
        path: '/demo/',
        depth: 2,
      },
      {
        value: 'heading 2.1',
        id: 'heading-21',
        path: '/demo/',
        depth: 3,
      },
      {
        value: 'heading 2.2',
        id: 'heading-22',
        path: '/demo/',
        depth: 3,
      },
    ]);
  });
});
