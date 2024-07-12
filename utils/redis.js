const Redis = require('redis');
const util = require('util');

class RedisClient {
    // Constructor method
    constructor(host, port) {
        this.client = redis.createClient({
            host: host,
            port: port
        });

        this.client.on('connect', () => {
            console.log('Redis client connected to the server');
        });

        this.client.on('error', (err) => {
            console.error(`Redis client not connected to the server: ${err.message}`);
        });
    }
    // isAlive method using 'ping'
    async isAlive() {
        try {
            await this.client.ping();
            return true;
        } catch (error) {
            return false;
        }
    }
    // get method using 'get'
    async get(key) {
        try {
            const value = await this.client.get(key);
            return value;
        } catch (error) {
            throw new Error(`Error retrieving value for key '${key}': ${error.message}`);
        }
    }
    // set method using 'set'
    async set(key, value, durationInSeconds) {
        try {
            const result = await this.client.set(key, value, 'PX', durationInSeconds * 1000);
            return result;
        } catch (error) {
            throw new Error(`Error setting value for key '${key}': ${error.message}`);
        }
    }
    // delete method using 'del'
    async del(key) {
        try {
            // Use the 'del' command to delete the value associated with the given key
            const result = await this.client.del(key);
            return result;
          } catch (error) {
            throw new Error(`Error deleting value for key '${key}': ${error.message}`);
          }
    }
}
                                                                // Create & export RedisClient Instance
const redisClient = new RedisClient('your_redis_host', 'your_redis_port');
export { redisClient };

