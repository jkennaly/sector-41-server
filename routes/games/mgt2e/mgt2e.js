import express from 'express';
import chargen from './chargen/characters.js'

const router = express.Router();


router.use('/chargen', chargen)

export default router;
