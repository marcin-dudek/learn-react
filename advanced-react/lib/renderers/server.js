import React from 'react';
import ReactDOMServer from 'react-dom/server';
import axios from 'axios';
import App from 'components/App';
import DataApi from 'api/DataApi';
import config from 'config';
import {ServerStyleSheets, ThemeProvider} from '@material-ui/core/styles';
import {createMuiTheme} from '@material-ui/core/styles';

function renderFullPage(html, css) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>My page</title>
        <style id="jss-server-side">${css}</style>
      </head>
      <body>
        <div id="root">${html}</div>
      </body>
    </html>
  `;
}

const serverRender = async () => {
  const response = await axios.get(`http://${config.host}:${config.port}/data`);
  const api = new DataApi(response.data);

  const sheets = new ServerStyleSheets();
  const theme = createMuiTheme({
    palette: {
      type: 'light',
    },
  });

  // Render the component to a string.
  const html = ReactDOMServer.renderToString(
    sheets.collect(
      <ThemeProvider theme={theme}>
        <App authors={api.getAuthors()} articles={api.getArticles()} />
      </ThemeProvider>
    )
  );

  // Grab the CSS from the sheets.
  const css = sheets.toString();

  return renderFullPage(html, css);
};

export default serverRender;
