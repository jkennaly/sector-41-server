// Import the User model defined in the Users.js file
import Games from './models/Games.js';
import Sessions from './models/Sessions.js';
import Users from './models/Users.js';
import UserAliases from './models/UserAliases.js';
import Intentions from './models/Intentions.js';
import Interactions from './models/Interactions.js';
import InteractionTypes from './models/InteractionTypes.js';
import Messages from './models/Messages.js';
import MessagesMonitor from './models/MessagesMonitor.js';
import MessageTypes from './models/MessageTypes.js';
import Suggestion from './models/Suggestions.js';
import S3Image from './models/S3Image.js';

import {
    Characters,
    Armors,
    Associates,
    Augmentations,
    CoreCharacteristics,
    Equipment,
    Finances,
    LifePaths,
    PersonalDataFile,
    Skills,
    Weapons,
    ArmorOptions,
    EquipmentTraits,
    CareerTerms,
    Connections,
    MusteringOuts,
    PreCareerTerms,
    RacialAlternatives,
    SkillSets,
} from './models/games/mgt2e/characters/index.js';
import { Effects, 
    Portrait, 
    SourceReferences, 
    LoreObject,
    UniverseContext,
    SubdivisionContext,
    FeatureContext,
} from './models/games/index.js';


// Export the User model for use in other parts of the application
const models = { 
    Games,
    Users,
    Sessions,
    UserAliases,
    Intentions,
    Interactions,
    InteractionTypes,
    Messages,
    MessagesMonitor,
    MessageTypes,
    Characters,
    Armors,
    Associates,
    Augmentations,
    CoreCharacteristics,
    Equipment,
    Finances,
    LifePaths,
    PersonalDataFile,
    Skills,
    Weapons,
    Effects,
    Portrait,
    SourceReferences,
    ArmorOptions,
    EquipmentTraits,
    CareerTerms,
    Connections,
    MusteringOuts,
    PreCareerTerms,
    RacialAlternatives,
    LoreObject,
    UniverseContext,
    SubdivisionContext,
    FeatureContext,
    Suggestion,
    S3Image,
    SkillSets,
};

Object.values(models).forEach(model => {
    if (model.associate) {
        model.associate(models);
    }
}
);

export { 
    Games,
    Users,
    Sessions,
    UserAliases,
    Intentions,
    Interactions,
    InteractionTypes,
    Messages,
    MessagesMonitor,
    MessageTypes,
    Characters,
    Armors,
    Associates,
    Augmentations,
    CoreCharacteristics,
    Equipment,
    Finances,
    LifePaths,
    PersonalDataFile,
    Skills,
    Weapons,
    Effects,
    Portrait,
    SourceReferences,
    ArmorOptions,
    EquipmentTraits,
    CareerTerms,
    Connections,
    MusteringOuts,
    PreCareerTerms,
    RacialAlternatives,
    LoreObject,
    UniverseContext,
    SubdivisionContext,
    FeatureContext,
    Suggestion,
    S3Image,
    SkillSets,
}