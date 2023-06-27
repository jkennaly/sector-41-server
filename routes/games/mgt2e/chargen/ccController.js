import { 
  Characters,
  CoreCharacteristics
} from '../../../../models/games/mgt2e/characters/index.js';



const ccController = {
  async changeCharacteristic(req, res) {
    try {
      const characterId = parseInt(req.params.characterId, 10)
      const amount = parseInt(req.params.amount, 10)
      const characteristic = req.params.characteristic
      const user = req.user || { ftUserId: 0 };
      const ownerId = user.ftUserId;
      if(!characterId) throw new Error('No characterId provided');
      if(!ownerId) throw new Error('No ownerId provided');

      //first get the character to make sure it exists
      const character = await Characters.findByPk(characterId);
      if(!character) throw new Error('No character found with that id');
      //make sure charcter belongs to user
      if(character.ownerId !== ownerId) throw new Error('Character does not belong to user');

      //get the characteristic
      const cc = await CoreCharacteristics.findOne({ where: { ownerId: characterId }});
      if(!cc) throw new Error('No core characteristics found for that character');

      //add amount to the current characteristic value
      const newCharacteristicValue = cc[characteristic] + amount;
      //if less than 0, set to 0
      if(newCharacteristicValue < 0) {
        cc[characteristic] = 0;
      }
      //if greater than 15, set to 15
      else if(newCharacteristicValue > 15) {
        cc[characteristic] = 15;
      }
      //otherwise set to new value
      else {
        cc[characteristic] = newCharacteristicValue;
      }

      //save the updated characteristic
      await cc.save();

      //reurn the updated character
      const updatedCharacter = await Characters.findByPk(characterId, { include: { all: true } });
      res.status(201).json(updatedCharacter);
      
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
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
        ...req.body,
        ownerId: characterId,
        
      }
      
      //make sure character does not already have a cc
      const ccExists = await CoreCharacteristics.findOne({ where: { ownerId: characterId } });
      //if the cc already exists, update fields
      let cc;
      if(ccExists) {
        cc = await ccExists.update(params);
      } else {
        //if the cc does not exist, create it
        cc = await CoreCharacteristics.create(params);
        //update the character's coreCharacteristicsId
        await character.update({ coreCharacteristicsId: cc.id });
      }
      //return the chaarcter including all associations

      const updatedCharacter = await Characters.findByPk(characterId, { include: { all: true } });
      res.status(201).json(updatedCharacter);

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};

export default ccController;
