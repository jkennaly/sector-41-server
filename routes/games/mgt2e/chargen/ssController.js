import { 
    Characters,
    SkillSets
  } from '../../../../models/games/mgt2e/characters/index.js';
  
  
  
  const ssController = {
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
          changes: [],
          skills: req.body,
          characterId,
        }
        
        //make sure character does not already have a ss
        const ssExists = await SkillSets.findOne({ where: { characterId } });
        //if the ss already exists, update fields
        let ss;
        if(ssExists) {
          params.changes.push(req.body)
          ss = await ssExists.update(params);
        } else {
          //if the ss does not exist, create it
          ss = await SkillSets.create(params);
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
  
  export default ssController;
  