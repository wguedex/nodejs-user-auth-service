// Import the 'jsonwebtoken' library for generating JSON Web Tokens (JWT).
import jwt from 'jsonwebtoken'; 

// Import the configuration settings, which likely contain a secret key.
import config from "../configs/configs";



// Define a function for generating a JSON Web Token (JWT) with a given 'uid'.
const generateJWT = (uid: string) => {
    return new Promise((resolve, reject) => {
        // Create a payload containing the user ID.
        const payload = { uid };

        // Sign the payload to generate a JWT, using the private key from the configuration.
        jwt.sign(payload, config.PRIVATEKEYSECRET, {
            expiresIn: '4h' // Set the token expiration time to 4 hours.
        }, (err, token) => {
            if (err) {
                console.log(err);
                // If an error occurs during token generation, reject the promise.
                reject('The token could not be generated.');
            } else {
                // If the token is successfully generated, resolve the promise with the token.
                resolve(token);
            }
        });
    });
}

// Export the 'generateJWT' function for use in other parts of the application.
export default generateJWT;
