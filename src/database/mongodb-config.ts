/**
 * MongoDB Configuration and Connection Handler
 *
 * This class 'MongoDBConfig' is responsible for managing the MongoDB database connections.
 * It provides methods to connect to and disconnect from the database, and to retrieve the 
 * active database connection.
 *
 * Methods:
 * - connect: Establishes a connection to the MongoDB database.
 * - disconnect: Closes the connection to the MongoDB database.
 * - getConnection: Returns the active database connection object.
 */


import mongoose, { Connection } from "mongoose";

// MongoDBConfig class for handling database connections
class MongoDBConfig {
    
  private uri: string;
  private connection: Connection;

  // Constructor to initialize the MongoDBConfig instance
  // Builds the MongoDB connection URI using the provided credentials
  constructor(uri: string, user: string, password: string) {
    
    // Build the MongoDB URI with the provided user and password
    this.uri = `mongodb://${user}:${password}@${uri}`; // Construct the MongoDB connection URI
    this.connection = mongoose.connection; // Set the connection object to the Mongoose default connection

  }

  // Asynchronous method to connect to the MongoDB database
  // Attempts to establish a connection and logs the status
  public async connect(): Promise<void> {
    try {  

      await mongoose.connect(this.uri);
      console.log("MongoDB connected");
    } catch (error) {

      // Captures and logs specific MongoDB connection errors for better debugging
      if (error instanceof Error) {

        const errorMessage = error.message as string;

        if (/authentication failed/i.test(errorMessage)) {
          console.error("Authentication failed. Check your MongoDB credentials.");
        } else {
          console.error("MongoDB connection error:", errorMessage);
        }

      } else {
        console.error("Unexpected error:", error);
      }
    }

  }

  // Asynchronous method to disconnect from the MongoDB database
  // Closes the connection and logs the disconnection status
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
    return this.connection; // Returns the active database connection object
  }
}

export default MongoDBConfig; // Export the MongoDBConfig class
