import express from 'express';
import usersController from './usersController.js';

const router = express.Router();


router.post('/', usersController.create);
router.get('/', usersController.getAll);
router.get('/:id', usersController.getById);
router.put('/:id', usersController.updateById);
router.delete('/:id', usersController.deleteById);

export default router;
