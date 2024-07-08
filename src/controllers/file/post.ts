import { Request, Response } from 'express';
import redis from '../../servcies/redis';

// stubbed user
const user = {
  email: 'here@there.com'
}

export default (req : Request, res : Response) => {
  const { file } = req;

  if(!file) {
    return res.status(400).end();
  }

  redis.client.set(file?.filename, JSON.stringify({
    email: user.email,
    file: null
  }));

  redis.client.publish('file:new', JSON.stringify(file));

  res.send('See console for next URL').end();
};