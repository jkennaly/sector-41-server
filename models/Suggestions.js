import { DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';
import tiktoken from 'tiktoken-node';
import Character from './games/mgt2e/characters/Characters.js';

const TOKEN_LIMIT = 4096;
const RESEVERED_TOKENS = 512;

const Suggestions = sequelize.define('Suggestions', {
  response: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  request: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  gameId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Games', // 'games' refers to the table name
      key: 'id',
    },
  },
  creatorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // 'users' refers to the table name
      key: 'id',
    },
  },
  prompt: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  params: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  choices: {
    type: DataTypes.JSON,
    allowNull: true,
  },
    twist: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    keywords: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
});

Suggestions.associate = function(models) {
};
const enc = tiktoken.encodingForModel('gpt-3.5-turbo');
const buldChain = (subdivs, chain) => {
  if(!chain || !chain[0]) return [];
    const superId = chain[0].superId;
    if(superId) {
        const superSubdiv = subdivs.find(subdiv => subdiv.id === superId);
        chain.unshift(superSubdiv);
    } else {
        return chain;
    }
    return buldChain(subdivs, chain);
}

const finalizeChain = (chain) => {
  const encoded = enc.encode(JSON.stringify(chain));
  if(encoded.length < TOKEN_LIMIT - RESEVERED_TOKENS) return chain;
  if(chain.length <= 3) return chain[0];
  //remove the 4th and fifth elements
  chain.splice(3, 2);
  return finalizeChain(chain);
}


const finalizeCharChain = (chain) => {
  const encoded = enc.encode(JSON.stringify(chain));
  if(encoded.length < TOKEN_LIMIT - RESEVERED_TOKENS) return chain;
  if(chain.length <= 3) return chain[0];
  //remove the 3rd to last and 4th to last elements
  chain.splice(-3, 2);
  return finalizeChain(chain);
}


const finalizeCharCountChain = (chain, maxLength) => {
  const len = JSON.stringify(chain).length
  if(len <= maxLength) return chain;
  if(chain.length <= 3) return chain[0];
  //remove the final element
  chain.pop();
  return finalizeChain(chain);
}


//add instance method getPrompt
Suggestions.prototype.getBody = async function() {
    if(this.prompt) return this.prompt;
    //get the Context models
    const { UniverseContext, FeatureContext, SubdivisionContext } = sequelize.models;
    //for each context models, get the members with the same gameId
    const universeContext = await UniverseContext.findOne({ where: { gameId: this.gameId } });
    const featureContexts = await FeatureContext.findAll({ where: { gameId: this.gameId } });
    const subdivisionContexts = await SubdivisionContext.findAll({ where: { gameId: this.gameId } });

    const model = 'gpt-3.5-turbo'
    const messages = []
    //@TODO: get the system prompt from the game type
    //for now, use the Traveller system prompt
    const systemPrompt = `You are an AI in the Traveller universe. 
    System Users are Travellers, and you are the AI helping them learn about their world.
    Answer all questions from the perspective of the AI.`;
    messages.push({role: 'system', content: systemPrompt});
    const userUniversePrompt = `You are an AI in the Traveller universe. Describe the Universe.`
    const universeDescription =  universeContext.description;
    messages.push({role: 'user', content: userUniversePrompt});
    messages.push({role: 'assistant', content: universeDescription});
    const suggestionForSubdivision = this.params?.display?.type === 'subdivision';
    const suggestionForWorld = suggestionForSubdivision && this.params?.formData?.scale?.toLowerCase() === 'world';

    const universeFeatures = featureContexts
      .filter(context => context.universeId === universeContext.id && !context.superId) 
      .map(context => ([{role: 'user', content: context.prompt}, {role: 'assistant', content: context.description}]))
      .flat();
    messages.push(...universeFeatures);
    const subdivisionChain = buldChain(subdivisionContexts, [subdivisionContexts.find(context => context.id === this.params?.display?.parentId)]);
    const subdivisionMessageChain = subdivisionChain
      .map(context => ([
        {role: 'user', content: context.prompt}, {role: 'assistant', content: context.description},
        {role: 'user', content: `Can you describe sofe of the features of this location`}, {role: 'assistant', content: `Sure! Here are some features of ${context.name}: ${
          featureContexts
            .filter(featureContext => featureContext.subdivisionId === context.id)
            .map(featureContext => `${featureContext.type}: ${featureContext.name}\n ${featureContext.description}`)
            .join('\n')
        }`}
      ]))
      .flat();
    messages.push(...subdivisionMessageChain);
    let userPrompt = `Describe a ${this.params?.formData?.scale || this.params?.formData?.type} in the Traveller universe called ${this?.params?.formData?.name}. ${this?.params?.formData?.prompt}`
    let max_tokens = RESEVERED_TOKENS;
    messages.push({role: 'user', content: userPrompt});
    const finalizedMessages = finalizeChain(messages);

    // if(suggestionForSubdivision) {
    //     max_tokens = 128;
    // }
    // if(suggestionForWorld) {
    //     max_tokens = 512;
    // }
    this.prompt = userPrompt
    return {model, messages: finalizedMessages, max_tokens }
};

