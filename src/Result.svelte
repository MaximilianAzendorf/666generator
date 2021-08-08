<script lang="ts">
    import type {Expression} from "./logic/expression";
    import {toInfixString} from "./logic/expression";

    export let inputText: string;
    export let result: Expression;

    $: infix = toInfixString(result);
    $: infixParts = computeInfixParts(infix);
    $: textParts = computeMatchingTextParts(infixParts, inputText);

    function isNumber(text: string): boolean
    {
        return !!text.match(/[0-9]/);
    }

    function computeInfixParts(infix: string): string[]
    {
        return infix?.split(/\b/) || [];
    }

    function computeMatchingTextParts(infixParts: string[], text: string)
    {
        text = text.toUpperCase().replace(/[^A-Z]/, "");
        let result = [];
        let textIndex = 0;
        for (let part of infixParts)
        {
            result.push(isNumber(part) ? text[textIndex++] : "");
        }

        return result;
    }
</script>

<main>
    {#if !result}
        Not yet <span class="l1">.</span><span class="l2">.</span><span class="l3">.</span>
    {:else}
        <div class="yes">Yes</div>
        <div class="because">because:</div>
        <table>
            <tr class="text">
                {#each textParts as part}
                    <td>{part}</td>
                {/each}
                <td class="equals" rowspan="2">=</td>
                <td class="eq666" rowspan="2">666</td>
            </tr>
            <tr class="infix">
                {#each infixParts as part}
                    <td class:number-part={isNumber(part)}>{part}</td>
                {/each}
            </tr>
        </table>
    {/if}
</main>

<style>
    .yes
    {
        font-size: 96pt;
        font-weight: bolder;
    }

    .because
    {
        margin-bottom: 1em;
    }

    table
    {
        margin: auto;
    }

    td
    {
        white-space: nowrap;
    }

    tr.infix td
    {
        padding: 0 0.1em;
    }

    tr.text td:not(.equals):not(.eq666)
    {
        font-size: 0.8em;
    }

    td.number-part
    {
        font-weight: bold;
    }

    td.equals
    {
        font-weight: bold;
        padding-left: 0.25em;
        padding-right: 0.25em;
    }

    td.eq666, td.equals
    {
        line-height: 0;
        font-size: 60pt;
        font-weight: bolder;
    }

    span.l1, span.l2, span.l3
    {
        display: inline-block;
        animation: loading-frames 1.5s linear 0s infinite;
    }

    span.l2 { animation-delay: 0.1s; }
    span.l3 { animation-delay: 0.2s; }

    @keyframes loading-frames
    {
        0% {transform: translate(0, 0);}
        15% {transform: translate(0, -0.15em);}
        30% {transform: translate(0, 0);}
        1000% {transform: translate(0, 0);}
    }
</style>
