const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');

class AppController {
  static getStatus(req, res) {
    const status = { redis: redisClient.isAlive(), db: dbClient.isAlive() };

    res.status(200).send(status);
  }

  static getStats(req, res) {
    const users = dbClient.nbUsers();
    const files = dbClient.nbFiles();

    res.status(200).send({ users, files });
  }
}
module.exports = AppController;
