<script lang="ts">
	import Tile from '$lib/Tile.svelte';
	import { Warning } from 'postcss';
	let inputValue: string;
	let outputValue: string;
	let inputOption: string;
	let outputOption: string;
	let notValidInput = false;
	const regexMapping: Record<string, RegExp> = {
		decimal: /^\d*$/,
		hex: /^[\da-fA-F]*$/,
		oct: /^[0-8]*$/,
		binary: /^[01]*$/
	};
	const methodsObj: Record<string, number> = {
		decimal: 10,
		hex: 16,
		oct: 8,
		binary: 2
	};

	$: {
		if (inputValue) {
			notValidInput = false;
			if (regexMapping[inputOption].test(inputValue)) {
				const temp = parseInt(inputValue, methodsObj[inputOption]);
				outputValue = temp.toString(methodsObj[outputOption]).toUpperCase();
			} else notValidInput = true;
		} else outputValue = '';
	}
</script>

<section class="p-20 flex flex-col gap-10">
	<section>
		<Tile
			bind:value={inputValue}
			label={'Input'}
			isReadonly={false}
			bind:showWarning={notValidInput}
			haveCopyBtn={false}
		>
			<select name="Input-selection" id="Input-selection" bind:value={inputOption} slot="options">
				<option value="decimal" selected>Decimal</option>
				<option value="hex">Hexadecimal</option>
				<option value="oct">Octal</option>
				<option value="binary">Binary</option>
			</select>
			<svelte:fragment slot="warning">Enter value in correct numerical format</svelte:fragment>
		</Tile>
	</section>
	<section>
		<Tile bind:value={outputValue} label={'Output'}>
			<select
				name="output-selection"
				id="output-selection"
				slot="options"
				bind:value={outputOption}
			>
				<option value="decimal">Decimal</option>
				<option value="hex" selected>Hexadecimal</option>
				<option value="oct">Octal</option>
				<option value="binary">Binary</option>
			</select></Tile
		>
	</section>
</section>
