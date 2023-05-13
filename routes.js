import express from 'express';

import usersRouter from './routes/users.js';
import gamesRouter from './routes/games.js';
import {authRouter} from './routes/auth/routes-auth-local.js';
import {siteRouter} from './routes/site/routes-site.js';
import profileRouter from './routes/profile.js';

const router = express.Router();

authRouter(router)
siteRouter(router)

router.use('/api/users', usersRouter);
router.use('/api/games', gamesRouter);
router.use('/api/Profiles', profileRouter);

export default router;
