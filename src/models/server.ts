/**
 * Server Class
 *
 * This class is responsible for setting up and running the Express server.
 * It includes methods for initializing middleware, configuring routes,
 * connecting to the MongoDB database, and starting the server.
 *
 * Usage:
 * Create an instance of the Server class and call the 'startServer' method
 * to begin listening for requests.
 */

import config from "../config/config"; // Import the configuration settings
import MongoDBConfig from "../database/mongodb-config"; // Import the MongoDB configuration
import express, { Request, Response } from "express";
import cors from "cors";

class Server {
  private pathUsers = "/api/users"; // Define the path for user-related API endpoints
  private authPath = "/api/auth"; // Define the path for authentication-related API endpoints
  private app: express.Application; // Express application instance
  private port: number; // Port on which the server will listen

  /**
   * Server constructor.
   *
   * Initializes the Express application and sets up various configurations including
   * the server port, middlewares, API routes, and establishes a connection to the MongoDB database.
   */
  constructor() {
    this.app = express(); // Create an Express application
    this.port = config.port; // Set the port from environment variables or default to 3000

    // Middlewares (configure middlewares first)
    this.middlewares(); // Set up middleware functions

    // Configure the API routes (configure routes after middlewares)
    this.configureRoutes(); // Configure the API routes

    this.connectToDB(); // Establish a connection to the MongoDB database
  }

  /**
   * Set up middlewares for the Express application.
   *
   * This method configures all the necessary middlewares for the server, such as
   * CORS for cross-origin requests, JSON body parsing for incoming requests, and
   * serving static files from the 'public' directory.
   */
  middlewares(): void {
    // CORS
    this.app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)

    // Reading and parsing the request body as JSON
    this.app.use(express.json());

    // Public directory
    this.app.use(express.static("public"));
  }

  /**
   * Connect to MongoDB Database
   *
   * This method attempts to connect to the MongoDB database using the configuration
   * parameters. It validates the connection parameters and handles any connection
   * errors, ensuring that the application does not fail silently.
   */
  private connectToDB(): void {
    const uri = config.mongodb.uri; // Get the MongoDB URI from the configuration
    const user = config.mongodb.user; // Get the MongoDB user from the configuration
    const password = config.mongodb.password; // Get the MongoDB password from the configuration

    // Check if the necessary MongoDB connection parameters are defined
    if (uri && user && password) {
      // Create an instance of the MongoDBConfig class using the connection parameters
      const mongoConfig = new MongoDBConfig(uri, user, password);

      // Attempt to connect to the MongoDB database
      mongoConfig
        .connect()
        .then(() => {
          console.log("Successfully connected to MongoDB.");
        })
        .catch((error) => {
          // Handle any MongoDB connection errors
          console.error("Failed to connect to MongoDB:", error);

          // Terminate the process with an error code in case of connection failure
          process.exit(1);
        });
    } else {
      // Log an error and terminate the process if connection parameters are missing
      console.error("MongoDB connection parameters are not defined.");
      process.exit(1);
    }
  }

  /**
   * Configure API routes.
   *
   * Sets up the routes for the Express application, defining the endpoints for
   * different functionalities, such as user-related and authentication routes.
   */
  private configureRoutes(): void {
    this.app.use(this.pathUsers, require("../routes/user-routes")); // Configure the API routes for user-related endpoints using the 'users' route module
    this.app.use(this.authPath, require("../routes/auth-routes")); // Configure authentication routes
  }

  /**
   * Start the Express server.
   *
   * Begins listening for incoming requests on the configured port. This method
   * should be called after all configurations, including middlewares and routes,
   * have been set up.
   */
  public startServer(): void {
    this.app.listen(this.port, () => {
      console.log(`Express server listening on port ${this.port}`); // Start the Express server and log the port it's listening on
    });
  }
}

export default Server;
