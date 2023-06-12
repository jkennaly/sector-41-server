import { Portrait } from '../models/games/index.js';

const portraitsController = {

  async getById(req, res) {
    try {
      const portrait = await Portrait.findByPk(req.params.id);
      if (portrait) {
        res.status(200).json(portrait);
      } else {
        res.status(404).json({ message: 'Portrait not found' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  
};

export default portraitsController;
