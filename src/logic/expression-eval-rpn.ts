import {every} from "lodash";
import type {Expression} from "./expression";
import {doOp, Op, opPrecedence} from "./expression";

export function evalRPNExpressionStack(expression: Expression): number[]
{
    if (!expression) return null;

    let stack: number[] = [];

    for (let atom of expression)
    {
        if (typeof atom === "number")
        {
            stack.push(atom);
        }
        else
        {
            if (stack.length < 2) return null;

            let b = stack.pop();
            let a = stack.pop();

            stack.push(doOp(atom as Op, a, b));
        }
    }

    return stack;
}

export function evalRPNExpression(expression: Expression): number
{
    let stack = evalRPNExpressionStack(expression);
    if (!stack || stack.length != 1) return null;

    return stack[0];
}

export function classifyRPNExpression(expression: Expression): "valid" | "incomplete" | "invalid"
{
    let stack = evalRPNExpressionStack(expression);

    if (!stack || stack.length == 0 || !every(stack, Number.isInteger)) return "invalid";
    if (stack.length == 1) return "valid";
    return "incomplete";
}

export function RPNToString(expression: Expression): string
{
    if (!expression) return null;

    const stack: {precedence: number, text: string}[] = [];

    for (let atom of expression)
    {
        if (typeof atom == "number")
        {
            stack.push({
                precedence: Number.POSITIVE_INFINITY,
                text: atom.toString()
            });
        }
        else
        {
            let precedence = opPrecedence(atom);
            let right = stack.pop();
            let left = stack.pop();

            if (right.precedence < precedence
                || ((atom == Op.Minus || atom == Op.Divide) && right.precedence == precedence))
            {
                right.text = `(${right.text})`;
            }

            if (left.precedence < precedence)
            {
                left.text = `(${left.text})`;
            }

            stack.push({
                precedence: precedence,
                text: `${left.text} ${atom} ${right.text}`
            });
        }
    }

    return stack[0].text;
}
