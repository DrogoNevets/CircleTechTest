import { createClient } from 'redis';
import { unlinkSync } from 'fs';

class RedisService {
  private _client;
  private _subscriber;

  constructor() {
    this._client = createClient({
      url: 'redis://:password@localhost:18081/0'
    });

    this._subscriber = createClient({
      url: 'redis://:password@localhost:18081/0'
    });

    this._client.on('error', (err) => console.log('Redis Client Error', err));
    this._subscriber.on('error', (err) => console.log('Redis Client Error', err));

    this.connect();
  }

  async connect() {
    try {
      await this._client.connect();
      await this._subscriber.connect();
    } catch(e) {
      console.error(e);
    } finally {
      this.subscribe();
    }
  }

  subscribe() {
    this._subscriber.subscribe('file:new', this.newFile.bind(this));
  }

  private async newFile(message : string) {
    const msg = JSON.parse(message);

    // do file conversion
    // email user saying file is ready

    const curr = await this.client.get(msg.filename);

    if(!curr) {
      throw new Error('File not found');
    }

    const details = {
      ...JSON.parse(curr),
      file: 'https://archronos.com/wp-content/uploads/2024/07/dummy.txt'
    };

    await this.client.set(msg.filename, JSON.stringify(details));
    console.debug(`now vist the following URL: GET:: http://localhost:8080/file/${msg.filename}`);

    unlinkSync(msg.path);
  }

  get client() {
    return this._client;
  }

  async test() {
    try {
      await this._client.set('test', 'REDIS up and running');
      console.debug(await this._client.get('test'));
      await this._client.del('test');
    } catch(e) {
      console.error(e);
    }
  }
}

Object.freeze(RedisService);
export default new RedisService();
