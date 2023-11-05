// Import configuration settings from the 'configs' module.
import config from "../src/configs/configs";

// Import the 'MongoDBConfig' class to set up MongoDB configuration.
import MongoDBConfig from "../src/databases/MongoDBConfig";

// Import the 'User' model for working with user data.
import User from "../src/models/user";

// Import the 'bcrypt' library for password hashing.
import bcrypt from 'bcrypt';

// Log the 'config' object to the console for reference.
console.log(config);

// Extract MongoDB connection details from the 'config' object.
const uri = config.mongodb.uri;
const user = config.mongodb.user;
const password = config.mongodb.password;

// Check if MongoDB connection parameters are defined.
if (uri && user && password) {
  // Create a new instance of 'MongoDBConfig' with connection details.
  const mongoConfig = new MongoDBConfig(uri, user, password);

  // Asynchronous function to create and save a user.
  const createAndSaveUser = async () => {
    // Connect to the MongoDB database.
    await mongoConfig.connect();

    // Create a new user object with sample data.
    const newUser = new User({
      name: "Test User",
      email: "test3@example.com",
      password: "testpassword",
      role: "USER_ROLE",
    });

    try {
      // Set the number of salt rounds for password hashing.
      const saltRounds = 10;

      // Hash the user's password using 'bcrypt'.
      const hash = await bcrypt.hash(newUser.password, saltRounds);
      newUser.password = hash;

      // Save the user in the database.
      await newUser.save();

      console.log("User created:", newUser);
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      // Close the MongoDB connection after the operations are done.
      console.log("Disconnected from MongoDB");
      await mongoConfig.disconnect();
    }
  };

  createAndSaveUser(); // Call the function to create and save the user.
} else {
  console.error("MongoDB connection parameters are not defined.");
}
