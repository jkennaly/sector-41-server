import { LoreObject } from '../../models.js';

const loreController = {
  async create(req, res) {
    try {
      const user = req.user || { ftUserId: 0 };
      req.body.gmId = user.ftUserId;
      if(!req.body.gmId) throw new Error('No gmId provided');
      const game = await LoreObject.create(req.body);
      res.status(201).json(game);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async getAll(req, res) {
    try {
      const games = await LoreObject.findAll();
      res.status(200).json(games);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async getById(req, res) {
    try {
      const game = await LoreObject.findByPk(req.params.id);
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

  async getByIdWithCharacters(req, res) {
    try {
      const user = req.user || { ftUserId: 0 };
      const game = await LoreObject.findByPk(req.params.id);

      if (game) {
        const gmId = game.gmId;
        const isGm = gmId === user.ftUserId;
        if(!isGm) {
          const character = await Characters.findOne({
            where: {
              gameId: req.params.id,
              ownerId: user.ftUserId,
            }
          });
          return res.status(200).json({character, game});
        }
        const characters = await Characters.findAll({
          where: {
            gameId: req.params.id,
          }
        });
        //reduce characters into two arrays by pc npc where npc.ownerId === gmId
        const pcCharacters = [];
        const npcCharacters = [];
        characters.forEach(character => {
          if(character.ownerId === gmId) {
            npcCharacters.push(character);
          } else {
            pcCharacters.push(character);
          }
        });
        //convert the pcCharacters array into an object with the pc.ownerId as the key
        const pcCharactersObject = {};
        pcCharacters.forEach(character => {
          pcCharactersObject[character.ownerId] = character;
        });

        res.status(200).json({game, pcs: pcCharactersObject, npcs: npcCharacters});
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
        const newGame = await LoreObject.create(req.body);
        res.status(201).json(newGame);
      } else {
        const game = await LoreObject.findByPk(req.params.id);
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
      const game = await LoreObject.findByPk(req.params.id);
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
      const game = await LoreObject.findByPk(req.params.id, {
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

export default loreController;
