// Import the 'User' model from '../models/user'.
import User from "../models/user";

// Import the 'bcryptjs' library for password hashing.
import bcryptjs from 'bcryptjs';

// Import the 'request' and 'response' objects from the 'express' library.
import { request, response } from "express";

// Define an asynchronous function 'getUsers' to handle user retrieval.
const getUsers = async (req = request, res = response) => {
  try {
    // Extract query parameters 'limit' and 'from' from the request.
    const { limit = 5, from = 0 } = req.query;

    // Define a query to find users with 'status' set to true.
    const query = { status: true };

    // Use Promise.all to execute multiple asynchronous operations concurrently.
    const [total, users] = await Promise.all([
      // Count the total number of users that match the query.
      User.countDocuments(query),

      // Find users that match the query, with pagination using 'limit' and 'from'.
      User.find(query).skip(Number(from)).limit(Number(limit)),
    ]);

    // Respond with JSON containing the total count and the retrieved users.
    res.json({
      total,
      users,
    });
  } catch (error) {
    // Handle errors by logging and sending a 500 Internal Server Error response.
    console.error("Error getting users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Define an asynchronous function 'getUserById' to retrieve a user by ID.
const getUserById = async (req = request, res = response) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error getting user by ID" });
  }
};

// Define an asynchronous function 'createUser' to create a new user.
const createUser = async (req = request, res = response) => {
  try {
    const userData = req.body;

    const newUser = new User(userData);

    // Generate a salt and hash the user's password using 'bcryptjs'.
    const salt = bcryptjs.genSaltSync();
    newUser.password = bcryptjs.hashSync(newUser.password, salt);

    // Save the user to the database. 
    await newUser.save();

    // Respond with a 201 status for successful creation.
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
};

// Export the 'getUsers', 'getUserById', and 'createUser' functions for use in other modules.
module.exports = {
  getUsers,
  getUserById,
  createUser
};
