import sha1 from 'sha1';
import { v4 as uuidv4 } from 'uuid';
import { dbClient } from '../utils/db';
import { redisClient } from '../utils/redis';

exports.getConnect = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      error: 'Unauthorized',
    });
  }

  const creds = Buffer.from(authHeader.split(' ')[1], 'base64').toString();
  const [email, password] = creds.split(':');
  const hashedPass = sha1(password);

  try {
    const user = await dbClient.getUser(email);

    if (!user || !user.email || user.password !== hashedPass) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const token = uuidv4();
    const redisKey = `auth_${token}`;
    const data = {
      id: user._id.toString(),
      email: user.email,
    };
    await redisClient.set(redisKey, JSON.stringify(data), 86400);
    return res.status(200).json({
      token,
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getDisconnect = async (req, res) => {
  try {
    const token = req.header('X-Token');
    const redisKey = `auth_${token}`;
    const userId = await redisClient.get(redisKey);

    if (!token || !userId) {
      return res.status(401).json({
        error: 'Unauthorised',
      });
    }
    await redisClient.del(redisKey);
    return res.status(204).send();
  } catch (error) {
    console.error('Error ', error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};
