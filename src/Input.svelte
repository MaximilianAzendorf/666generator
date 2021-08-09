<script lang="ts">
    import {parse} from "./logic/input-parse";
    import type {Expression} from "./logic/expression";
    import {createEventDispatcher} from "svelte";

    export let value: Expression;
    export let inputText: string = "";

    const hitEnter = createEventDispatcher();

    $: inputText = checkAndSanitize(inputText);
    $: value = parse(inputText);

    function checkAndSanitize(text: string): string
    {
        text = text.replace(/&nbsp;$/, " ");
        text = text.replace(/&[^;]+;/g, "");
        text = text.replace(/<[^>]+>/g, "");
        text = text.replace(/[^a-zA-Z ]/g, "");
        text = text.replace(/ $/, "&nbsp;");
        return text;
    }
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
</style>
