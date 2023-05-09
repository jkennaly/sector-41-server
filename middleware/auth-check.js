// server/middleware/auth-check.js

import jwt from 'express-jwt';
import jwks from 'jwks-rsa';
import dotenv from "dotenv"

if (process.env.NODE_ENV !== "production") {
  dotenv.config()
}

export const authCheck = (req, res, next) =>
  jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `${req.protocol}://${req.hostname}:${
        process.env.PORT || 8080
      }/keys`,
    }),
    audience: "https://festigram.app/api/",
    issuer: "https://festigram.app",
    algorithms: ["RS256"],
    credentialsRequired: false,
  })(req, res, next);
