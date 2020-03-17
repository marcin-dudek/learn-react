class DataApi {
  constructor(rawData) {
    this.rawData = rawData;
  }

  mapToObjects = arr =>
    arr.reduce((acc, current) => {
      acc[current.id] = current;
      return acc;
    }, {});

  getArticles = () => this.mapToObjects(this.rawData.articles);
  getAuthors = () => this.mapToObjects(this.rawData.authors);
}

export default DataApi;
