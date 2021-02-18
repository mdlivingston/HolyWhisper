import { identity } from "../whispers/Identity";
import { getData } from "./LocalStorage";

export const categories = [
    'Identity',
    'Confidence',
    'Hope',
    'Purity',
    'Promises'
]

function getRandomInt(max)
{
    return Math.floor(Math.random() * Math.floor(max));
}

export async function getRandomWhisper()
{
    const preferredWhispers = await getData()
    const category = preferredWhispers && preferredWhispers.length > 0 ?
        preferredWhispers[getRandomInt(preferredWhispers.length - 1)] :
        categories[getRandomInt(categories.length - 1)]

    switch (category)
    {
        case 'Identity':
            return identity[getRandomInt(identity.length - 1)]
        case 'Hope':
            return identity[getRandomInt(identity.length - 1)]
        default:
            return identity[getRandomInt(identity.length - 1)]
    }

}