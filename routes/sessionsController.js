// Path: './controllers/sessionsController.js'

import { Sessions } from '../models.js';

const sessionsController = {
  async create(req, res) {
    try {
      const session = await Sessions.create(req.body);
      res.status(201).json(session);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async getAll(req, res) {
    try {
      const sessions = await Sessions.findAll();
      res.status(200).json(sessions);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async getById(req, res) {
    try {
      const session = await Sessions.findByPk(req.params.id);
      if (session) {
        res.status(200).json(session);
      } else {
        res.status(404).json({ message: 'Session not found' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async updateById(req, res) {
    try {
      if (req.params.id.startsWith('new')) {
        const newSession = await Sessions.create(req.body);
        res.status(201).json(newSession);
      } else {
        const session = await Sessions.findByPk(req.params.id);
        if (session) {
          await session.update(req.body);
          res.status(200).json(session);
        } else {
          res.status(404).json({ message: 'Session not found' });
        }
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async deleteById(req, res) {
    try {
      const session = await Sessions.findByPk(req.params.id);
      if (session) {
        await session.destroy();
        res.status(204).json();
      } else {
        res.status(404).json({ message: 'Session not found' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};

export default sessionsController;
