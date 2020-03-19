import React, {useMemo} from 'react';
import ArticleList from './ArticleList';
import AppBar from '@material-ui/core/AppBar';
import DescriptionIcon from '@material-ui/icons/Description';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const App = () => {
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
        <ArticleList />
      </ThemeProvider>
    </>
  );
};

export default App;
