// controllers/AppController.js
import { redisClient } from '../utils/redis';
import dbClient from '../utils/db';

const AppController = {
  getStatus: async (req, res, next) => {
    try {
      // Check Redis and MongoDB connection status
      const [redisStatus, dbStatus] = await Promise.all([
        redisClient.isAlive(),
        dbClient.isAlive(),
      ]);

      if (redisStatus && dbStatus) {
        res.status(200).json({ redis: true, db: true });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    } catch (error) {
      next(error);
    }
  },

  getStats: async (req, res, next) => {
    try {
      // Get the number of users and files from MongoDB
      const [userCount, fileCount] = await Promise.all([
        dbClient.nbUsers(),
        dbClient.nbFiles(),
      ]);

      if (userCount !== -1 && fileCount !== -1) {
        res.status(200).json({ users: userCount, files: fileCount });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    } catch (error) {
      next(error);
    }
  },
};

export default AppController;
