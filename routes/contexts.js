import express from 'express';
import contextsController from './contextsController.js';

const router = express.Router();

router.post('/', contextsController.create);
router.get('/games/:id', contextsController.getGameContext);
router.put('/:id', contextsController.updateById);


export default router;
