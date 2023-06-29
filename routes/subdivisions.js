import express from 'express';
import Subdivision from '../models/games/context/location/Subdivision.js';

const router = express.Router();


router.put('/:id', async (req, res) => {
    try {
        const user = req.user || { ftUserId: 0 };
        if(!user.ftUserId) throw new Error('No userId provided');
        const sub = await Subdivision.findByPk(req.params.id);
        if(!sub) throw new Error('No subdivision found');
        const data = {
            ...sub,
            ...req.body,
            creatorId: user.ftUserId,

        }
        await sub.update(data);
        sub.save()

        res.status(201).json(sub);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const user = req.user || { ftUserId: 0 };
        if(!user.ftUserId) throw new Error('No userId provided');
        const data = {
            ...req.body,
            creatorId: user.ftUserId,

        }
        const sub = await Subdivision.create(data);
        res.status(201).json(sub);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/universe/:universeId', async (req, res) => {
    try {
        const universeId = req.params.universeId;
        const subdivisions = await Subdivision.findAll({
            where: {
                universeId,
            }
        });

        res.status(200).json(subdivisions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
