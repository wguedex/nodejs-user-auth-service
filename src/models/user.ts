
import { Schema, model } from 'mongoose';

// Subschema to store information for each authentication provider
const AuthProviderSchema = new Schema({
  name: {
    type: String, // Provider name (e.g., 'google', 'facebook', 'twitter', etc.)
    required: true,
  },
  id: String, // Unique user identifier on the provider
  accessToken: String, // Provider's access token
});

// Define the main User schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: 2, // Minimum 2 characters
    maxlength: 50, // Maximum 50 characters
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true, // Trim whitespace around email
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Email format validation
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    enum: ['ADMIN_ROLE', 'USER_ROLE'],
  },
  status: {
    type: Boolean,
    default: true,
  },
  authProviders: [AuthProviderSchema], // Stores authentication information for multiple providers
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
  updatedBy: {
    type: String,
  },
});

// Define a method to transform the user object
UserSchema.methods.toJSON = function () {
  const { __v, password, _id, updatedAt, ...user } = this.toObject();
  user.id = _id;
  return user;
};

// Add an index on the "email" field for efficient searches
UserSchema.index({ email: 1 });

const User = model('User', UserSchema);
export default User;