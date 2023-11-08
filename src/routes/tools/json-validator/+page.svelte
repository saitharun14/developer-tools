<script lang="ts">
	import InputSection from '$lib/InputSection.svelte';
	import OutputSection from '$lib/OutputSection.svelte';
	let inputText = `{
    "store": {
        "book": [
            {
                "category": "reference",
                "author": "Nigel Rees",
                "title": "Sayings of the Century",
                "price": 8e10
            },
            {
                "category": "fiction",
                "author": "Evelyn Waugh",
                "title": "Sword of Honour",
                "price": 12.99
            },
            {
                "category": "fiction",
                "author": "Herman Melville",
                "title": "Moby Dick",
                "isbn": "0-553-21311-3",
                "price": 8e2
            },
            {
                "category": "fiction",
                "author": "J. R. R. Tolkien",
                "title": "The Lord of the Rings",
                "isbn": "0-395-19395-8",
                "price": 22.99
            }
        ],
        "bicycle": {
            "color": "red",
            "price": 19.95
        }
    },
    "expensive": 10
}`;
	let spaceOption: string;
	let outputText: string;
	let preRef: HTMLPreElement;

	const regex = /("([^"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d+)?)/g;
	const syntaxHighlighter = (jsonString: string) => {
		if (/JSON\sParse\serror/.test(jsonString)) {
			return jsonString;
		}
		return jsonString.replace(regex, (match) => {
			let className = 'key';
			let numIf = 1;
			if (/^"/.test(match)) {
				if (/"$/.test(match)) {
					className = 'text-[#9097C0]';
				}
			} else if (/-?\d+(?:\.\d+)?/.test(match)) {
				className = 'text-[#335C81]';
			} else if (/true|false/.test(match)) {
				className = 'text-[#700353]';
			} else className = 'text-orange-500';
			return `<span class=${className}>${match}</span>`;
		});
	};

	const stringify = (json: string, option: string) => {
		try {
			let FormattedJson = JSON.stringify(JSON.parse(json), undefined, +option);
			return FormattedJson;
		} catch (e) {
			return `<p class="text-red-500 font-semibold">${(e as Error).message}</p>`;
		}
	};

	$: {
		if (preRef) {
			preRef.innerHTML = syntaxHighlighter(stringify(inputText, spaceOption));
		}
	}
</script>

<section class="p-5 grid grid-cols-2 grid-rows-1 gap-x-5 h-screen">
	<InputSection bind:inputText />
	<OutputSection bind:outputText isPre={true} bind:preRef>
		<select bind:value={spaceOption}>
			<option value="2" selected>2 spaces</option>
			<option value="4">4 spaces</option>
			<option value="6">6 spaces</option>
			<option value="8">8 spaces</option>
			<option value="10">10 spaces</option>
		</select>
	</OutputSection>
</section>
