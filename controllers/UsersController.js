import sha1 from 'sha1';
import { dbClient } from '../utils/db';

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

    if (userExists === email) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const pHash = sha1(password);
    const newUser = {
      email,
      password: pHash,
    };
    const inserted = await dbClient.insertUser(newUser);
    return res.status(201).json({
      id: inserted.insertedId,
      email: inserted.email,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
