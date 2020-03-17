import express from 'express';
import config from './config';
import serverRender from 'renderers/server';
import {data} from './data';

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', async (_, res) => {
  const content = await serverRender();
  res.render('index', {initialContent: content});
});

app.get('/data', (_, res) => {
  res.send(data);
});

app.listen(config.port, () => {
  console.log(`Running on port ${config.port}`);
});
