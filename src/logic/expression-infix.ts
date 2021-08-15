import type {Expression, Op} from "./expression";
import {opPrecedence} from "./expression";

export function infixToRPN(expression: Expression): Expression
{
    let result: Expression = [];
    let stack: Op[] = [];

    function stackTop() { return stack[stack.length - 1]; }

    for (let atom of expression)
    {
        if (typeof atom == "number")
        {
            result.push(atom);
            continue;
        }

        while(stack.length > 0 && opPrecedence(atom) <= opPrecedence(stackTop()))
        {
            result.push(stack.pop());
        }

        stack.push(atom);
    }

    while (stack.length > 0) result.push(stack.pop());

    return result;
}
