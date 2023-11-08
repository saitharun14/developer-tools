<script lang="ts">
	import InputSection from '$lib/InputSection.svelte';
	import OutputSection from '$lib/OutputSection.svelte';

	let inputText: string;
	let outputText: string;
	let option: string;
	let delimiterValue: string;
	let count = 0;
	const textFormatter = (delimiter: string) => {
		const textArray = inputText.split(delimiter);
		count = textArray[textArray.length - 1] === '' ? textArray.length - 1 : textArray.length;
		outputText =
			delimiter !== ''
				? inputText.replaceAll(delimiter, '\n')
				: inputText.replaceAll(delimiter, '\n').substring(1);
	};
	$: {
		inputText = inputText ?? '';
		switch (option) {
			case '':
				count = inputText.length;
				textFormatter('');
				break;
			case ' ':
				textFormatter(' ');
				break;
			case 'cst':
				if (delimiterValue === undefined) {
					count = inputText.length;
					textFormatter('');
				} else textFormatter(delimiterValue);
		}
	}
</script>

<section class="p-5 grid grid-cols-2 gap-x-5 h-screen">
	<InputSection bind:inputText>
		<svelte:fragment slot="options">
			<select name="filter-options" id="filter-options" bind:value={option}>
				<option value="" selected>Character</option>
				<option value=" ">Word</option>
				<option value="cst">Custom delimiter</option>
			</select>
			<!-- TODO: Try implementing the svelte actions for the delimiter input -->
			<input
				type="text"
				placeholder="delimiter"
				class={`w-24 p-0.5 rounded-md ${option !== 'cst' ? 'invisible' : 'visible'}`}
				bind:value={delimiterValue}
			/>
		</svelte:fragment>
	</InputSection>
	<OutputSection bind:outputText preRef={undefined}>
		<div class="flex gap-2 text-lg font-semibold items-center">
			<label for="count">Count:</label>
			<div>{count}</div>
		</div>
	</OutputSection>
</section>
