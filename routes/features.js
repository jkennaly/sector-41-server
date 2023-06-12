import express from 'express';
import Feature from '../models/games/context/Feature.js';

const router = express.Router();


router.post('/', async (req, res) => {
    try {
        const user = req.user || { ftUserId: 0 };
        if(!user.ftUserId) throw new Error('No userId provided');
        const data = {
            ...req.body,
            creatorId: user.ftUserId,

        }
        const sub = await Feature.create(data);
        res.status(201).json(sub);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/universe/:universeId', async (req, res) => {
    try {
        const universeId = req.params.universeId;
        const features = await Feature.findAll({
            where: {
                universeId,
            }
        });

        res.status(200).json(features);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
