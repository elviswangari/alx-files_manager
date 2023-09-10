import { redisClient } from '../utils/redis';
import { dbClient } from '../utils/db';

exports.getStatus = async (req, res) => {
  try {
    const redisStatus = await redisClient.isAlive();
    const dbStatus = await dbClient.isAlive();

    if (redisStatus && dbStatus) {
      res.status(200).json({
        redis: redisStatus,
        db: dbStatus,
      });
      return;
    }

    // If any of the conditions are not met, it falls through to the error handling
  } catch (error) {
    console.error('Error checking status:', error);
  }
};

exports.getStats = async (req, res) => {
  try {
    const usersStats = await dbClient.nbUsers();
    const filesStats = await dbClient.nbFiles();

    if (usersStats !== -1 && filesStats !== -1) {
      res.status(200).json({
        users: usersStats,
        files: filesStats,
      });
      return;
    }
  } catch (error) {
    console.error('Error getting stats from db:', error);
  }
};
