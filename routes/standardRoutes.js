import express from 'express';

const router = express.Router();

const handleRoute = (req, res) => {
  const message = `${req.method} ${req.originalUrl}`;
  res.json({ message, data: req.body });
};

router.get('/', handleRoute);
router.post('/', handleRoute);
router.put('/:id', handleRoute);
router.delete('/:id', handleRoute);

export default router;