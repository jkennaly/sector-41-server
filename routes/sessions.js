import express from 'express';
import sessionsController from './sessionsController.js';

const router = express.Router();


router.post('/', sessionsController.create);
router.get('/', sessionsController.getAll);
router.get('/:id', sessionsController.getById);
router.put('/:id', sessionsController.updateById);
router.delete('/:id', sessionsController.deleteById);

export default router;
