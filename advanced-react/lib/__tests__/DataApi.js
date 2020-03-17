import DataApi from '../DataApi';
import {data} from '../data';

const api = new DataApi(data);

describe('DataApi', () => {
  it('exposes articles as an object', () => {
    const articles = api.getArticles();

    for (let i = 0; i < articles.length; i++) {
      expect(articles[i]).toHaveProperty(['articleId', 'title']);
    }
  });

  it('exposes authors as an object', () => {
    const authors = api.getAuthors();

    for (let i = 0; i < authors.length; i++) {
      expect(authors[i]).toHaveProperty(['authorId', 'firstName', 'lastName']);
    }
  });
});
