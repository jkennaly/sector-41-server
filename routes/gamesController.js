import { Games, Users, Sessions } from '../models.js';

const gamesController = {
  async create(req, res) {
    try {
      const user = req.user || { ftUserId: 0 };
      req.body.gmId = user.ftUserId;
      if(!req.body.gmId) throw new Error('No gmId provided');
      const game = await Games.create(req.body);
      res.status(201).json(game);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async getAll(req, res) {
    try {
      const games = await Games.findAll();
      res.status(200).json(games);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async getById(req, res) {
    try {
      const game = await Games.findByPk(req.params.id);
      if (game) {
        res.status(200).json(game);
      } else {
        res.status(404).json({ message: 'Game not found' });
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
        const newGame = await Games.create(req.body);
        res.status(201).json(newGame);
      } else {
        const game = await Games.findByPk(req.params.id);
        if (game) {
          await game.update(req.body);
          res.status(200).json(game);
        } else {
          res.status(404).json({ message: 'Game not found' });
        }
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async deleteById(req, res) {
    try {
      const user = req.user || { ftUserId: 0 };
      const game = await Games.findByPk(req.params.id);
      if (game && game.gmId === user.ftUserId) {
        await game.destroy();
        res.status(204).json();
      } else {
        res.status(404).json({ message: 'Game not found' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  async getByIdWithAssociations(req, res) {
    try {
      const game = await Games.findByPk(req.params.id, {
        include: ['gm', 'players', 'sessions'],
      });
      if (game) {
        res.status(200).json(game);
      } else {
        res.status(404).json({ message: 'Game not found' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  
};

export default gamesController;
