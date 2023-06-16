import express from 'express';
import routes from './routes.js';
import sequelize from './db/sequelize.js';
import { createConnection } from './middleware/get-db-conn.js';
import { authCheck } from './middleware/auth-check.js';
import { getUserId } from './middleware/get-user-id.js';
import { verifyUserId } from './middleware/verify-user-id.js';
import { getAccessToken } from './middleware/gt-access-token.js';
import boot from './boot.js';
import cookieParser from 'cookie-parser';
import unless from 'express-unless';
import cors from 'cors'
import dotenv from 'dotenv';
dotenv.config();

const corsOptions = {
  origin: [
      process.env.CLIENT_DOMAIN,
      process.env.COLYSEUS_DOMAIN,
  ],
  credentials: true,
  maxAge: 86400
};

import { fileURLToPath } from 'url';
import path from 'path';
const { dirname, join } = path;

const app = express();
const PORT = process.env.PORT || 3000;

// Calculate the directory path of the current module
const __dirname = dirname(fileURLToPath(import.meta.url));

// Connect to the database server
sequelize
  .authenticate()
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('Unable to connect to the database:', err));

// Create the database if it does not exist and synchronize the model(s)
sequelize.sync()
  .then(() => console.log('Database synchronized'))
  .catch((err) => console.error('Unable to synchronize the database:', err));
  
  // Call the "get-db-conn" middleware before the "auth-check" middleware
  (async () => {
    await boot(app);
    // Parse URL-encoded form data

  
  app.use(cors(corsOptions));
    app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  
  app.use(createConnection());

  app.use(cookieParser());

// Custom middleware to extract token from cookie and pass it to express-jwt
app.use((req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    // Token is already provided in the Authorization header
    return next();
  }

  if (req.params && req.params.token) {
    // Extract token from cookie and set it in the Authorization header
    req.headers.authorization = `Bearer ${req.params.token}`;
    console.log('Token extracted from params and set in the Authorization header', req.headers.authorization);
  }

  
  next();
});
  authCheck.unless = unless;
  app.use(authCheck.unless({
    path: [
      '/api/Profiles/getUserId',
      '/api/Profiles/getAccessToken',
      '/authorize/refresh'
    ]
  }));
  // app.use((req, res, next) => {
  //   //log request recvd and route
  //   console.log('Request received!', req.originalUrl, req.user );
  //   next();
  // })
  
  // Call the "get-user-id" middleware for the specified paths
  app.use('/api/Profiles/getUserId*', getUserId());
  
  // Call the "verify-user-id" middleware for all other paths under the "/api" route
  app.use('/api', verifyUserId());
  
  // Call the "get-access-token" middleware after all other middleware has run
  app.use(getAccessToken());
  
app.use(routes);

// Serve static files
const staticPath = path.join(__dirname, 'static');
app.use(express.static(staticPath, {
  setHeaders: (res, filePath) => {
    if (path.extname(filePath) === '.jpg') {
      res.set('Content-Type', 'image/jpeg');
    }
  }
}));

// Serve static files from the 'public' directory
app.use(express.static(join(__dirname, 'routes', 'views', 'public')));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

  })()