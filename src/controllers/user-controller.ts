// Import the 'User' model from '../models/user'.
import User from "../models/user-model";

// Import the 'bcryptjs' library for password hashing.
import bcryptjs from 'bcryptjs';

// Import the 'request' and 'response' objects from the 'express' library.
import { request, response } from "express";

// Define an asynchronous function 'getUsers' to handle user retrieval.
export const getUsers = async (req = request, res = response) => {
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
export const getUserById = async (req = request, res = response) => {
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
export const createUser = async (req = request, res = response) => {
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

export const updateUser = async (req = request, res = response) => {
  try {
    const userId = req.params.id; // Extract the user ID from the request parameters.
    const updateData = req.body; // Get the update data from the request body.

    if (!userId) {
      // If the user ID is not provided, return a 401 (Unauthorized) response.
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Set the 'updatedAt' field to the current date and 'updatedBy' to the user's ID.
    updateData.updatedAt = new Date();
    updateData.updatedBy = userId;

    // Use 'User.findByIdAndUpdate' to update the user with the specified ID and retrieve the updated user.
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

    if (!updatedUser) {
      // If the user is not found, return a 404 (Not Found) response.
      return res.status(404).json({ error: 'User not found' });
    }

    // Return a 200 (OK) response with the updated user data.
    res.status(200).json(updatedUser);

  } catch (error) {
    // If an error occurs during the update process, return a 500 (Internal Server Error) response.
    res.status(500).json({ error: 'Error updating user by ID' });
  }
};

export const deleteUser = async (req = request, res = response) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      // If the user ID is not provided, return a 401 (Unauthorized) response.
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Perform a soft delete by updating the 'status' field to false.
    const updatedUser = await User.findByIdAndUpdate(userId, { status: false }, { new: true });

    if (!updatedUser) {
      // If the user is not found, return a 404 (Not Found) response.
      return res.status(404).json({ error: 'User not found' });
    }

    // Return a 200 (OK) status with the updated user (marked as inactive).
    res.status(200).json(updatedUser);

  } catch (error) {
    // If an error occurs during the soft delete, return a 500 (Internal Server Error) response.
    res.status(500).json({ error: 'Error deleting user by ID' });
  }
};


// // Export the 'getUsers', 'getUserById', and 'createUser' functions for use in other modules.
// module.exports = {
//   getUsers,
//   getUserById,
//   createUser, 
//   updateUser, 
//   deleteUser
// };
