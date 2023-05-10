import express from 'express';
import gamesController from './gamesController.js';

const router = express.Router();


router.post('/', gamesController.create);
router.get('/', gamesController.getAll);
router.get('/:id', gamesController.getById);
router.put('/:id', gamesController.updateById);
router.delete('/:id', gamesController.deleteById);

export default router;
