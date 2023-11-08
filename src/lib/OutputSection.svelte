<script lang="ts">
	import { onClickCopy } from './helpers';
	export let outputText: string;
	export let preRef: HTMLPreElement | undefined;
	export let isPre = false;
</script>

<section class="flex flex-col h-full gap-4 overflow-hidden">
	<div class="flex justify-between items-center px-3">
		<label class="text-2xl font-semibold" for="output">Output: </label>
		<slot />
		<button
			type="button"
			class="bg-blue-400 text-white px-[14px] py-2 font-semibold rounded-md"
			on:click={() => onClickCopy(outputText)}>Copy</button
		>
	</div>
	{#if isPre === true}
		<pre
			bind:this={preRef}
			class="h-full bg-black text-white p-4 border border-slate-200 rounded-xl whitespace-pre-wrap overflow-y-scroll block"
		/>
	{:else}
		<textarea
			placeholder="Enter the text....."
			spellcheck="false"
			bind:value={outputText}
			name="output"
			id="output"
			class="h-full bg-black text-white p-5 border border-slate-200 rounded-xl overflow-y-scroll"
			disabled
		/>
	{/if}
</section>
