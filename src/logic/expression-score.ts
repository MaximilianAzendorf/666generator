import type {Expression} from "./expression";
import {RPNToString} from "./expression-eval-rpn";
import {Op, OpArray} from "./expression";

function scoreParenthesis(expression: Expression)
{
    if (!expression) return Number.POSITIVE_INFINITY;

    let depth = 0;
    let maxDepth = 0;
    let count = 0;
    for (let char of RPNToString(expression))
    {
        if (char == '(')
        {
            depth++;
            count++;
        }
        else if (char == ')')
        {
            depth--;
        }

        maxDepth = Math.max(maxDepth, depth);
    }

    return 1 + maxDepth + (1 - Math.pow(0.5, count));
}

function countBreaks(sequence: string[]): number
{
    let breaks = -1;
    let lastElem = null;

    for (let elem of sequence)
    {
        if (elem != lastElem) breaks++;
        lastElem = elem;
    }

    return breaks / sequence.length;
}

function scoreOpBreaksRPN(expression: Expression)
{
    let ops = [...RPNToString(expression)].filter(c => OpArray.includes(c as Op));
    return countBreaks(ops);
}

export function scoreExpressionRPN(expression: Expression): number
{
    let parensScore = scoreParenthesis(expression);

    return parensScore == 1
        ? scoreOpBreaksRPN(expression)
        : parensScore;
}
