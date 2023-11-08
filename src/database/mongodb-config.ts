import mongoose, { Connection } from "mongoose";

// MongoDBConfig class for handling database connections
class MongoDBConfig {
    
  private uri: string;
  private connection: Connection;

  // Constructor to initialize the MongoDBConfig instance
  constructor(uri: string, user: string, password: string) {
    
    // Build the MongoDB URI with the provided user and password
    this.uri = `mongodb://${user}:${password}@${uri}`; // Construct the MongoDB connection URI
    this.connection = mongoose.connection; // Set the connection object to the Mongoose default connection

  }

  // Asynchronous method to connect to the MongoDB database
  public async connect(): Promise<void> {

    try {
      await mongoose.connect(this.uri ); // Connect to MongoDB using the constructed URI
      console.log("MongoDB connected"); // Log a message when the connection is successful
 
    } catch (error) {
      console.error("MongoDB connection error:", error); // Log an error message if the connection fails
    }

  }

  // Asynchronous method to disconnect from the MongoDB database
  public async disconnect(): Promise<void> {

    try {
      await mongoose.connection.close(); // Close the MongoDB connection
      console.log("MongoDB disconnected"); // Log a message when the disconnection is successful
    } catch (error) {
      console.error("MongoDB disconnection error:", error); // Log an error message if the disconnection fails
    }

  }

  // Method to get the active database connection
  public getConnection(): Connection {
    return this.connection; // Return the active database connection
  }
}

export default MongoDBConfig; // Export the MongoDBConfig class
