import { createUser } from '../../src/controllers/user-controller';
import User from '../../src/models/user-model';
import bcryptjs from 'bcryptjs';
import { Request, Response } from 'express';

// Mock bcryptjs to avoid real password hashing in tests
jest.mock('bcryptjs', () => ({
  genSaltSync: jest.fn().mockReturnValue('random-salt'),
  hashSync: jest.fn().mockReturnValue('hashed-password')
}));

// Define the structure of the request body
interface RequestBody {
  name: string;
  email: string;
  password: string;
  img?: string;
  role: 'ADMIN_ROLE' | 'USER_ROLE';
  status?: boolean;
  google?: boolean;
  authProviders?: {
    name: string;
    id?: string;
    accessToken?: string;
  }[];
  createdAt?: Date;
  updatedAt?: Date;
  updatedBy?: string;
}

// Sample new user data for testing
const newUser: RequestBody = {
  name: 'John Doe',
  email: 'johndoe@example.com',
  password: 'securepassword',
  role: 'USER_ROLE'
};

// Function to mock Express request with given body
const mockRequest = (body: RequestBody) => ({ body }) as Request;

// Function to mock Express response
const mockResponse = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as Response;
};

// Test suite for UserController
describe('UserController', () => {
  // Clear all mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Group of tests for createUser function
  describe('createUser', () => {
    // Test case for successful user creation
    it('should create a new user successfully', async () => {
      const req = mockRequest(newUser);
      const res = mockResponse();

      // Mock successful case for User.save method
      jest.spyOn(User.prototype, 'save').mockResolvedValueOnce({ ...newUser, _id: 'some-random-id' });

      await createUser(req, res);

      // Assert response status and body
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expect.anything());
    });

    // Test case for handling errors during user creation
    it('should handle database save error', async () => {
      const req = mockRequest(newUser);
      const res = mockResponse();

      // Mock failure case for User.save method
      jest.spyOn(User.prototype, 'save').mockRejectedValueOnce(new Error('Error saving to the database'));

      await createUser(req, res);

      // Assert response status and error message
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Error creating user" });
    });
  });
});
