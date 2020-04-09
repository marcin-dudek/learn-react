import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/App';
import StoreApi from 'api/StoreApi';
import ArticleContext from 'components/ArticleContext';
//import whyDidYouRender from '@welldone-software/why-did-you-render';
const store = new StoreApi(window.initialData);

//whyDidYouRender(React, {trackAllPureComponents: true});

ReactDOM.render(
  <ArticleContext.Provider value={store}>
    <App />
  </ArticleContext.Provider>,
  document.getElementById('root')
);
