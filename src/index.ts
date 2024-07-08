import express from 'express';

import redis from './servcies/redis';

import { file } from './controllers';

const app = express();

app.use('/file', file);

app.listen(8080, () => {
  console.info('app listening on `8080`');

  redis.test();
});