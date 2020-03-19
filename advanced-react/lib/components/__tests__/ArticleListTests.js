import React from 'react';
import ArticleList from '../ArticleList';

import renderer from 'react-test-renderer';
import ArticleContext from '../ArticleContext';

describe('ArticleList', () => {
  const store = {
    getArticles: jest.fn(() => ({
      a: {id: 'a', date: '2020-04-01', title: 'Title A', body: 'Body A'},
      b: {id: 'b', date: '2020-04-01', title: 'Title B', body: 'Body B'},
    })),
    lookupAuthor: jest.fn(() => ({
      firstName: 'Marcin',
      lastName: 'Dudek',
      website: 'https://google.com',
    })),
  };

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <ArticleContext.Provider value={store}>
          <ArticleList />
        </ArticleContext.Provider>
      )
      .toJSON();

    expect(tree.children.length).toBe(2);
    expect(tree).toMatchSnapshot();
  });
});
