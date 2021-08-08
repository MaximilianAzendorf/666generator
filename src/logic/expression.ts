import {every} from "lodash";

export enum Op
{
    Plus = "+",
    Minus = "-",
    Multiply = '*',
    Divide = '/',
}

export const OpArray = Object.values(Op);

export type Atom = number | Op;

export type Expression = Atom[];

export function evalExpressionStack(expression: Expression): number[]
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

            switch (atom as Op)
            {
                case Op.Plus:
                    stack.push(stack.pop() + stack.pop());
                    break;
                case Op.Minus:
                    stack.push(-stack.pop() + stack.pop());
                    break;
                case Op.Multiply:
                    stack.push(stack.pop() * stack.pop());
                    break;
                case Op.Divide:
                    stack.push(1 / stack.pop() * stack.pop());
                    break;
            }
        }
    }

    return stack;
}

export function classifyExpression(expression: Expression): "valid" | "incomplete" | "invalid"
{
    let stack = evalExpressionStack(expression);

    if (!stack || stack.length == 0 || !every(stack, Number.isInteger)) return "invalid";
    if (stack.length == 1) return "valid";
    return "incomplete";
}

export function evalExpression(expression: Expression): number
{
    let stack = evalExpressionStack(expression);
    if (!stack || stack.length != 1) return null;

    return stack[0];
}

export function toInfixString(expression: Expression): string
{
    if (!expression) return null;

    function precedenceOf(op: Op): number
    {
        switch (op)
        {
            case Op.Plus:
            case Op.Minus:
                return 10;
            case Op.Multiply:
            case Op.Divide:
                return 20;
        }
    }

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
            let precedence = precedenceOf(atom);
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
