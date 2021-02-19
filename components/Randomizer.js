import { authority } from "../whispers/Authority";
import { healing } from "../whispers/Healing";
import { identity } from "../whispers/Identity";
import { getData } from "./LocalStorage";

export const categories = [
    'Identity',
    'Confidence',
    'Hope',
    'Purity',
    'Promises',
    'Authority',
    'Healing'
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
        default:
            return identity[getRandomInt(0, identity.length - 1)]
    }

}