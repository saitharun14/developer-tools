<script lang="ts">
	import InputSection from '$lib/InputSection.svelte';
	import OutputTile from '$lib/Tile.svelte';
	import { onClickCopy } from '$lib/helpers';

	let inputText = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
	let jsonOutput = '';
	let temp = 'hi'.match('');
	let protocol: string;
	let domain: string;
	let query: string;
	let path: string;
	$: {
		protocol = /^(.+?):\/\//.exec(inputText)?.at(1) ?? '';
		domain = /:\/\/(.+?)\//.exec(inputText)?.at(1) ?? /:\/\/(.+)/.exec(inputText)?.at(1) ?? '';
		query = /\w\?(.+)/.exec(inputText)?.at(1) ?? '';
		path = /\w\/(.+)\?/.exec(inputText)?.at(1) ?? /\w\/(.+)/.exec(inputText)?.at(1) ?? '';
		if (query !== '') {
			jsonOutput = '{\n';
			query
				.split('&')
				.forEach(
					(param) => (jsonOutput += `\t"${param.split('=')[0]}": "${param.split('=')[1]}";\n`)
				);
			jsonOutput += '}';
		} else jsonOutput = '';
	}
</script>

<section>
	<section class="p-5 grid grid-cols-2 gap-x-5 h-screen">
		<InputSection bind:inputText />
		<section class="flex flex-col h-full gap-4">
			<div class="flex flex-col gap-4 px-3 h-full">
				<label class="text-2xl font-semibold" for="output">Output: </label>
				<div class="flex flex-col gap-5 h-full">
					<OutputTile bind:value={protocol} label="Protocol" />
					<OutputTile bind:value={domain} label="Domain" />
					<OutputTile bind:value={path} label="Path" />
					<OutputTile bind:value={query} label="Query" />
					<div class="flex flex-col gap-2 h-full">
						<label for="JSON Format" class="text-lg font-semibold">JSON Format: </label>
						<div class="flex gap-3 h-full">
							<textarea
								class="w-full h-full bg-black text-white p-5 ring-1 ring-inset ring-slate-200 rounded-xl focus:ring-2 focus:ring-inset focus:ring-indigo-600"
								readonly
								name="JSON Format"
								bind:value={jsonOutput}
							/>
							<button
								type="button"
								class="bg-blue-400 text-white px-[14px] py-2 font-semibold rounded-md w-fit h-fit"
								on:click={() => onClickCopy(jsonOutput)}>Copy</button
							>
						</div>
					</div>
				</div>
			</div>
		</section>
	</section>
</section>
