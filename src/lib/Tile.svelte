<script lang="ts">
	import { onClickCopy } from './helpers';

	export let value: string;
	export let label = '';
	export let showWarning = false;
	export let isReadonly = true;
	export let handleInput = () => {};
</script>

<div class="relative">
	<div class="flex flex-col gap-2">
		<div class="flex gap-10">
			{#if label !== ''}
				<label for={label.toLowerCase()} class="text-lg font-semibold">{`${label}: `}</label>
			{/if}
			<slot name="options" />
		</div>
		<div class="flex gap-3">
			<input
				class={`w-full bg-black text-white py-2 px-4 ring-1 ring-inset rounded-xl ${
					showWarning ? 'ring-red-600 focus:outline-none' : ''
				}`}
				name={label.toLowerCase()}
				readonly={isReadonly}
				bind:value
				on:input={handleInput}
			/>
			<button
				type="button"
				class="bg-blue-400 text-white px-[14px] py-2 font-semibold rounded-md"
				on:click={() => onClickCopy(value)}>Copy</button
			>
		</div>
	</div>
	{#if showWarning === true}
		<p class="text-red-600 absolute text-sm left-5"><slot name="warning" /></p>
	{/if}
</div>
