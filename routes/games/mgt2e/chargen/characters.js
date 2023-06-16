//Create routes for Characters
import express from 'express';
import charController from './charController.js';
import pdfController from './pdfController.js';
import ccController from './ccController.js';
import ssController from './ssController.js';

const router = express.Router();


router.post('/:characterId/cc/', ccController.create);
router.post('/:characterId/ss/', ssController.create);

router.post('/:characterId/pdf/portrait', pdfController.createPortrait);
router.post('/:characterId/pdf/', pdfController.create);
router.get('/:characterId/pdf/', pdfController.getAll);
router.get('/:characterId/pdf/:id', pdfController.getById);
router.get('/:characterId/pdf/inclusive/:id', pdfController.getByIdWithAssociations);
router.put('/:characterId/pdf/:id', pdfController.updateById);
router.delete('/:characterId/pdf/:id', pdfController.deleteById);

router.get('/pc/:gameId', charController.getPcByGameId);
router.get('/available/:gameId', charController.getAllByGameId);

router.post('/:gameId', charController.create);
router.get('/', charController.getAll);
router.get('/:id', charController.getById);
router.get('/inclusive/:id', charController.getByIdWithAssociations);
router.put('/:id', charController.updateById);
router.delete('/:id', charController.deleteById);

export default router;
