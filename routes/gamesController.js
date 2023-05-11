import { Games } from '../models.js';

const usersController = {
  async create(req, res) {
    try {
      const user = await Games.create(req.body);
      res.status(201).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async getAll(req, res) {
    try {
      const users = await Games.findAll();
      res.status(200).json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async getById(req, res) {
    try {
      const user = await Games.findByPk(req.params.id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async updateById(req, res) {
    try {
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
      const user = await Games.findByPk(req.params.id);
      if (user) {
        await user.destroy();
        res.status(204).json();
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};

export default usersController;
