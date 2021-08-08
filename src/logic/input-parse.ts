import {flatten} from "lodash";

const NUM_REGEX = /[0-9]+/g;
const WORD_REGEX = /[a-zA-Z]+/g;

function parseNumbers(text: string): number[]
{
    let matches = text.match(NUM_REGEX) || [];

    return matches.map(match => parseInt(match));
}

function parseWord(word: string): number[]
{
    let result = [];

    for (let char of word.toLowerCase())
    {
        result.push(char.charCodeAt(0) - "a".charCodeAt(0) + 1);
    }

    return result;
}

function parseWords(text: string): number[]
{
    let matches = text.match(WORD_REGEX) || [];

    return flatten(matches.map(parseWord));
}

export function parse(text: string): number[]
{
    return parseWords(text);
}
