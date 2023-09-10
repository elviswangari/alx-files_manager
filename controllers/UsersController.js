import sha1 from 'sha1';
import { dbClient } from '../utils/db';
import { redisClient } from '../utils/redis';

exports.postNew = async (req, res) => {
  if (!req.body.email) {
    return res.status(400).json({ error: 'Missing email' });
  }
  if (!req.body.password) {
    return res.status(400).json({ error: 'Missing password' });
  }

  const { email, password } = req.body;

  try {
    const userExists = await dbClient.getUser(email);

    if (userExists.email === email) {
      return res.status(400).json({ error: 'Already exist' });
    }
    const pHash = sha1(password);
    const newUser = {
      email,
      password: pHash,
    };
    const inserted = await dbClient.insertUser(newUser);
    return res.status(201).json({
      id: inserted.insertedId.toString(),
      email: newUser.email,
      //   password: inserted.ops[0].password,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getMe = async (req, res) => {
  try {
    const token = req.header('X-Token');
    const redisKey = `auth_${token}`;
    const userId = await redisClient.get(redisKey);

    if (!token || !userId) {
      return res.status(401).json({
        error: 'Unauthorized',
      });
    }
    return res.status(200).send(userId);
    // return res.status(200).json({
    //   id: userId,
    //   email: userId.email,
    // });
  } catch (error) {
    console.error('Error', error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};
