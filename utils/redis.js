import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    // Create a Redis client
    this.client = createClient();

    // set connected as false
    this.isConnected = false;

    // Handle Redis connection errors
    this.client.on('error', (err) => console.error('Redis Error:', err));
    this.client.on('connect', () => {
      this.isConnected = true;
    });
  }

  isAlive() {
    // Check if the Redis client is connected
    return this.isConnected;
  }

  async get(key) {
    // Get the value associated with a Redis key
    const getAsync = promisify(this.client.get).bind(this.client);
    return getAsync(key);
  }

  async set(key, value, duration) {
    // Set a Redis key with an expiration time
    const setexAsync = promisify(this.client.setex).bind(this.client);
    return setexAsync(key, duration, value);
  }

  async del(key) {
    // Delete a Redis key
    const delAsync = promisify(this.client.del).bind(this.client);
    return delAsync(key);
  }
}

export const redisClient = new RedisClient();
export default redisClient;
