/**
 * Application Entry Point
 * 
 * This 'app.ts' file acts as the main entry point for the application. 
 * Here, the 'Server' class from the './models/server' module is imported 
 * and instantiated, followed by starting the server. This file is responsible 
 * for setting up and launching the application, serving as the initial contact 
 * between the application and the runtime environment.
 *
 * Usage:
 * This file is executed to start the server and the application. It does not require 
 * any additional parameters and expects all necessary configurations to be defined 
 * in the 'Server' module or in separate configuration files.
 *
 * Important:
 * - The 'Server' class must be correctly configured for the application to function properly.
 * - This file may require modifications if the server configuration or initialization 
 *   requirements change.
 */
 
// Import the 'Server' class from the './models/server' module.
import Server from './models/server';

// Create an instance of the server.
const server = new Server();

try {
    // Attempt to start the server
    server.startServer();
} catch (error) {
    // Log the error and provide a clear message
    console.error('Failed to start the server:', error);

    // Optional: Additional actions like retry mechanisms, logging to a file, etc.
    // Terminate the process with an error code
    process.exit(1); 
}
