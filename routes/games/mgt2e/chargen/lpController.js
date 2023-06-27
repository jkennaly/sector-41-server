import { 
    Characters,
    LifePaths,
    PreCareerTerms
  } from '../../../../models/games/mgt2e/characters/index.js';
  
  
  
  const lpController = {
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
            
        //get all current lps for the character
        const lps = await LifePaths.findAll({ 
          where: { ownerId: characterId }, 
          include: { all: true }
        });
        const {
          term: reqTerm,
          careerTerm: reqCareer,
          preCareerTerm: reqPreCareer,
          musteringOut: reqMusteringOut,
          ownerId: reqOwnerId,
          finalAge: reqFinalAge,
        } = req.body

        //check if the lp already exists
        //console.log('lpController create lps', lps)
        let lpExists = lps.find(lp => {
          const term = lp.term;
          return term === reqTerm
        });

        //create it if it doesn't exist
        if(!lpExists) {
          lpExists = await LifePaths.create({
            term: reqTerm,
            ownerId: reqOwnerId,
            finalAge: reqFinalAge,
          });
        }

        if(reqPreCareer) {
        //check if the preCareerTerm already exists
        let preCareerExists = lpExists.preCareerTerms;
        if(preCareerExists) {
          const {
            graduated,
            accepted,
            skillsAdded,
            entryAttempted,
            graduationAttempted,
            completed,
            event,
            honored,
            commissioned,
          } = reqPreCareer;
          preCareerExists = await preCareerExists.update({
            graduated,
            accepted,
            skillsAdded,
            entryAttempted,
            graduationAttempted,
            completed,
            event,
            honored,
            commissioned,
          });
        }
        if(!preCareerExists) {
          const {
            term,
            name,
            ownerId,
            graduated,
            honored,
            accepted,
            commissioned,
            skillsAdded,
            entryAttempted,
            graduationAttempted,
            completed,
            event,
          } = reqPreCareer;
          preCareerExists = await PreCareerTerms.create({
            term,
            name,
            ownerId,
            graduated,
            honored,
            accepted,
            commissioned,
            skillsAdded,
            entryAttempted,
            graduationAttempted,
            completed,
            event,
            lifePathId: lpExists.id,
          });
        }
      }
        //return the chaarcter including all associations
  
        const updatedCharacter = await Characters.findByPk(characterId, { include: { all: true } });
        const updatedLps = await LifePaths.findAll({
          where: { ownerId: characterId },
          include: { all: true },
        });
        res.status(201).json({character: updatedCharacter, lifePaths: updatedLps});
  
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      }
    },

    async getByCharId(req, res) {
      try {
        const characterId = parseInt(req.params.characterId, 10)
        const user = req.user || { ftUserId: 0 };
        const ownerId = user.ftUserId;
        if(!characterId) throw new Error('No characterId provided');
        if(!ownerId) throw new Error('No ownerId provided');
  
        const paths = await LifePaths.findAll({
          where: { ownerId: characterId },
          include: { all: true },
        });
        res.status(200).json(paths);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      }
    },

    async termChanges(req, res) {
      try {
        const characterId = parseInt(req.params.characterId, 10)
        const user = req.user || { ftUserId: 0 };
        const ownerId = user.ftUserId;
        if(!characterId) throw new Error('No characterId provided');
        if(!ownerId) throw new Error('No ownerId provided');
        const term = parseInt(req.params.term, 10);
        if(!term) throw new Error('No term provided');
        const field = req.params.field;
  
        const path = await LifePaths.findOne({
          where: { ownerId: characterId, term },
          include: { all: true },
        });
        if(!path) throw new Error('No path found');
        const fieldTerm = await path[field];
        if(!fieldTerm) throw new Error('No fieldTerm found');
        fieldTerm.update(req.body);
        fieldTerm.save();
        const finalPath = await LifePaths.findOne({
          where: { ownerId: characterId, term },
          include: { all: true },
        });
        res.status(200).json(finalPath);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      }
    },
  };
  
  export default lpController;
  