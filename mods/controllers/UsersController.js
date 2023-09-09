const sha1 = require('sha1');
const dbClient = require('../utils/db');

class UsersController {
  static async createUser(req, res) {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }

    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    const userExists = await dbClient.userExist(email);
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password using SHA-1
    const hashedPassword = sha1(password);

    // Create a new user with email and hashed password
    const newUser = {
      email,
      password: hashedPassword, // Store the hashed password
    };

    // Insert the new user into the database
    const result = await dbClient.createUser(newUser);

    // Respond with the newly created user's email and MongoDB-generated ID
    const responseUser = {
      id: result.insertedId,
      email,
    };

    return res.status(201).json(responseUser);
  }
}

module.exports = UsersController;
