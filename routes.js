import express from 'express';

import featuresRouter from './routes/features.js';
import subdivisionsRouter from './routes/subdivisions.js';
import suggestionsRouter from './routes/suggestions.js';
import usersRouter from './routes/users.js';
import gamesRouter from './routes/games.js';
import sessionsRouter from './routes/sessions.js';
import contextsRouter from './routes/contexts.js';
import {authRouter} from './routes/auth/routes-auth-local.js';
import {siteRouter} from './routes/site/routes-site.js';
import profileRouter from './routes/profile.js';
import portraitRouter from './routes/portraits.js';

const router = express.Router();

authRouter(router)
siteRouter(router)


router.use('/api/portraits', portraitRouter);
router.use('/api/feature', featuresRouter);
router.use('/api/subdivision', subdivisionsRouter);
router.use('/api/suggestions', suggestionsRouter);
router.use('/api/contexts', contextsRouter);
router.use('/api/users', usersRouter);
router.use('/api/games', gamesRouter);
router.use('/api/sessions', sessionsRouter);
router.use('/api/Profiles', profileRouter);

export default router;
