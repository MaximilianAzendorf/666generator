<script lang="ts">
    import {find666} from "./logic/expression-generator";
    import {scoreExpressionRPN} from "./logic/expression-score";
    import type {Expression} from "./logic/expression";

    export let input: number[];
    export let inputText: string;
    export let activeInput: number[];
    export let activeInputText: string;
    export let output: Expression;
    export let outputScore: number;
    export let running: boolean;

    $: input, stopTrying();
    $: outputScore = scoreExpressionRPN(output);

    const STEP_MILLISECONDS = 20;
    let abort: boolean = false;

    function try666(): Expression
    {
        return find666(activeInput, STEP_MILLISECONDS, outputScore < 1);
    }

    function tryForever(): void
    {
        let newResult = try666();
        if (scoreExpressionRPN(newResult) < outputScore)
        {
            output = newResult;
        }

        if (!abort)
        {
            setTimeout(() => tryForever(), 0);
        }
    }

    function stopTrying(): void
    {
        abort = true;
        running = false;
    }

    export function startTrying(): void
    {
        output = null;
        abort = false;
        running = true;
        activeInput = [...input];
        activeInputText = inputText;
        tryForever();
    }
</script>

<main>
    <button class="start" disabled={running || input.length == 0} on:click={startTrying}>Let's find out</button>
    <button class="stop" class:collapsed={!running} disabled={!running} on:click={stopTrying}>Stop</button>
</main>

<style>
    button.stop
    {
        transition: max-width 0.3s ease-in;
    }
    button.stop.collapsed
    {
        display: none;
        max-width: 0;
    }

    button.stop:not(.collapsed)
    {
        display: inline-block;
        animation: stop-btn-animation 0.75s cubic-bezier(.01,.66,.04,1);
    }

    @keyframes stop-btn-animation
    {
        0% { max-width: 0; }
        100% { max-width: 2.7em; }
    }
</style>
