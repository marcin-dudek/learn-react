import React, {useContext, useEffect, useState, memo} from 'react';
import Grid from '@material-ui/core/Grid';
import Article from './Article';
import ArticleContext from './ArticleContext';

const ArticleList = () => {
  const store = useContext(ArticleContext);
  const [articles, setArticles] = useState(store.getArticles());

  useEffect(() => {
    let subscription = store.subscribe((list) => setArticles(list));
    return () => store.unsubscribe(subscription);
  });

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      {Object.values(articles).map((a) => (
        <Article key={a.id} article={a} />
      ))}
    </Grid>
  );
};

export default memo(ArticleList);
