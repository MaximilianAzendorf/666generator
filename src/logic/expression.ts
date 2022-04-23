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

export function doOp(op: Op, a: number, b: number): number
{
    switch (op)
    {
        case Op.Plus:
            return a + b;
        case Op.Minus:
            return a - b;
        case Op.Multiply:
            return a * b;
        case Op.Divide:
            return a / b;
    }
}

export function opPrecedence(op: Op): number
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
