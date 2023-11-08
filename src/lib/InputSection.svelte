<script lang="ts">
	export let inputText: string;
</script>

<section class="flex flex-col h-full gap-4">
	<div class="flex justify-between items-center px-5">
		<div class="flex gap-8 items-center">
			<label class="text-2xl font-semibold" for="input">Input: </label>
			<button
				type="button"
				class="bg-blue-400 text-white px-[14px] py-2 font-semibold rounded-md"
				on:click={() => (inputText = '')}>Clear</button
			>
		</div>
		<slot name="options" />
	</div>
	<textarea
		spellcheck="false"
		bind:value={inputText}
		placeholder="Enter the text....."
		name="input"
		id="input"
		class="h-full bg-black text-white p-5 border border-slate-200 rounded-xl overflow-y-scroll"
	/>
</section>
