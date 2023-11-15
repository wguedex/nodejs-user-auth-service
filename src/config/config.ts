/**
 * Configuration Settings
 *
 * This file defines the configuration settings for the application, 
 * including server port, database connections, and other environment 
 * dependent variables. It uses the 'dotenv' library to load configurations 
 * from the environment variables.
 *
 * Important:
 * - Ensure that all required environment variables are set in the '.env' file 
 *   or in the environment settings.
 * - Do not include sensitive data or the '.env' file in version control.
 *
 * Usage:
 * Import this configuration object into other modules to access the 
 * application settings.
 */

// Import the 'dotenv' library to handle environment variables.
import * as dotenv from "dotenv";
 
dotenv.config();
 
// Define a configuration object with MongoDB connection details.
const config = {
  port : process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  mongodb: {
    uri: process.env.MONGODB_URI,           // MongoDB URI
    user: process.env.MONGODB_USER,         // MongoDB username
    password: process.env.MONGODB_PASSWORD, // MongoDB password (empty for now)
  },
  PRIVATEKEYSECRET : process.env.PRIVATEKEYSECRET || ""
};

// Validation for MongoDB URI
if (!config.mongodb.uri) {
  throw new Error("MongoDB URI is required. Please configure it in the environment variables.");
}

// Validation for MongoDB User
if (!config.mongodb.user) {
  console.warn("MongoDB User is not set. Ensure it's set if authentication is required.");
}

//Validation for MongoDB Password  
if (!config.mongodb.password) {
  console.warn("MongoDB Password is not set. Ensure it's set if authentication is required.");
}

// Validation for Port
if (!config.port) {
  throw new Error("Server port is not defined. Please set a valid port in the environment variables.");
}

// Validation for Private Key Secret
if (!config.PRIVATEKEYSECRET) {
  throw new Error("Private key secret is required for secure operations. Please set it in the environment variables.");
}

// Export the 'config' object to make it available for other modules.
export default config;