const temps = {
  trait: 1.7,
  distinguishingFeature: 1.1,
  backgroundNote: 1
}

Suggestions.prototype.getCharacterBody = async function() {
  if(this.prompt) return this.prompt;
  //get the Context models
  const { UniverseContext, FeatureContext, SubdivisionContext } = sequelize.models;
  //for each context models, get the members with the same gameId
  const universeContext = await UniverseContext.findOne({ where: { gameId: this.gameId } });
  const featureContexts = await FeatureContext.findAll({ where: { gameId: this.gameId } });
  const subdivisionContexts = await SubdivisionContext.findAll({ where: { gameId: this.gameId } });
  const formHomeworld = this.params?.formData?.homeworld;
  const formName = this.params?.formData?.name;
  const formSpecies = this.params?.formData?.species;
  const formTitle = this.params?.formData?.title;
  const formTraits = this.params?.formData?.traits;
  const formFeatures = this.params?.formData?.distinguishingFeatures;
  const formNotes = this.params?.formData?.backgroundNotes;
  const formAge = this.params?.formData?.age || 18;
  const formRequest = this.params?.request || 'trait';
  const characterId = this.params?.formData?.character?.id;

  const dbChar = characterId ? await Character.findOne({ where: { id: characterId } }) : undefined
  const homeworld = formHomeworld || dbChar?.homeworld;
  const name = formName || dbChar?.name;
  const species = formSpecies || dbChar?.species;
  const title = formTitle || dbChar?.title;
  const traits = formTraits || dbChar?.traits || [];
  const features = formFeatures || dbChar?.distinguishingFeatures || [];
  const notes = formNotes || dbChar?.backgroundNotes || [];
  const age = formAge || dbChar?.age;




  const model = 'gpt-3.5-turbo'
  const messages = []
  //@TODO: get the system prompt from the game type
  //for now, use the Traveller system prompt
  const systemPrompt = `You are an AI in the Traveller universe. 
  Your responsibility is to provide dossier information on characters in the universe.
  These characters are new and have not been created yet.
  When asked to provide information, we will just reply with an answer that seems reasonable based on what has been given so far.
  You will be given some biographical information about a character, and you will need to provide additional requested information on that character.`;
  messages.push({role: 'system', content: systemPrompt});
  const userBasicsPrompt = `Describe ${name}, a ${age} year old ${species} from ${homeworld}.`;
  const assitantBasicsResponse =  `Sure! Here is some information about ${name}: ${title ? `${title} ` : ''}${age} year old ${species} from ${homeworld}.
  ${traits.length ? `Traits: ${traits.join(', ')}` : ''}
  ${features.length ? `Distinguishing Features: ${features.join(', ')}` : ''}
  ${notes.length ? `Background Notes: ${notes.join(', ')}` : ''}
  `;
  messages.push({role: 'user', content: userBasicsPrompt});
  messages.push({role: 'assistant', content: assitantBasicsResponse});
  //see if there is a subdivision with a scale of world (case-insesitive) and a name that matches formHomeworld
  const homeworldSubdivision = subdivisionContexts.find(context => context.name.toLowerCase() === homeworld.toLowerCase() && context.scale.toLowerCase() === 'world');
  const homeworldFeatures = featureContexts.filter(featureContext => featureContext.subdivisionId === homeworldSubdivision?.id);
  //combine homeWorldSubdivision.description and homeworldFeatures.descriptions
  const homeworldDescription = homeworldSubdivision?.description || '';
  const homeworldFeaturesDescription = homeworldFeatures.map(feature => `${feature.type}: ${feature.name}\n ${feature.description}`).join('\n');
  const homeworldDescriptionAndFeatures = `${homeworldDescription}\n${homeworldFeaturesDescription}`;
  const homeworldPrompt = `Describe ${name}'s ${homeworld}`
  messages.push({role: 'user', content: homeworldPrompt});
  messages.push({role: 'assistant', content: homeworldDescriptionAndFeatures});
  
  const userRequestPrompt = formRequest === 'trait' ? `Name a trait that ${name} could have in less than 3 words?` 
  : formRequest === 'distinguishingFeature' ? `What is a distinguishing ${name} could have in less than 10 words?`
  : formRequest === 'backgroundNote' ? `Describe an interesting background story about ${name} in a few sentences.`
  : `What are ${name}'s distinguishing features?`;
  
  let max_tokens = RESEVERED_TOKENS;
  messages.push({role: 'user', content: userRequestPrompt});
  const finalizedMessages = finalizeCharChain(messages);




  // if(suggestionForSubdivision) {
  //     max_tokens = 128;
  // }
  // if(suggestionForWorld) {
  //     max_tokens = 512;
  // }
  this.prompt = userRequestPrompt
  const temperature = temps[formRequest] || 1.7;
  return {model, messages: finalizedMessages, max_tokens, temperature }
};

