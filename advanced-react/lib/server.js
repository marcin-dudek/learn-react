import express from 'express';
import config from './config';
import serverRender from 'renderers/server';

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  const content = serverRender();
  res.render('index', {initialContent: content});
});

app.listen(config.port, () => {
  console.log(`Running on port ${config.port}`);
});
