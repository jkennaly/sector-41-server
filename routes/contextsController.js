import { UniverseContext, Users, Sessions, Characters } from '../models.js';

const contextsController = {
  async create(req, res) {
    try {
      const user = req.user || { ftUserId: 0 };
      req.body.gmId = user.ftUserId;
      if(!req.body.gmId) throw new Error('No gmId provided');
      const context = await UniverseContext.create(req.body);
      res.status(201).json(context);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async getGameContext(req, res) {
    try {
      const context = await UniverseContext.findOne({
        where: {
          gameId: req.params.id,
        },
        include: [],
      });
      if (context) {
        res.status(200).json(context);
      } else {
        res.status(404).json({ message: 'Context not found' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  

  async updateById(req, res) {
    try {
      const user = req.user || { ftUserId: 0 };
      req.body.gmId = user.ftUserId;
      if(!req.body.gmId) throw new Error('No gmId provided');
      
      if (req.params.id.startsWith('new')) {
        const newContext = await UniverseContext.create(req.body);
        res.status(201).json(newContext);
      } else {
        const context = await UniverseContext.findByPk(req.params.id);
        if (context) {
          await context.update(req.body);
          res.status(200).json(context);
        } else {
          res.status(404).json({ message: 'Context not found' });
        }
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};

export default contextsController;
