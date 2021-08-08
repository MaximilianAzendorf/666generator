import type {Expression} from "./expression";
import {Op, OpArray, toInfixString} from "./expression";

function scoreParenthesis(expression: Expression)
{
    if (!expression) return Number.POSITIVE_INFINITY;

    let depth = 0;
    let maxDepth = 0;
    let count = 0;
    for (let char of toInfixString(expression))
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

    return 1 + depth + (1 - Math.pow(0.5, count));
}

function scoreOpBreaks(expression: Expression)
{
    let breaks = -1;
    let totalOps = 0;
    let lastOp: Op = null;

    for (let char of toInfixString(expression))
    {
        if (!OpArray.includes(char as Op)) continue;

        totalOps++;
        if (char != lastOp) breaks++;
        lastOp = char as Op;
    }

    return breaks / totalOps;
}

export function scoreExpression(expression: Expression): number
{
    let parensScore = scoreParenthesis(expression);

    return parensScore == 1
        ? scoreOpBreaks(expression)
        : parensScore;
}
