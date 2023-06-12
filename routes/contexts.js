import express from 'express';
import contextsController from './contextsController.js';
import sessionsController from './sessionsController.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello from contexts');
})
router.post('/', contextsController.create);
router.get('/games/:id', contextsController.getGameContext);
router.put('/:id', contextsController.updateById);

router.post('/features', sessionsController.create);
router.get('/features', sessionsController.getAll);
router.get('/features/:id', sessionsController.getById);
router.put('/features/:id', sessionsController.updateById);
router.delete('/features/:id', sessionsController.deleteById);

router.post('/subdivisions', sessionsController.create);
router.get('/subdivisions', sessionsController.getAll);
router.get('/subdivisions/:id', sessionsController.getById);
router.put('/subdivisions/:id', sessionsController.updateById);
router.delete('/subdivisions/:id', sessionsController.deleteById);


export default router;
