<script lang="ts">
	import Input from "./Input.svelte";
	import type {Expression} from "./logic/expression";
	import Result from "./Result.svelte";
	import Computation from "./Computation.svelte";

	let input: number[] = [];
	let inputText: string = "";
	let activeInput: number[] = [];
	let activeInputText: string = "";
	let result: Expression = null;
	let running: boolean;
</script>

<main>
	<div id="root">
		<div id="input">
			<Input bind:value={input} bind:inputText={inputText} />
		</div>
		<div id="computation">
			<Computation bind:input={input}
						 bind:inputText={inputText}
						 bind:activeInput={activeInput}
						 bind:activeInputText={activeInputText}
						 bind:output={result}
						 bind:running={running} />
		</div>
		<div id="result">
			{#if running || result}
				<Result bind:result={result} bind:inputText={activeInputText}/>
			{/if}
		</div>
	</div>
</main>

<style>
	#root
	{
		margin-left: auto;
		margin-right: auto;
		width: fit-content;
		margin-top: 5em;

		text-align: center;
	}

	#root > *
	{
		margin-bottom: 1em;
	}
</style>
