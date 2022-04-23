<script lang="ts">
    import {checkAndSanitize, parse} from "./logic/input-parse";
    import {createEventDispatcher} from "svelte";
    import type {Expression} from "./logic/expression";

    export let value: Expression;
    export let inputText: string = "";

    const hitEnter = createEventDispatcher();

    let rawInputText: string = "";

    $: rawInputText = checkAndSanitize(rawInputText);
    $: inputText = checkAndSanitize(rawInputText, true);
    $: value = parse(inputText);
</script>

<main>
    <span class="input-text">
        Is <span class="name-input" spellcheck="false" bind:innerHTML={rawInputText} contenteditable="true" /> the anti-christ?
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
</style>
