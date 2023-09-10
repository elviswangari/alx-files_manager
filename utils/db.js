import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    // Define MongoDB connection parameters based on environment variables or defaults.
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    // Construct the MongoDB connection URL.
    this.url = `mongodb://${host}:${port}/${database}`;

    // Create a MongoDB client instance with necessary options.
    this.client = new MongoClient(this.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Initialize the connection status to false.
    this.isConnected = false;

    // Attempt to establish the connection to MongoDB.
    this.connect();
  }

  async connect() {
    try {
      // Try to connect to Redis.
      await this.client.connect();
      // Set the connection status to true upon success.
      this.isConnected = true;
    } catch (error) {
      // Handle connection errors and set the connection status to false.
      console.error('Error connecting to MongoDB:', error);
      this.isConnected = false;
    }
  }

  // Function to check if the connection to MongoDB is successful.
  isAlive() {
    return this.isConnected;
  }

  // Asynchronous function to get the number of documents in the "users" collection.
  async nbUsers() {
    try {
      const db = this.client.db();
      const userCollection = db.collection('users');
      const count = await userCollection.countDocuments();
      return count;
    } catch (error) {
      // Handle errors and return -1 as a default value.
      console.error('Error:', error);
      return -1;
    }
  }

  // Asynchronous function to get the number of documents in the "files" collection.
  async nbFiles() {
    try {
      const db = this.client.db();
      const filesCollection = db.collection('files');
      const fileCount = await filesCollection.countDocuments();
      return fileCount;
    } catch (error) {
      // Handle errors and return -1 as a default value.
      console.error('Error:', error);
      return -1;
    }
  }

  // find user in db
  async getUser(key) {
    try {
      const db = this.client.db();
      const userCollection = db.collection('users');
      const user = await userCollection.findOne({ email: key });
      return user.email;
    } catch (error) {
      console.error('Error user not found', error);
      return -1;
    }
  }

  // insert user in db
  async insertUser(user) {
    try {
      const db = this.client.db();
      const userCollection = db.collection('users');
      const results = await userCollection.insertOne(user);
      return results;
    } catch (error) {
      console.error('Error failed to insert into the db', error);
      return -1;
    }
  }
}
// Create an instance of DBClient and export it for use in other modules.
export const dbClient = new DBClient();
export default dbClient;
