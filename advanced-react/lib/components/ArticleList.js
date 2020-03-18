import React, {useContext} from 'react';
import Grid from '@material-ui/core/Grid';
import Article from './Article';
import ArticleContext from './ArticleContext';

const ArticleList = () => {
  const store = useContext(ArticleContext);

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      {Object.values(store.getArticles()).map(a => (
        <Article key={a.id} article={a} />
      ))}
    </Grid>
  );
};

export default ArticleList;
