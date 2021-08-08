import type {Expression} from "./expression";
import {classifyExpression, evalExpression, Op, OpArray} from "./expression";

const MAX_FAILS = 1000;

export function anyExpression(numbers: number[]): Expression
{
    let exp: Expression = [...numbers];
    let fails = 0;

    while (classifyExpression(exp) == "incomplete")
    {
        let opIdx = Math.floor(Math.random() * OpArray.length);
        let expIdx = Math.floor(Math.random() * exp.length) + 1;

        let newExp = [...exp];
        newExp.splice(expIdx, 0, OpArray[opIdx]);

        if (classifyExpression(newExp) == "invalid")
        {
            fails++;
            if (fails > MAX_FAILS) return null;
            continue;
        }
        fails = 0;
        exp = newExp;
    }

    return classifyExpression(exp) == "invalid" ? null : exp;
}

export function find666(numbers: number[], timeoutMilliseconds: number): Expression
{
    let exp = null;
    let start = Date.now();

    while (evalExpression(exp) != 666)
    {
        if (Date.now() - start > timeoutMilliseconds) return null;
        exp = anyExpression(numbers);
    }

    return exp;
}
