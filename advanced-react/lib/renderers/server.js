import React from 'react';
import ReactDOMServer from 'react-dom/server';
import axios from 'axios';
import App from 'components/App';
import config from 'config';
import {ServerStyleSheets, ThemeProvider} from '@material-ui/core/styles';
import {createMuiTheme} from '@material-ui/core/styles';
import StoreApi from '../api/StoreApi';

const serverRender = async () => {
  const response = await axios.get(`http://${config.host}:${config.port}/data`);
  const api = new StoreApi(response.data);

  const sheets = new ServerStyleSheets();
  const theme = createMuiTheme({
    palette: {
      type: 'light',
    },
  });

  // Render the component to a string.
  const content = ReactDOMServer.renderToString(
    sheets.collect(
      <ThemeProvider theme={theme}>
        <App store={api} />
      </ThemeProvider>
    )
  );

  // Grab the CSS from the sheets.
  const css = sheets.toString();

  return {content: content, cssData: css, data: response.data};
};

export default serverRender;