Suggestions.prototype.getAssociateBody = async function() {
  if(this.prompt) return this.prompt;
  const characterId = this.params?.characterId;
  const termId = this.params?.termId;
  const formPrompt = this.params?.prompt
  if(!characterId) throw new Error('No characterId provided');
  if(!termId) throw new Error('No termId provided');
  if(!formPrompt) throw new Error('No prompt provided');
  //get the Context models
  console.log('getAssociateBody params', this.params);
  const { Characters, FeatureContext, SubdivisionContext, LifePaths } = sequelize.models;
  const dbChar = characterId ? await Characters.findOne({ 
    where: { id: characterId }, 
    include: { all: true}
  }) : undefined
  if(!dbChar) throw new Error('No character found');

  const currentTerm = LifePaths.findOne({ 
    where: { id: termId },
    include: { all: true } 
  });

  
  //for each context models, get the members with the same gameId
  const featureContexts = await FeatureContext.findAll({ where: { gameId: this.gameId } });
  const subdivisionContexts = await SubdivisionContext.findAll({ where: { gameId: this.gameId } });


  const homeworld = dbChar?.homeworld;
  const name = dbChar?.name;
  const species = dbChar?.species;
  const title = dbChar?.title;
  const traits = dbChar?.traits || [];
  const features = dbChar?.distinguishingFeatures || [];
  const notes = dbChar?.backgroundNotes || [];
  const paths = dbChar?.paths || [];
  const age = dbChar?.age;




  const model = 'gpt-3.5-turbo'
  const messages = []
  //@TODO: get the system prompt from the game type
  //for now, use the Traveller system prompt
  const systemPrompt = `You are an AI in the Traveller universe. 
  Your responsibility is to provide dossier information on characters in the universe.
  These characters are new and have not been created yet.
  When asked to provide information, we will just reply with an answer that seems reasonable based on what has been given so far.
  You will be given some biographical information about a character, and you will need to provide additional requested information on that character.`;
  messages.push({role: 'system', content: systemPrompt});
  const userBasicsPrompt = `Describe ${name}, a ${age} year old ${species} from ${homeworld}.`;
  const assitantBasicsResponse =  `Sure! Here is some information about ${name}: ${title ? `${title} ` : ''}${age} year old ${species} from ${homeworld}.
  ${traits.length ? `Traits: ${traits.join(', ')}` : ''}
  ${features.length ? `Distinguishing Features: ${features.join(', ')}` : ''}
  ${notes.length ? `Background Notes: ${notes.join(', ')}` : ''}
  `;
  messages.push({role: 'user', content: userBasicsPrompt});
  messages.push({role: 'assistant', content: assitantBasicsResponse});
  //see if there is a subdivision with a scale of world (case-insesitive) and a name that matches formHomeworld
  const homeworldSubdivision = homeworld ? subdivisionContexts.filter(s => s && s.name).find(context => context.name.toLowerCase() === homeworld.toLowerCase() && context.scale.toLowerCase() === 'world') : {};
  const homeworldFeatures = featureContexts.filter(featureContext => featureContext.subdivisionId === homeworldSubdivision?.id);
  //combine homeWorldSubdivision.description and homeworldFeatures.descriptions
  const homeworldDescription = homeworldSubdivision?.description || '';
  const homeworldFeaturesDescription = homeworldFeatures.map(feature => `${feature.type}: ${feature.name}\n ${feature.description}`).join('\n');
  const homeworldDescriptionAndFeatures = `${homeworldDescription}\n${homeworldFeaturesDescription}`;
  const homeworldPrompt = `Describe ${name}'s ${homeworld}`
  messages.push({role: 'user', content: homeworldPrompt});
  messages.push({role: 'assistant', content: homeworldDescriptionAndFeatures});


  
  const userRequestPrompt = formPrompt;
  
  let max_tokens = RESEVERED_TOKENS;
  messages.push({role: 'user', content: userRequestPrompt});
  const finalizedMessages = finalizeCharChain(messages);




  // if(suggestionForSubdivision) {
  //     max_tokens = 128;
  // }
  // if(suggestionForWorld) {
  //     max_tokens = 512;
  // }
  this.prompt = userRequestPrompt
  return {model, messages: finalizedMessages, max_tokens }
};

