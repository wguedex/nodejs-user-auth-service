import config from "../config/config"; // Import the configuration settings
import MongoDBConfig from "../database/mongodb-config"; // Import the MongoDB configuration

import express, { Request, Response } from "express";

import cors from "cors";
 
class Server {
  private pathUsers = '/api/users'; // Define the path for user-related API endpoints
  private authPath = '/api/auth'; // Define the path for authentication-related API endpoints
  private app: express.Application; // Express application instance
  private port: number; // Port on which the server will listen

  constructor() {
    this.app = express(); // Create an Express application
    this.port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000; // Set the port from environment variables or default to 3000

    this.connectToDB(); // Establish a connection to the MongoDB database

    // Middlewares
    this.middlewares(); // Set up middleware functions

    this.configureRoutes(); // Configure the API routes
  }

  middlewares(): void {
    // CORS
    this.app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)

    // Reading and parsing the request body as JSON
    this.app.use(express.json());

    // Public directory
    this.app.use(express.static("public"));
  }

  private connectToDB(): void {
    const uri = config.mongodb.uri; // Get the MongoDB URI from the configuration
    const user = config.mongodb.user; // Get the MongoDB user from the configuration
    const password = config.mongodb.password; // Get the MongoDB password from the configuration
 
    // Check if uri, user, and password are defined
    if (uri && user && password) {
      // Create an instance of the MongoDBConfig class using environment variables
      const mongoConfig = new MongoDBConfig(uri, user, password);

      // Connect to the MongoDB database
      mongoConfig.connect();
    } else {
      console.error("MongoDB connection parameters are not defined."); // Log an error if MongoDB connection parameters are missing
    }
  }

  private configureRoutes(): void {
    this.app.use(this.pathUsers, require('../routes/user-routes')); // Configure the API routes for user-related endpoints using the 'users' route module
    this.app.use(this.authPath, require('../routes/auth-routes')); // Configure authentication routes
  }

  public startServer(): void {
    this.app.listen(this.port, () => {
      console.log(`Express server listening on port ${this.port}`); // Start the Express server and log the port it's listening on
    });
  }
}

export default Server;
