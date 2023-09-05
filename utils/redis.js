import { createClient } from 'redis';

class RedisClient {
  constructor () {
    this.client = createClient();
    this.client.on('error', err => console.log(err));
    this.connected = false;
    this.client.on('connect', () => {
      this.connected = true;
    });
}
  isAlive() {
    // returns true when redis con is ok else false
    return this.connected;
  }

  async get(key) {
    // return redis value stored for the key
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, value) => {
        if (err) {
          reject(err);
        } else {
          resolve(value);
        }
      });
    });
  }

  async set(key,value, duration) {
    // store key value in redis in duration given
    return new Promise((resolve, reject) => {
    this.client.setex(key, duration, value, (error) => {
      if (error) {
        reject(error);
      }
    });
    });

  }

  async del(key) {
    // remove value from redis 
    return new Promise((resolve, reject) => {
    this.client.del(key, (error) => {
        if(error){
          reject(error);
        }
      });
    });
  }
}

const redisClient = new RedisClient();
export default redisClient;
