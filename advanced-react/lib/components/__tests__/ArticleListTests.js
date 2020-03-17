import React from 'react';
import ArticleList from '../ArticleList';

import renderer from 'react-test-renderer';

describe('ArticleList', () => {
  const data = {
    articles: {
      a: {id: 'a', date: '2020-04-01'},
      b: {id: 'b', date: '2020-04-01'},
    },
    getAuthor: jest.fn(_ => ({
      firstName: 'Marcin',
      lastName: 'Dudek',
      website: 'https://google.com',
    })),
  };

  it('renders correctly', () => {
    const tree = renderer.create(<ArticleList {...data} />).toJSON();

    expect(tree.children.length).toBe(2);
    expect(tree).toMatchSnapshot();
  });
});
