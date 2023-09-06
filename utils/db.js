import { MongoClient } from 'mongodb';

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 27017;
const DB_DATABASE = process.env.DB_DATABASE || 'file_manager';
const url = `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;

class DBClient {
  constructor() {
    // create a mongodb client
    this.client = new MongoClient(url,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

    // set connection to be false
    this.isConnected = false;

    // connect to db
    this.connect();
  }

  async connect() {
  // create a connection
    try {
      await this.client.connect();
      this.isConnected = true;
    } catch (error) {
      console.error('Error', error);
    }
  }

  isAlive() {
    // set up connection
    return this.isConnected;
  }

  async nbUsers() {
    // get number of docs in user collection
    try {
      const db = this.client.db(DB_DATABASE);
      const userCollection = db.collection('users');
      const count = await userCollection.countDocuments();
      return count;
    } catch (error) {
      console.error('Error', error);
      return -1;
    }
  }

  async nbFiles() {
    // get number of docs in files collection
    try {
      const db = this.client.db(DB_DATABASE);
      const filesCollection = db.collection('files');
      const fileCount = await filesCollection.countDocuments();
      return fileCount;
    } catch (error) {
      console.error('Error', error);
      return -1;
    }
  }
}

const dbClient = new DBClient();
export default dbClient;
