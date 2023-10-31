// Import necessary modules and classes
import config from "../src/configs/configs"; // Import the configuration object
import MongoDBConfig from "../src/databases/MongoDBConfig"; // Import the MongoDB configuration class

// Log the configuration object for debugging purposes
console.log(config);

// Access environment variables loaded from .env file
const uri = config.mongodb.uri; // Get the MongoDB URI
const user = config.mongodb.user; // Get the MongoDB user
const password = config.mongodb.password; // Get the MongoDB password

// Check if uri, user, and password are defined
if (uri && user && password) {
  // Create an instance of the MongoDBConfig class using environment variables
  const mongoConfig = new MongoDBConfig(uri, user, password);

  // Connect to the MongoDB database
  mongoConfig.connect();

  // Disconnect to the MongoDB database
  mongoConfig.disconnect();
} else {
  console.error("MongoDB connection parameters are not defined.");
}
