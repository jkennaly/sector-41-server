//Create routes for Characters
import express from 'express';
import charController from './charController.js';
import pdfController from './pdfController.js';
import ccController from './ccController.js';
import ssController from './ssController.js';
import lpController from './lpController.js';

const router = express.Router();


router.put('/:characterId/cc/:characteristic/:amount', ccController.changeCharacteristic);
router.post('/:characterId/cc/', ccController.create);
router.post('/:characterId/ss/', ssController.create);
router.post('/:characterId/lp/', lpController.create);
router.put('/:characterId/lp/:term/:field', lpController.termChanges);
router.get('/:characterId/lp/', lpController.getByCharId);

router.post('/:characterId/pdf/portrait', pdfController.createPortrait);
router.post('/:characterId/pdf/', pdfController.create);
router.get('/:characterId/pdf/', pdfController.getAll);
router.get('/:characterId/pdf/:id', pdfController.getById);
router.get('/:characterId/pdf/inclusive/:id', pdfController.getByIdWithAssociations);
router.put('/:characterId/pdf/:id', pdfController.updateById);
router.delete('/:characterId/pdf/:id', pdfController.deleteById);

router.get('/pc/:gameId', charController.getPcByGameId);
router.get('/available/:gameId', charController.getAllByGameId);


router.post('/:characterId/assoc/', charController.createAssoc);
router.post('/:gameId', charController.create);
router.get('/', charController.getAll);
router.get('/:id', charController.getById);
router.get('/inclusive/:id', charController.getByIdWithAssociations);
router.put('/:id', charController.updateById);
router.delete('/:id', charController.deleteById);

export default router;
