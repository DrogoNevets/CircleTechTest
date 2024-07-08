import { Request, Response } from 'express';
import {  } from 'fs';
import redis from '../../servcies/redis';

type ReqParams = {
  convertedFile : string;
}

export default async (req : Request, res : Response) => {
  const { convertedFile } = req.params as ReqParams;

  const rawDetails = await redis.client.get(convertedFile);

  if(!rawDetails) {
    res.status(500).send('file missing').end();
  }

  const details = JSON.parse(rawDetails!);

  res.redirect(details?.file);

  redis.client.del(convertedFile);
};