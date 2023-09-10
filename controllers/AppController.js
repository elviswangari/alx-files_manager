import { redisClient } from '../utils/redis';
import { dbClient } from '../utils/db';

exports.getStatus = (req, res) => {
  const redisStatus = redisClient.isAlive();
  const dbStatus = dbClient.isAlive();
  if (redisStatus && dbStatus) {
    res.send({
      redis: redisStatus,
      db: dbStatus,
    });
  }
};

exports.getStats = (req, res) => {
  const usersStats = dbClient.nbUsers;
  const filesStats = dbClient.nbFiles;
  if (usersStats && filesStats) {
    res.send({
      users: usersStats,
      files: filesStats,
    });
  }
};
