import React from 'react';
import ReactDOMServer from 'react-dom/server';
import axios from 'axios';
import App from 'components/App';
import config from 'config';
import {ServerStyleSheets} from '@material-ui/core/styles';
import StoreApi from '../api/StoreApi';
import ArticleContext from 'components/ArticleContext';

const serverRender = async () => {
  const response = await axios.get(`http://${config.host}:${config.port}/data`);
  const store = new StoreApi(response.data);

  const sheets = new ServerStyleSheets();

  // Render the component to a string.
  const content = ReactDOMServer.renderToString(
    sheets.collect(
      <ArticleContext.Provider value={store}>
        <App />
      </ArticleContext.Provider>
    )
  );

  // Grab the CSS from the sheets.
  const css = sheets.toString();

  return {content: content, cssData: css, data: response.data};
};

export default serverRender;
