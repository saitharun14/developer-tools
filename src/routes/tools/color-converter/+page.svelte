<script lang="ts">
	import { onClickCopy } from '$lib/helpers';
	import InputTile from '$lib/Tile.svelte';
	import { Warning } from 'postcss';

	const ValidRgb =
		/^(?<r>\d{1,2}|1\d{}|2[0-4]\d|25[0-5]),\s?(?<g>\d{1,2}|1\d{}|2[0-4]\d|25[0-5]),\s?(?<b>\d{1,2}|1\d{}|2[0-4]\d|25[0-5])([,\/]\s*(?<a>0?\.\d{1,3}|1))?$/;
	const ValidHex = /^#(?:[\da-f]{3}|[\da-f]{4}|[\da-f]{6}|[\da-f]{8})$/i;
	const ValidHsl =
		/^(?:\d{1,2}|[12]\d{2}|3[0-5]\d|360),\s?(?:\d{1,2}(?:\.\d)?|100)%,\s?(?:\d{1,2}(\.\d)?|100)%(,\s?(?:0\.\d{1,3}|1))?$/;
	let rgb = '255, 255, 255';
	let hex = '#ffffff';
	let hsl = '0, 0%, 100%';
	let notRgb = false;
	let notHsl = false;
	let notHex = false;
	// let rgbCOunt = 0;
	// let hexCOunt = 0;
	// let hslCOunt = 0;
	// const setRgb = (val: string) => {
	//   rgb = val;
	// };
	// const setHex = (val: string) => {
	//   hex = val;
	// };
	// const setHsl = (val: string) => {
	//   hsl = val;
	// };
	const toHexCheckLength = (val: string) => (val.length === 1 ? '0' + val : val);

	const rbgTOHex = (rgbValue: string) => {
		const colorObj = ValidRgb.exec(rgbValue)?.groups as { [key: string]: string };
		let r = (+colorObj.r).toString(16),
			g = (+colorObj.g).toString(16),
			b = (+colorObj.b).toString(16),
			a = Math.round(+colorObj.a * 255).toString(16);
		return (
			'#' +
			toHexCheckLength(r) +
			toHexCheckLength(g) +
			toHexCheckLength(b) +
			toHexCheckLength(a !== 'NaN' ? a : '')
		);
	};

	const hexToHsl = (hexValue: string) => {
		let tempRgb = '';
		hexValue = hexValue.toLowerCase();
		if (hexValue.length === 4) {
			tempRgb += `${+('0x' + hexValue[1] + hexValue[1])}, `;
			tempRgb += `${+('0x' + hexValue[2] + hexValue[2])}, `;
			tempRgb += `${+('0x' + hexValue[3] + hexValue[3])}`;
		}
		if (hexValue.length === 5) {
			tempRgb += `${+('0x' + hexValue[1] + hexValue[1])}, `;
			tempRgb += `${+('0x' + hexValue[2] + hexValue[2])}, `;
			tempRgb += `${+('0x' + hexValue[3] + hexValue[3])}, `;
			tempRgb += `${+('0x' + hexValue[4] + hexValue[4])}`;
		}
		if (hexValue.length === 7) {
			tempRgb += `${+('0x' + hexValue[1] + hexValue[2])}, `;
			tempRgb += `${+('0x' + hexValue[3] + hexValue[4])}, `;
			tempRgb += `${+('0x' + hexValue[5] + hexValue[6])}`;
		}
		if (hexValue.length === 9) {
			tempRgb += `${+('0x' + hexValue[1] + hexValue[2])}, `;
			tempRgb += `${+('0x' + hexValue[3] + hexValue[4])}, `;
			tempRgb += `${+('0x' + hexValue[5] + hexValue[6])}, `;
			tempRgb += `${+('0x' + hexValue[7] + hexValue[8])}`;
		}
		let r: number,
			g: number,
			b: number,
			a = '';

		let colorList = tempRgb.split(', ');
		r = +colorList[0] / 255;
		g = +colorList[1] / 255;
		b = +colorList[2] / 255;
		if (colorList.length === 4) {
			a = (+colorList[3] / 255).toFixed(3);
		}

		let cMax = Math.max(r, g, b),
			cMin = Math.min(r, g, b),
			delta = cMax - cMin,
			h: number,
			s: number,
			l: number;
		if (delta === 0) h = 0;
		else if (cMax === r) h = ((g - b) / delta) % 6;
		else if (cMax === g) h = (b - r) / delta + 2;
		else h = (r - g) / delta + 4;
		h = Math.round(h * 60);
		if (h < 0) h += 360;
		l = (cMax + cMin) / 2;
		s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
		s = +(s * 100).toFixed(1);
		l = +(l * 100).toFixed(1);
		return `${h}, ${s}%, ${l}%${a === '' ? '' : ', ' + a}`;
	};

	const hslTORgb = (hslValue: string) => {
		let list = hslValue.split(',');
		let h = +list[0];
		let s = +list[1].substring(0, list[1].length - 1) / 100;
		let l = +list[2].substring(0, list[2].length - 1) / 100;
		let a = '';
		if (list.length === 4) a = list[3];
		let c = (1 - Math.abs(2 * l - 1)) * s,
			x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
			m = l - c / 2,
			r = 0,
			g = 0,
			b = 0;
		if (0 <= h && h < 60) {
			r = c;
			g = x;
			b = 0;
		} else if (60 <= h && h < 120) {
			r = x;
			g = c;
			b = 0;
		} else if (120 <= h && h < 180) {
			r = 0;
			g = c;
			b = x;
		} else if (180 <= h && h < 240) {
			r = 0;
			g = x;
			b = c;
		} else if (240 <= h && h < 300) {
			r = x;
			g = 0;
			b = c;
		} else if (300 <= h && h < 360) {
			r = c;
			g = 0;
			b = x;
		}
		r = Math.round((r + m) * 255);
		g = Math.round((g + m) * 255);
		b = Math.round((b + m) * 255);
		return `${r}, ${g}, ${b}${a !== '' ? ', ' + a : a}`;
	};

	const handleRgbInput = () => {
		if (ValidRgb.test(rgb)) {
			notRgb = false;
			hex = rbgTOHex(rgb);
			hsl = hexToHsl(hex);
		} else notRgb = true;
	};
	const handleHexInput = () => {
		if (ValidHex.test(hex)) {
			notHex = false;
			hsl = hexToHsl(hex);
			rgb = hslTORgb(hsl);
		} else notHex = true;
	};
	const handleHslInput = () => {
		if (ValidHsl.test(hsl)) {
			notHsl = false;
			rgb = hslTORgb(hsl);
			hex = rbgTOHex(hsl);
		} else notHsl = true;
	};
</script>

<section class="flex flex-col gap-7 p-10">
	<InputTile
		bind:value={rgb}
		isReadonly={false}
		bind:showWarning={notRgb}
		handleInput={handleRgbInput}
	>
		<svelte:fragment slot="warning">Incorrect RGB format</svelte:fragment>
	</InputTile>
	<InputTile
		bind:value={hex}
		isReadonly={false}
		bind:showWarning={notHex}
		handleInput={handleHexInput}
	>
		<svelte:fragment slot="warning">Incorrect HEX format</svelte:fragment>
	</InputTile>
	<InputTile
		bind:value={hsl}
		isReadonly={false}
		bind:showWarning={notHsl}
		handleInput={handleHslInput}
	>
		<svelte:fragment slot="warning">Incorrect HSL format</svelte:fragment>
	</InputTile>
</section>
