import mongoose, { Connection } from "mongoose";

// MongoDBConfig class for handling database connections
class MongoDBConfig {
    
  private uri: string;
  private connection: Connection;

  // Constructor to initialize the MongoDBConfig instance
  constructor(uri: string, user: string, password: string) {

    // Build the MongoDB URI with the provided user and password
    this.uri = `mongodb://${user}:${password}@${uri}`;
    this.connection = mongoose.connection;

  }

  // Asynchronous method to connect to the MongoDB database
  public async connect(): Promise<void> {

    try {
      await mongoose.connect(this.uri);
      console.log("MongoDB connected");
    } catch (error) {
      console.error("MongoDB connection error:", error);
    }

  }

  // Asynchronous method to disconnect from the MongoDB database
  public async disconnect(): Promise<void> {

    try {
      await mongoose.connection.close();
      console.log("MongoDB disconnected");
    } catch (error) {
      console.error("MongoDB disconnection error:", error);
    }

  }

  // Method to get the active database connection
  public getConnection(): Connection {
    return this.connection;
  }
}

export default MongoDBConfig; // Export the MongoDBConfig class
