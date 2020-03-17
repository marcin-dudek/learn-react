import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

const toISODate = date => {
  const pad = s => (s < 10 ? '0' + s : s);
  return (
    date.getUTCFullYear() + '-' + pad(date.getUTCMonth()+1) + '-' + pad(date.getUTCDate())
  );
};

const Article = props => {
  const {article, getAuthor} = props;
  const author = getAuthor(article.authorId);

  return (
    <Card style={{maxWidth: 600, marginTop: 10}}>
      <CardHeader
        avatar={
          <Avatar aria-label="author initials">
            {author.firstName[0]}
            {author.lastName[0]}
          </Avatar>
        }
        title={article.title}
        subheader={toISODate(new Date(article.date))}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {article.body}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" href={author.website}>
          {author.firstName} {author.lastName}
        </Button>
      </CardActions>
    </Card>
  );
};

export default Article;
