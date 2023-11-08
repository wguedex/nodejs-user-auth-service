// Import the 'dotenv' library to handle environment variables.
import * as dotenv from "dotenv";
 
dotenv.config();
 
// Define a configuration object with MongoDB connection details.
const config = {
  mongodb: {
    uri: process.env.MONGODB_URI || "",           // MongoDB URI
    user: process.env.MONGODB_USER || "",          // MongoDB username
    password: process.env.MONGODB_PASSWORD || "", // MongoDB password (empty for now)
  },
  PRIVATEKEYSECRET : process.env.PRIVATEKEYSECRET || ""
};

// Export the 'config' object to make it available for other modules.
export default config;