Suggestions.prototype.getCharacterPortraitBody = async function() {
  if(this.prompt) return this.prompt;
  //get the Context models
  const { SubdivisionContext } = sequelize.models;
  //for each context models, get the members with the same gameId
  const subdivisionContexts = await SubdivisionContext.findAll({ where: { gameId: this.gameId } });
  const formHomeworld = this.params?.formData?.homeworld;
  const formName = this.params?.formData?.name;
  const formSpecies = this.params?.formData?.species;
  const formTitle = this.params?.formData?.title;
  const formTraits = this.params?.formData?.traits;
  const formFeatures = this.params?.formData?.distinguishingFeatures;
  const formNotes = this.params?.formData?.backgroundNotes;
  const formAge = this.params?.formData?.age || 18;
  const characterId = this.params?.formData?.character?.id;

  const dbChar = characterId ? await Character.findOne({ where: { id: characterId } }) : undefined
  const homeworld = formHomeworld || dbChar?.homeworld;
  const name = formName || dbChar?.name;
  const species = formSpecies || dbChar?.species;
  const title = formTitle || dbChar?.title;
  const traits = formTraits || dbChar?.traits || [];
  const features = formFeatures || dbChar?.distinguishingFeatures || [];
  const notes = formNotes || dbChar?.backgroundNotes || [];
  const age = formAge || dbChar?.age;

  const formDescription = this.params?.formData?.imageDescription;

  //console.log('formDescription', this.params?.formData);

  const messages = []
  //@TODO: get the system prompt from the game type
  //for now, use the Traveller system prompt
  const systemPrompt = `Create a realistic photographic headshot for ${title} ${name}, a ${age} year old ${species} from ${homeworld}, Sigma 85 mm f/1.4.`;
  messages.push(systemPrompt);
  messages.push(formDescription);
  const strMap = obj => obj.trait
  //messages.push(...traits.map(strMap));
  messages.push(...features.map(strMap));
  //messages.push(...notes.map(strMap));
  //see if there is a subdivision with a scale of world (case-insesitive) and a name that matches formHomeworld
  const homeworldSubdivision = subdivisionContexts.find(context => context.name.toLowerCase() === homeworld.toLowerCase() && context.scale.toLowerCase() === 'world');
  //combine homeWorldSubdivision.description and homeworldFeatures.descriptions
  const homeworldDescription = homeworldSubdivision?.description || '';
  messages.push(homeworldDescription);
  
  const finalizedMessages = finalizeCharCountChain(messages, 1000);

  const body = {
    prompt: finalizedMessages.join('\n'),
    n: 1,
    size: '256x256',
    
  }
  this.prompt = body
  return body
};

export default Suggestions;

/*

https://oaidalleapiprodscus.blob.core.windows.net/private/org-T45xKGhhQc0OUstRQmw2VhR9/user-3zPFOG8RW0YKoIhAiLfrmTGI/img-9M9NMK7uucJCf3ObcwcSqvRk.png?st=2023-06-10T18%3A52%3A41Z&se=2023-06-10T20%3A52%3A41Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-06-09T20%3A53%3A28Z&ske=2023-06-10T20%3A53%3A28Z&sks=b&skv=2021-08-06&sig=GpyezA7ctP3zeMQgTO2/b/Ec4TCHRH3x%2B2xj4dOHULI%3D

*/