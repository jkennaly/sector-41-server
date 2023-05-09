import express from 'express';
import standardRoutes from './standardRoutes.js';

const router = express.Router();

router.use('/games', standardRoutes);

export default router;
