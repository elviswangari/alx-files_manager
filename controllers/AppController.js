const utilsRedis = require('../utils/redis');
const utilsDB = require('../utils/db');

class AppController {
  static getStatus(req, res) {
    const redis = utilsRedis.redisClient.isAlive();
    const db = utilsDB.dbClient.isAlive();

    res.status(200).json({
      redis,
      db,
    });
  }

  static getStats(req, res) {
    const users = utilsDB.dbClient.nbUsers();
    const files = utilsDB.dbClient.nbFiles();

    res.status(200).json({
      users,
      files,
    });
  }
}
module.exports = AppController;
