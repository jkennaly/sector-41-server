import { 
  PersonalDataFile,
  Characters,
} from '../../../../models/games/mgt2e/characters/index.js';

import {
  Portrait
} from '../../../../models/games/index.js';


const pdfController = {
  async create(req, res) {
    try {
      const characterId = parseInt(req.params.characterId, 10)
      const user = req.user || { ftUserId: 0 };
      const ownerId = user.ftUserId;
      if(!characterId) throw new Error('No characterId provided');
      if(!ownerId) throw new Error('No ownerId provided');

      //first get the character to make sure it exists
      const character = await Characters.findByPk(characterId);
      if(!character) throw new Error('No character found with that id');
      //make sure charcter belongs to user
      if(character.ownerId !== ownerId) throw new Error('Character does not belong to user');
      
      const params = {
        age: 18,
        ...req.body,
        ownerId: characterId,
        
      }
      
      //make sure character does not already have a pdf
      const pdfExists = await PersonalDataFile.findOne({ where: { ownerId: characterId } });
      //if the pdf already exists, update fields
      let pdf;
      if(pdfExists) {
        pdf = await pdfExists.update(params);
      } else {
        //if the pdf does not exist, create it
        pdf = await PersonalDataFile.create(params);
        //update the character's personalDataFileId
        await character.update({ personalDataFileId: pdf.id });
      }
      //return the chaarcter including all associations

      const updatedCharacter = await Characters.findByPk(characterId, { include: { all: true } });
      res.status(201).json(updatedCharacter);

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  async createPortrait(req, res) {
    try {
      const characterId = parseInt(req.params.characterId, 10)
      const user = req.user || { ftUserId: 0 };
      const ownerId = user.ftUserId;
      if(!characterId) throw new Error('No characterId provided');
      if(!ownerId) throw new Error('No ownerId provided');

      //first get the character to make sure it exists
      const character = await Characters.findByPk(characterId, { include: { all: true } });
      if(!character) throw new Error('No character found with that id');
      //make sure charcter belongs to user
      if(character.ownerId !== ownerId) throw new Error('Character does not belong to user');
      
      //make sure character does not already have a pdf
      const pdfExists = Boolean(character.personalDataFileId);
      if(!pdfExists) {
        //if the pdf does not exist, throw an error
        throw new Error('No personal data file found for this character');

      }
      console.log('req.params', req.params);
      
      const name = `${character.personalDataFile.name}, Age ${character.personalDataFile.age}, from ${character.personalDataFile.homeWorld}. ${req.body.imageDescription}`
      const params = {
        name,
        personalDataFileId: character.personalDataFileId,
        ...req.body,
        
      }

      //create the portrait
      const portrait = await Portrait.create(params);
      //update the character's personalDataFileId
      await character.personalDataFile.update({ currentPortraitId: portrait.id });
      
      //return the character including all associations
      const updatedCharacter = await Characters.findByPk(characterId, { include: { all: true } });
      res.status(201).json(updatedCharacter);

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async getAll(req, res) {
    try {
      const games = await PersonalDataFile.findAll();
      res.status(200).json(games);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async getById(req, res) {
    try {
      const pdf = await PersonalDataFile.findByPk(req.params.id);
      if (pdf) {
        res.status(200).json(pdf);
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
        const newGame = await PersonalDataFile.create(req.body);
        res.status(201).json(newGame);
      } else {
        const pdf = await PersonalDataFile.findByPk(req.params.id);
        if (pdf) {
          await pdf.update(req.body);
          res.status(200).json(pdf);
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
      const pdf = await PersonalDataFile.findByPk(req.params.id);
      if (pdf && pdf.gmId === user.ftUserId) {
        await pdf.destroy();
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
      const pdf = await PersonalDataFile.findByPk(req.params.id, {
        include: [
        ],
      });
      if (pdf) {
        res.status(200).json(pdf);
      } else {
        res.status(404).json({ message: 'Game not found' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  
};

export default pdfController;
