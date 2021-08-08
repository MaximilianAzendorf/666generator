<script lang="ts">
    import {parse} from "./logic/input-parse";
    import type {Expression} from "./logic/expression";

    export let value: Expression;
    export let inputText: string = "";

    $: value = parse(inputText);
</script>

<main>
    <span class="input-text">
        Is <span class="name-input" spellcheck="false" bind:innerHTML={inputText} contenteditable="true" /> the anti-christ?
    </span>
</main>

<style>
    .input-text
    {
        font-weight: bold;
        font-size: 36pt;
    }

    .name-input
    {
        text-align: left;
        display: inline-block;
        min-width: 3em;
        border-bottom: 2px solid var(--muted-white);
        transition: border var(--transition);
    }

    .name-input:focus
    {
        outline: 0 solid transparent;
        border-bottom: 2px solid white;
    }

    .name-input::selection
    {
        background-color: white;
        color: var(--primary);
    }
</style>
