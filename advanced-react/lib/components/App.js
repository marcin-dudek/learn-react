import React, {useState, useEffect, useMemo} from 'react';
import DataApi from 'api/DataApi';
import ArticleList from './ArticleList';
import AppBar from '@material-ui/core/AppBar';
import DescriptionIcon from '@material-ui/icons/Description';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import axios from 'axios';

const App = props => {
  const [authors, setAuthors] = useState(props.authors);
  const [articles, setArticles] = useState(props.articles);

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode]
  );
  useEffect(() => {
    const fn = async () => {
      const response = await axios.get('/data');
      const api = new DataApi(response.data);
      setAuthors(api.getAuthors());
      setArticles(api.getArticles());
    };
    fn();
  }, []);

  const getAuthor = authorId => authors[authorId];

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar>
            <DescriptionIcon edge="start" />
            <Typography variant="h6" color="inherit" noWrap>
              Articles
            </Typography>
          </Toolbar>
        </AppBar>
        <ArticleList articles={articles} getAuthor={getAuthor} />
      </ThemeProvider>
    </>
  );
};

export default App;
