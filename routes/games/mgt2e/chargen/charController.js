import { 
  Characters, 
  Associates,
  Armors, 
  Augmentations, 
  CoreCharacteristics, 
  Equipment, 
  Finances, 
  LifePaths, 
  PersonalDataFile, 
  Skills, 
  Weapons } from '../../../../models/games/mgt2e/characters/index.js';



const charController = {
  async create(req, res) {
    try {
      const gameId = parseInt(req.params.gameId, 10)
      const user = req.user || { ftUserId: 0 };
      const ownerId = user.ftUserId;
      if(!gameId) throw new Error('No gameId provided');
      if(!ownerId) throw new Error('No ownerId provided');
      const params = {
        ownerId,
        gameId,
      }
      const character = await Characters.create(params);
      res.status(201).json(character);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  async createAssoc(req, res) {
    try {
      const characterId = parseInt(req.params.characterId, 10)
      const user = req.user || { ftUserId: 0 };
      const ownerId = user.ftUserId;
      const { body } = req;
      if(!ownerId) throw new Error('No ownerId provided');
      if(!characterId) throw new Error('No characterId provided');
      if(!body) throw new Error('No body provided');

      const { name, origin, association } = body;


      const params = {
        name,
        origin,
        ownerId: characterId,
        association,
      }
      const associate = await Associates.create(params);
      const character = await Characters.findByPk(characterId, {
        include: {
          all: true,
        }
      });
      res.status(201).json(character);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async getAll(req, res) {
    try {
      const games = await Characters.findAll();
      res.status(200).json(games);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async getById(req, res) {
    try {
      const character = await Characters.findByPk(req.params.id);
      if (character) {
        res.status(200).json(character);
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
        const newGame = await Characters.create(req.body);
        res.status(201).json(newGame);
      } else {
        const character = await Characters.findByPk(req.params.id);
        if (character) {
          await character.update(req.body);
          res.status(200).json(character);
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
      const character = await Characters.findByPk(req.params.id);
      if (character && character.gmId === user.ftUserId) {
        await character.destroy();
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
      const character = await Characters.findByPk(req.params.id, {
        include: { all: true },
      });
      if (character) {
        res.status(200).json(character);
      } else {
        res.status(404).json({ message: 'Game not found' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  async getPcByGameId(req, res) {
    try {
      const gameId = parseInt(req.params.gameId, 10)
      const user = req.user || { ftUserId: 0 };
      const ownerId = user.ftUserId;
      if(!gameId) throw new Error('No gameId provided');
      if(!ownerId) throw new Error('No ownerId provided');
      const characters = await Characters.findAll({
        include: { all: true },
        where: {
          ownerId,
          gameId,
        }
      });
      if (characters) {
        res.status(200).json(characters);
      } else {
        res.status(404).json({ message: 'Game not found' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  async getAllByGameId(req, res) {
    try {
      const gameId = parseInt(req.params.gameId, 10)
      const user = req.user || { ftUserId: 0 };
      const ownerId = user.ftUserId;
      if(!gameId) throw new Error('No gameId provided');
      if(!ownerId) throw new Error('No ownerId provided');
      const characters = await Characters.findAll({
        include: { all: true },
        where: {
          gameId,
        }
      });
      if (characters) {
        res.status(200).json(characters);
      } else {
        res.status(404).json({ message: 'Game not found' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  
};

export default charController;
