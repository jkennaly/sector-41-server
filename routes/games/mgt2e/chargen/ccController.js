import { 
  Characters,
  CoreCharacteristics
} from '../../../../models/games/mgt2e/characters/index.js';



const ccController = {
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
