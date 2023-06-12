import express from 'express';
import portraitsController from './portraitsController.js';

const router = express.Router();


router.get('/:id', portraitsController.getById);

export default router;
