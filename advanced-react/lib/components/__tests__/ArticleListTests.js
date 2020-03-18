import React from 'react';
import ArticleList from '../ArticleList';

import renderer from 'react-test-renderer';

describe('ArticleList', () => {
  const store = {
    getArticles: jest.fn(() => ({
      a: {id: 'a', date: '2020-04-01'},
      b: {id: 'b', date: '2020-04-01'},
    })),
    lookupAuthor: jest.fn(() => ({
      firstName: 'Marcin',
      lastName: 'Dudek',
      website: 'https://google.com',
    })),
  };

  it('renders correctly', () => {
    const tree = renderer.create(<ArticleList store={store} />).toJSON();

    expect(tree.children.length).toBe(2);
    expect(tree).toMatchSnapshot();
  });
});
