<script lang="ts">
	import InputSection from '$lib/InputSection.svelte';
	import OutputSection from '$lib/OutputSection.svelte';
	import { onClickCopy } from '$lib/helpers';

	const regex = /(?:[^-_]*)/g;
	let inputText = 'welcome-hope-you-have-a-great-day';
	let outputText: string;
	let caseOption: string;
	const caseSeparatorMapping: Record<string, string> = {
		'camel-case': '',
		'flat-case': '',
		'upper-flat-case': '',
		'pascal-case': '',
		'snake-case': '_',
		'constant-case': '_',
		'kebab-case': '-',
		'screaming-kebab-case': '-',
		'train-case': '-'
	};
	$: {
		let sanitizedArray = inputText.match(regex)?.filter((word) => word !== '');
		let finalArray: Array<string> = [];
		sanitizedArray?.forEach((word, index) => {
			let tempWord = '';
			if (index === 0) {
				if (caseOption === 'pascal-case' || caseOption === 'train-case')
					tempWord = word[0].toUpperCase() + word.substring(1).toLowerCase();
				else if (['upper-flat-case', 'constant-case', 'screaming-kebab-case'].includes(caseOption))
					tempWord = word.toUpperCase();
				else tempWord = word.toLowerCase();
				finalArray.push(tempWord);
			} else {
				if (['camel-case', 'pascal-case', 'train-case'].includes(caseOption))
					tempWord = word[0].toUpperCase() + word.substring(1).toLowerCase();
				else if (['upper-flat-case', 'constant-case', 'screaming-kebab-case'].includes(caseOption))
					tempWord = word.toUpperCase();
				else tempWord = word.toLowerCase();
				finalArray.push(tempWord);
			}
		});
		outputText = finalArray.join(caseSeparatorMapping[caseOption]);
	}
</script>

<section class="p-5 grid grid-cols-2 gap-x-5 h-screen">
	<InputSection bind:inputText />
	<OutputSection bind:outputText preRef={undefined}>
		<select name="filter-options" bind:value={caseOption}>
			<option value="camel-case" selected>camelCase</option>
			<option value="flat-case">flatcase</option>
			<option value="upper-flat-case">UPPERFLATCASE</option>
			<option value="pascal-case">PascalCase</option>
			<option value="snake-case">snake_case</option>
			<option value="constant-case">CONSTANT_CASE</option>
			<option value="kebab-case">kebab-case</option>
			<option value="screaming-kebab-case">SCREAMING-KEBAB-CASE</option>
			<option value="train-case">Train-Case</option>
		</select>
	</OutputSection>
</section>
