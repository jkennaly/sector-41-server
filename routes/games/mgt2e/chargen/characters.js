//Create routes for Characters
import express from 'express';
import charController from './charController.js';

const router = express.Router();


router.post('/:gameId', charController.create);
router.get('/', charController.getAll);
router.get('/:id', charController.getById);
router.get('/inclusive/:id', charController.getByIdWithAssociations);
router.put('/:id', charController.updateById);
router.delete('/:id', charController.deleteById);

export default router;
