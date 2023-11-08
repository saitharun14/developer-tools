<script lang="ts">
	import InputSection from '$lib/InputSection.svelte';
	import OutputSection from '$lib/OutputSection.svelte';
	import { onMount } from 'svelte';
	let inputText: string;
	let inputText2: string;
	let temp1 = 0;
	let temp2 = 0;
	let dialogElement: HTMLDialogElement;
	const func1 = (element: HTMLInputElement) => {
		return {
			update() {
				console.log(element.value);
				console.log('from func1 update');
				temp2++;
			}
		};
	};
	const func2 = (element: HTMLInputElement, params: number) => {
		console.log('from func2');
		return {
			update(params: number) {
				console.log('from func1 update');
				temp1++;
			}
		};
	};

	const handleMouseOver = (
		e: MouseEvent & {
			currentTarget: EventTarget & HTMLDivElement;
		}
	) => {
		dialogElement.show();
		const dialogTop = dialogElement.getBoundingClientRect().top;
		const dialogHeight = dialogElement.clientHeight;
	};
	const handleMouseOut = () => {
		dialogElement.close();
	};
	const temp = 1;
	console.log();
</script>

<section class="p-5 grid grid-cols-2 gap-x-5 h-screen">
	<InputSection bind:inputText />
	<InputSection bind:inputText={inputText2} />
</section>

<input type="text" use:func1 />
<input
	type="text"
	class="mb-10"
	bind:value={temp2}
	on:input={() => console.log('input inside 2')}
/>
