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
    this.client.connect((error) => {
      if (error) {
        console.log('db error', error);
      } else {
        this.isConnected = true;
      }
    });
  }

  isAlive() {
    // set up connection
    return this.isConnected;
  }

  async nbUsers() {
    // get number of docs in user collection
    const userCollection = await this.client.users.find({})
      .toArray().length;
    return userCollection;
  }

  async nbFiles() {
    // get number of docs in files collection
    const filesCollection = await this.client.files.find({})
      .toArray().length;
    return filesCollection;
  }
}

const dbClient = new DBClient();
export default dbClient;
