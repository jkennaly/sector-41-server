import express from 'express';
import loreController from './loreController.js';

const router = express.Router();


router.post('/', loreController.create);
router.get('/', loreController.getAll);
router.get('/:id', loreController.getById);
router.put('/:id', loreController.updateById);
router.delete('/:id', loreController.deleteById);


export default router;
