import express from 'express';
import gamesController from './gamesController.js';

const router = express.Router();


router.post('/', gamesController.create);
router.get('/', gamesController.getAll);
router.get('/:id', gamesController.getById);
router.get('/inclusive/:id', gamesController.getByIdWithAssociations);
router.put('/:id', gamesController.updateById);
router.delete('/:id', gamesController.deleteById);

export default router;
