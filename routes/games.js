import express from 'express';
import gamesController from './gamesController.js';
import mgt2e from './games/mgt2e/mgt2e.js'
import lore from './games/lore.js'

const router = express.Router();


router.post('/', gamesController.create);
router.get('/', gamesController.getAll);
router.get('/:id', gamesController.getById);
router.get('/:id/characters', gamesController.getByIdWithCharacters);
router.get('/inclusive/:id', gamesController.getByIdWithAssociations);
router.put('/:id', gamesController.updateById);
router.delete('/:id', gamesController.deleteById);

router.use('/mgt2e', mgt2e)

export default router;
