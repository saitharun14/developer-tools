<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	let sidebar: HTMLElement;
	onMount(() => {
		const linkElementsList = sidebar.querySelectorAll('a');
		linkElementsList.forEach((linkElement) => {
			if (linkElement.pathname === $page.route.id)
				linkElement.classList.add('bg-blue-800', 'text-white');
		});
	});
	const handleSidebarClick = (
		event: MouseEvent & {
			currentTarget: EventTarget & HTMLAnchorElement;
		}
	) => {
		const linkElementsList = sidebar?.querySelectorAll('a');
		linkElementsList?.forEach((linkElement) => {
			linkElement.href === event.currentTarget.href
				? linkElement.classList.add('bg-blue-800', 'text-white')
				: linkElement.classList.remove('bg-blue-800', 'text-white');
		});
	};
</script>

<section class="grid grid-cols-[calc(100%/6)_1fr] h-max">
	<section
		class="flex flex-col py-5 [&>a]:px-5 overflow-hidden border-r border-gray-300 h-screen [&>a]:relative [&>a]:py-3 [&>a]:after:content-[''] [&>a]:after:w-screen [&>a]:after:h-[1px] [&>a]:after:bg-slate-200 [&>a]:after:absolute [&>a]:after:bottom-0 [&>a]:after:-left-3"
		id="sidebar-section"
		bind:this={sidebar}
	>
		<a on:click={handleSidebarClick} href="/" class="font-semibold">Character / Word Counter</a>
		<a
			on:click={handleSidebarClick}
			href="/tools/json-validator"
			class="font-semibold before:content-[''] before:w-screen before:h-[1px] before:bg-slate-200 before:absolute before:top-0 before:-left-3"
			>JSON Validator & Formatter</a
		>
		<a on:click={handleSidebarClick} href="/tools/color-converter" class="font-semibold"
			>Color Converter</a
		>
		<a on:click={handleSidebarClick} href="/tools/string-converter" class="font-semibold"
			>String Converter</a
		>
		<a on:click={handleSidebarClick} href="/tools/url-parser" type="button" class="font-semibold"
			>Url Parser</a
		>
		<a on:click={handleSidebarClick} href="/tools/diff-viewer" type="button" class="font-semibold"
			>Diff Viewer</a
		>
		<a
			on:click={handleSidebarClick}
			href="/tools/number-converter"
			type="button"
			class="font-semibold">Number Converter</a
		>
	</section>
	<div>
		<slot />
	</div>
</section>
