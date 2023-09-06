const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');

class AppController {
  static getStatus(req, res) {
    const redis = redisClient.isAlive();
    const db = dbClient.isAlive();

    res.status(200).json({
      redis,
      db,
    });
  }

  static getStats(req, res) {
    const users = dbClient.nbUsers();
    const files = dbClient.nbFiles();

    res.status(200).json({
      users,
      files,
    });
  }
}
module.exports = AppController;
