const { MongoClient, ObjectID } = require('mongodb');
const { pwdHashed } = require('./utils');

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    this.database = process.env.DB_DATABASE || 'files_manager';
    const dbUrl = `mongodb://${host}:${port}`;

    this.client = new MongoClient(dbUrl, { useUnifiedTopology: true });
    this.connected = false;

    this.connect();
  }

  async connect() {
    try {
      await this.client.connect();
      this.connected = true;
    } catch (err) {
      console.error('Error connecting to MongoDB:', err.message);
      this.connected = false;
    }
  }

  isAlive() {
    return this.connected;
  }

  async nbUsers() {
    const usersCollection = this.client.db(this.database).collection('users');
    return usersCollection.countDocuments();
  }

  async nbFiles() {
    const filesCollection = this.client.db(this.database).collection('files');
    return filesCollection.countDocuments();
  }

  async createUser(email, password) {
    const hashedPwd = pwdHashed(password);
    const usersCollection = this.client.db(this.database).collection('users');
    const result = await usersCollection.insertOne({ email, password: hashedPwd });
    return result.ops[0];
  }

  async getUser(email) {
    const usersCollection = this.client.db(this.database).collection('users');
    return usersCollection.findOne({ email });
  }

  async getUserById(id) {
    const usersCollection = this.client.db(this.database).collection('users');
    return usersCollection.findOne({ _id: new ObjectID(id) });
  }

  async userExist(email) {
    const usersCollection = this.client.db(this.database).collection('users');
    const user = await usersCollection.findOne({ email });
    return !!user;
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
