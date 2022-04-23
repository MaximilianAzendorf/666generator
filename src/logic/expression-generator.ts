import {classifyRPNExpression, evalRPNExpression} from "./expression-eval-rpn";
import type {Expression} from "./expression";
import {OpArray} from "./expression";
import {number} from "svelte-i18n";
import {infixToRPN} from "./expression-infix";

const MAX_FAILS = 1000;

function randomOp()
{
    return OpArray[Math.floor(Math.random() * OpArray.length)];
}

export function anyExpressionRPN(numbers: number[]): Expression
{
    let exp = [...numbers] as Expression;
    let fails = 0;

    while (classifyRPNExpression(exp) == "incomplete")
    {
        let expIdx = Math.floor(Math.random() * exp.length) + 1;

        let newExp = [...exp];
        newExp.splice(expIdx, 0, randomOp());

        if (classifyRPNExpression(newExp) == "invalid")
        {
            fails++;
            if (fails > MAX_FAILS) return null;
            continue;
        }
        fails = 0;
        exp = newExp;
    }

    return classifyRPNExpression(exp) == "invalid" ? null : exp;
}

export function anyExpressionInfix(numbers: number[]): Expression
{
    let exp = [...numbers] as Expression;

    for(let i = 1; i < exp.length; i += 2)
    {
        exp.splice(i, 0, randomOp());
    }

    return infixToRPN(exp);
}

export function find666(numbers: number[], timeoutMilliseconds: number, onlyInfix = false): Expression
{
    let exp = null;
    let start = Date.now();

    while (Date.now() - start < timeoutMilliseconds)
    {
        let infixOrRPN = onlyInfix || Math.random() >= 0.5;
        exp = infixOrRPN ? anyExpressionInfix(numbers) : anyExpressionRPN(numbers);

        if (evalRPNExpression(exp) == 666) return exp;
    }

    return null;
}
