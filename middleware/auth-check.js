// server/middleware/auth-check.js

import { expressjwt as jwt } from 'express-jwt';
import jwks from 'jwks-rsa';
import dotenv from "dotenv"

import jwtDecode from 'jsonwebtoken';

if (process.env.NODE_ENV !== "production") {
  dotenv.config()
}

// Create a JWKS client
const jwksClient = jwks({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
  jwksUri: `http://localhost:3000/keys`,
});

// Middleware to fetch the signing key from JWKS and verify the token
export const authCheck = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token) {
    jwtDecode.verify(token, getKey, (err, decoded) => {
      if (err) {
        // Token verification failed
      console.log('auth-check', err, decoded)
        return res.status(401).json({ error: 'Unauthorized' });
      }
      req.user = decoded;
      next();
    });
  } else {
    // No token provided
    next()
  }
};

// Function to fetch the signing key from JWKS
const getKey = (header, callback) => {
  jwksClient.getSigningKey(header.kid, (err, key) => {
    if (err) {
      callback(err);
    } else {
      const signingKey = key.publicKey || key.rsaPublicKey;
      callback(null, signingKey);
    }
  });
};

// export const authCheck = (req, res, next) =>
//   jwt({
//     secret: getKey,
//     audience: "https://0441.design/api/",
//     issuer: "https://0441.design",
//     algorithms: ["RS256"],
//     credentialsRequired: false,
//   })(req, res, next);
