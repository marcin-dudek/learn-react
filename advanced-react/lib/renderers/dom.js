import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/App';
import StoreApi from 'api/StoreApi';
import ArticleContext from 'components/ArticleContext';

const store = new StoreApi(window.initialData);

ReactDOM.render(
  <ArticleContext.Provider value={store}>
    <App />
  </ArticleContext.Provider>,
  document.getElementById('root')
);
