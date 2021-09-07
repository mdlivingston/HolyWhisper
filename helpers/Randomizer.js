import { authority } from "../whispers/Authority";
import { father } from "../whispers/Father";
import { gratitude } from "../whispers/Gratitude";
import { healing } from "../whispers/Healing";
import { hope } from "../whispers/Hope";
import { identity } from "../whispers/Identity";
import { joy } from "../whispers/Joy";
import { love } from "../whispers/Love";
import { peace } from "../whispers/Peace";
import { purity } from "../whispers/Purity";
import { purpose } from "../whispers/Purpose";
import { secretPlace } from "../whispers/SecretPlace";
import { word } from "../whispers/Word";
import { getData } from "./LocalStorage";

export const categories = [
    'Identity',
    'Authority',
    'Healing',
    'Father',
    'Purpose',
    'Peace',
    'Gratitude',
    'Word of God',
    'Love',
    'Hope',
    'Joy',
    'Purity',
    'Secret Place'
]

function getRandomInt(min, max)
{
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export async function getRandomWhisper()
{
    const preferredWhispers = await getData('preferredWhispers')
    const category = preferredWhispers && preferredWhispers.length > 0 ?
        preferredWhispers[getRandomInt(0, preferredWhispers.length - 1)] :
        categories[getRandomInt(0, categories.length - 1)]

    switch (category)
    {
        case 'Identity':
            return identity[getRandomInt(0, identity.length - 1)]
        case 'Authority':
            return authority[getRandomInt(0, authority.length - 1)]
        case 'Healing':
            return healing[getRandomInt(0, healing.length - 1)]
        case 'Father':
            return father[getRandomInt(0, father.length - 1)]
        case 'Purpose':
            return purpose[getRandomInt(0, purpose.length - 1)]
        case 'Peace':
            return peace[getRandomInt(0, peace.length - 1)]
        case 'Gratitude':
            return gratitude[getRandomInt(0, gratitude.length - 1)]
        case 'Word of God':
            return word[getRandomInt(0, word.length - 1)]
        case 'Love':
            return love[getRandomInt(0, love.length - 1)]
        case 'Purity':
            return purity[getRandomInt(0, purity.length - 1)]
        case 'Secret Place':
            return secretPlace[getRandomInt(0, secretPlace.length - 1)]
        case 'Hope':
            return hope[getRandomInt(0, hope.length - 1)]
        case 'Joy':
            return joy[getRandomInt(0, joy.length - 1)]
        default:
            return identity[0]
    }
}

export function truncate(str, n)
{
    return (str.length > n) ? str.substr(0, n - 1) + '...' : str;
}
