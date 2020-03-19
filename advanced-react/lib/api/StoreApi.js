import pickBy from 'lodash.pickby';

class StoreApi {
  constructor(rawData) {
    this.rawData = rawData;
    this.articles = this.mapToObjects(this.rawData.articles);
    this.authors = this.mapToObjects(this.rawData.authors);
    this.subscriptions = {};
    this.lastSubId = 0;
    this.filter = '';
  }

  mapToObjects = arr =>
    arr.reduce((acc, current) => {
      acc[current.id] = current;
      return acc;
    }, {});

  subscribe = callback => {
    this.lastSubId++;
    this.subscriptions[this.lastSubId] = callback;
    return this.lastSubId;
  };

  unsubscribe = subId => {
    delete this.subscriptions[subId];
  };

  notifySubscribers = () => {
    Object.values(this.subscriptions).forEach(callback => callback(this.getArticles()));
  };

  lookupAuthor = authorId => this.authors[authorId];
  getArticles = () =>
    pickBy(this.articles, value => {
      return this.filter
        ? value.title.match(this.filter) || value.body.match(this.filter)
        : true;
    });

  getAuthors = () => this.authors;

  setFilter = filter => {
    this.filter = filter;
    this.notifySubscribers();
  };
}

export default StoreApi;
