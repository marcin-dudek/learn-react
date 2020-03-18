class StoreApi {
  constructor(rawData) {
    this.rawData = rawData;
    this.articles = this.mapToObjects(this.rawData.articles);
    this.authors = this.mapToObjects(this.rawData.authors);
  }

  mapToObjects = arr =>
    arr.reduce((acc, current) => {
      acc[current.id] = current;
      return acc;
    }, {});

  lookupAuthor = authorId => this.authors[authorId];
  getArticles = () => this.articles;
  getAuthors = () => this.authors;
}

export default StoreApi;
