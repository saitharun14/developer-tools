<script lang="ts">
	import Tile from '$lib/Tile.svelte';
	import { onClickCopy } from '$lib/helpers';

	let inputValue: string;
	let currentTs: number;
	let currentDate: Date;
	let localTime: string;
	let utcTime: string;
	let unixTime: string;
	let day: string;
	let dayOfYear: string;
	let isLeapYear: string;
	let option: string;
	let showWarning = false;
	let dateFormatOption: string;

	const relForddmmYYYY =
		/^((([0-2]?\d\.(0?[1-9]|1[0-2])|30\.(0?[4689]|11)|31\.(0?[13578]|1[02])))\.\d{4}|(([0-2]?\d-(0?[1-9]|1[0-2])|30-(0?[4689]|11)|31-(0?[13578]|1[02])))-\d{4}|(([0-2]?\d\/(0?[1-9]|1[0-2])|30\/(0?[4689]|11)|31\/(0?[13578]|1[02])))\/\d{4})$/;
	const relFormmddYYYY =
		/^(((0?[1-9]|1[0-1])\.(0?[1-9]|[12]\d)|(0?[4689]|11)\.30|(0?[13578]|1[02])\.31)\.\d{4}|((0?[1-9]|1[0-1])-(0?[1-9]|[12]\d)|(0?[4689]|11)-30|(0?[13578]|1[02])-31)-\d{4}|((0?[1-9]|1[0-1])\/(0?[1-9]|[12]\d)|(0?[4689]|11)\/30|(0?[13578]|1[02])\/31)\/\d{4})$/;
	const relForYYYYmmdd =
		/(\d{4}\.(((0?[1-9]|1[0-2])\.(0?[1-9]|[1-2]\d))|((0?[469]|11)\.30)|((0?[13578]|1[02])\.31))|\d{4}-(((0?[1-9]|1[0-2])-(0?[1-9]|[1-2]\d))|((0?[469]|11)-30)|((0?[13578]|1[02])-31))|\d{4}\/(((0?[1-9]|1[0-2])\/(0?[1-9]|[1-2]\d))|((0?[469]|11)\/30)|((0?[13578]|1[02])\/31)))/;
	const RegexMapping: Record<string, RegExp> = {
		ddmmyyyy: relForddmmYYYY,
		mmddyyyy: relFormmddYYYY,
		yyyymmdd: relForYYYYmmdd
	};

	const checkLeapYear = (year: number) => {
		return year % 4 === 0;
	};

	const clearOutput = () => {
		inputValue = localTime = utcTime = unixTime = day = dayOfYear = isLeapYear = '';
	};

	const dateProcess = (value: string | number) => {
		const date = new Date(value);
		localTime = date.toLocaleString();
		utcTime = date.toUTCString();
		unixTime = date.valueOf().toString();
		day = date.toLocaleDateString('en-US', { weekday: 'long' });
		dayOfYear = Math.floor(
			(date.valueOf() - new Date(`01/01/${date.getFullYear()}`).valueOf()) / 86400000
		).toString();
		isLeapYear = checkLeapYear(date.getFullYear()) ? 'true' : 'false';
	};

	const handleNow = () => {
		currentTs = Date.now();
		currentDate = new Date(currentTs);
		switch (option) {
			case 'epochMs':
				inputValue = currentTs.toString();
				break;
			case 'epochS':
				inputValue = (currentTs / 1e3).toString();
				break;
			case 'iso':
				inputValue = currentDate.toISOString();
				break;
			case 'text':
				const date = currentDate.getUTCDate();
				const month = currentDate.getUTCMonth() + 1;
				const year = currentDate.getUTCFullYear();
				switch (dateFormatOption) {
					case 'ddmmyyyy':
						inputValue = `${date}/${month}/${year}`;
						break;
					case 'mmddyyyy':
						inputValue = `${month}/${date}/${year}`;
						break;
					case 'yyyymmdd':
						inputValue = `${year}/${month}/${date}`;
						break;
				}
		}
		dateProcess(currentTs);
	};

	const handleInput = () => {
		if (inputValue === '' || inputValue === undefined) clearOutput();
		else {
			switch (option) {
				case 'epochMs':
					dateProcess(+inputValue);
					break;
				case 'epochS':
					dateProcess(+inputValue * 1e3);
					break;
				case 'ISO':
					inputValue = new Date(inputValue).toISOString();
					dateProcess(inputValue);
				case 'text':
					switch (dateFormatOption) {
						case 'ddmmyyyy':
							if (relForddmmYYYY.test(inputValue)) {
								showWarning = false;
								const dateElementList = inputValue.split(/[\.\/-]/);
								dateProcess(`${dateElementList[1]}/${dateElementList[0]}/${dateElementList[2]}`);
							} else showWarning = true;
							break;
						case 'mmddyyyy':
							if (relFormmddYYYY.test(inputValue)) {
								showWarning = false;
								dateProcess(inputValue);
							} else showWarning = true;
							break;
						case 'yyyymmdd':
							if (relForYYYYmmdd.test(inputValue)) {
								showWarning = false;
								dateProcess(inputValue);
							} else showWarning = true;
					}
					break;
			}
		}
	};
</script>

<section class="p-5 h-screen overflow-y-scroll">
	<section class="flex flex-col gap-3">
		<div class="flex gap-5 items-center">
			<label for="input" class="text-xl font-semibold">Input:</label>
			<button
				type="button"
				class="bg-blue-400 text-white px-[14px] py-2 font-semibold rounded-md"
				on:click={handleNow}>Now</button
			>
			<button
				type="button"
				class="bg-blue-400 text-white px-[14px] py-2 font-semibold rounded-md"
				on:click={() => clearOutput()}>Clear</button
			>
			<select name="options" bind:value={option} on:change={() => clearOutput()}>
				<option value="epochMs">Epoch in Milliseconds</option>
				<option value="epochS">Epoch in seconds</option>
				<option value="iso">ISO 8601</option>
				<option value="text">Enter the date</option>
			</select>
			{#if option === 'text'}
				<select name="date-formats" bind:value={dateFormatOption} on:change={clearOutput}>
					<option value="ddmmyyyy">DDMMYYYY</option>
					<option value="mmddyyyy">MMDDYYYY</option>
					<option value="yyyymmdd">YYYYMMDD</option>
				</select>
			{/if}
		</div>
		<input
			class={`w-full bg-black text-white py-2 px-4 ring-1 ring-inset rounded-xl ${
				showWarning ? 'ring-red-600 focus:outline-none' : ''
			}`}
			name={'input'}
			bind:value={inputValue}
			on:input={handleInput}
		/>
		<Tile bind:value={localTime} label="Local Date & Time" />
		<Tile bind:value={utcTime} label="UTC Time" />
		<Tile bind:value={unixTime} label="Unix Time in seconds" />
		<Tile bind:value={day} label="Day" />
		<Tile bind:value={dayOfYear} label="Day of The Year" />
		<Tile bind:value={isLeapYear} label="Leap Year? " />
	</section>
</section>
