import React from 'react';
import Grid from '@material-ui/core/Grid';
import Article from './Article';

const ArticleList = props => {
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      {Object.values(props.store.getArticles()).map(a => (
        <Article key={a.id} article={a} store={props.store} />
      ))}
    </Grid>
  );
};

export default ArticleList;
