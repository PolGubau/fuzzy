import type { Data } from "./data.types";

export const rawData: Data = {
	name: "@polgubau/utils",
	version: "1.0.1",
	utils: [
		{
			name: "getDocumentDirection",
			description:
				"Get the document direction (ltr or rtl) based on the current document.",
			category: "accessibility",
			tags: ["accessibility", "document", "direction"],
			author: "PolGubau",
			since: "1.0.0",
			lastUpdated: "2025-03-15",
			type: "sync",
			compatibility: "browser",
			example: [
				{
					code: "getDocumentDirection()",
					output: '"ltr"',
				},
			],
			props: [],
			return: {
				type: "enum",
				options: ["ltr", "rtl"],
				description: "The document direction (ltr or rtl).",
			},
			error: null,
			notes:
				"This function requires a browser environment with a valid document object.",
		},
		{
			name: "getRandomInt",
			description: "Get a random integer between min and max (inclusive).",
			category: "random",
			tags: ["random", "number", "integer"],
			author: "PolGubau",
			since: "1.0.4",
			lastUpdated: "2025-03-17",
			type: "sync",
			compatibility: "universal",
			example: [
				{
					code: "getRandomInt(1, 10)",
					output: "7",
				},
			],
			props: [
				{
					name: "min",
					type: "number",
					description: "Minimum value (inclusive).",
				},
				{
					name: "max",
					type: "number",
					description: "Maximum value (inclusive).",
				},
			],
			return: {
				type: "number",
				description: "A random integer between min and max.",
			},
			error: null,
			notes: "The function assumes min ≤ max.",
		},
		{
			name: "isFalsy",
			description: "Checks if the value is falsy.",
			category: "validations",
			tags: ["validation", "falsy", "boolean"],
			author: "Polgubau",
			since: "1.0.0",
			lastUpdated: "2025-03-17",
			type: "sync",
			compatibility: "universal",
			example: [
				{
					code: "isFalsy(0)",
					output: "true",
				},
				{
					code: "isFalsy('Hello')",
					output: "false",
				},
				{
					code: "isFalsy(false)",
					output: "true",
				},
				{
					code: "isFalsy('')",
					output: "true",
				},
			],
			props: [
				{
					name: "value",
					type: "any",
					description: "The value to check.",
				},
			],
			return: {
				type: "boolean",
				description: "Returns `true` if the value is falsy, otherwise `false`.",
			},
			error: null,
			notes:
				"Falsy values include: `false`, `null`, `undefined`, `0`, `NaN`, and an empty string.",
		},
		{
			name: "hasValue",
			description: "Checks if a value is truthy, meaning it is not falsy.",
			category: "validations",
			tags: ["validation", "truthy", "boolean"],
			author: "Polgubau",
			since: "1.0.0",
			lastUpdated: "2025-03-17",
			type: "sync",
			compatibility: "universal",
			example: [
				{
					code: "hasValue('Hello')",
					output: "true",
				},
				{
					code: "hasValue(null)",
					output: "false",
				},
			],
			props: [
				{
					name: "value",
					type: "any",
					description: "The value to check.",
				},
			],
			return: {
				type: "boolean",
				description:
					"Returns `true` if the value is truthy, otherwise `false`.",
			},
			error: null,
			notes:
				"Truthy values are those that are not falsy, like `1`, `'Hello'`, or `{}`.",
		},

		{
			name: "isEmptyArray",
			description: "Checks if an array is empty.",
			category: "validations",
			tags: ["validation", "array", "empty"],
			author: "Polgubau",
			since: "1.0.0",
			lastUpdated: "2025-03-17",
			type: "sync",
			compatibility: "universal",
			example: [
				{
					code: "isEmptyArray([])",
					output: "true",
				},
				{
					code: "isEmptyArray([1, 2, 3])",
					output: "false",
				},
			],
			props: [
				{
					name: "arr",
					type: "any[]",
					description: "The array to check.",
				},
			],
			return: {
				type: "boolean",
				description: "Returns `true` if the array is empty, otherwise `false`.",
			},
			error: null,
			notes:
				"The function checks if the value is actually an array and if it is empty.",
		},
		{
			name: "getRandomArrayItem",
			description: "Get a random item from a given array.",
			category: "random",
			tags: ["random", "array", "utilities"],
			author: "PolGubau",
			since: "1.0.4",
			lastUpdated: "2025-03-17",
			type: "sync",
			compatibility: "universal",
			example: [
				{
					code: "getRandomArrayItem([1, 2, 3, 4, 5])",
					output: "3 // (random value, could be any from the array)",
				},
				{
					code: "getRandomArrayItem(['apple', 'banana', 'cherry'])",
					output: '"banana" // (random value, could be any from the array)',
				},
			],
			props: [
				{
					name: "array",
					type: "T[]",
					description: "The input array to pick a random item from.",
				},
			],
			return: {
				type: "T | undefined",
				description:
					"A random item from the array, or undefined if the array is empty.",
			},
			error: null,
			notes:
				"This function returns `undefined` if the input array is empty or not a valid array.",
		},
		{
			name: "getRandomFloat",
			description: "Get a random floating-point number between min and max.",
			category: "random",
			tags: ["random", "number", "float"],
			author: "PolGubau",
			since: "1.0.4",
			lastUpdated: "2025-03-17",
			type: "sync",
			compatibility: "universal",
			example: [
				{
					code: "getRandomFloat(1, 5)",
					output: "3.428571",
				},
			],
			props: [
				{ name: "min", type: "number", description: "Minimum value." },
				{ name: "max", type: "number", description: "Maximum value." },
			],
			return: {
				type: "number",
				description: "A random float between min and max.",
			},
			error: null,
			notes: "The function assumes min < max.",
		},
		{
			name: "getRandomBoolean",
			description: "Get a random boolean value (true or false).",
			category: "random",
			tags: ["random", "boolean"],
			author: "PolGubau",
			since: "1.0.4",
			lastUpdated: "2025-03-17",
			type: "sync",
			compatibility: "universal",
			example: [
				{
					code: "getRandomBoolean()",
					output: "true",
				},
			],
			props: [],
			return: { type: "boolean", description: "A random boolean value." },
			error: null,
			notes: "The probability of true and false is 50% each.",
		},
		{
			name: "getRandomBooleanArray",
			description: "Get an array of randomized boolean values (true or false).",
			category: "random",
			tags: ["random", "boolean", "array"],
			author: "PolGubau",
			since: "1.0.4",
			lastUpdated: "2025-03-17",
			type: "sync",
			compatibility: "universal",
			example: [
				{
					code: "getRandomBooleanArray(3)",
					output: "[true, false, true]",
				},
			],
			props: [
				{
					name: "length",
					type: "number",
					default: null,
					required: true,
					description: "The length of the array to generate.",
				},
			],
			return: { type: "boolean", description: "A random boolean value." },
			error: null,
			notes:
				"The probability of true and false is 50% each, you need to specify the length.",
		},
		{
			name: "slugify",
			description: "Convert a string into a URL-friendly slug.",
			category: "strings",
			tags: ["string", "slug", "format"],
			author: "PolGubau",
			since: "1.0.4",
			lastUpdated: "2025-03-17",
			type: "sync",
			compatibility: "universal",
			example: [
				{
					code: "slugify('Hello World!')",
					output: '"hello-world"',
				},
				{
					code: "slugify('Español está bien', { separator: '_' })",
					output: '"espanol_esta_bien"',
				},
				{
					code: "slugify('React & Svelte', { lowercase: false })",
					output: '"React-Svelte"',
				},
			],
			props: [
				{
					name: "text",
					type: "string",
					description: "The input text to convert into a slug.",
				},

				{
					name: "options.separator",
					type: "string",
					description:
						"Character used to separate words in the slug. Default is '-'.",
					required: false,
				},
				{
					name: "options.lowercase",
					type: "boolean",
					description:
						"Whether to convert the slug to lowercase. Default is true.",
					required: false,
				},
			],
			return: {
				type: "string",
				description: "A URL-friendly slug generated from the input text.",
			},
			error: null,
			notes:
				"This function removes diacritics (accents) and replaces non-alphanumeric characters with the specified separator.",
		},
		{
			name: "getRandomHexColor",
			description: "Generate a random hexadecimal color.",
			category: "random",
			tags: ["random", "color", "hex"],
			author: "PolGubau",
			since: "1.0.0",
			lastUpdated: "2025-03-17",
			type: "sync",
			compatibility: "browser",
			example: [
				{
					code: "getRandomHexColor()",
					output: '"#a3f4b2"',
				},
			],
			props: [],
			return: { type: "string", description: "A random hex color string." },
			error: null,
			notes: "Generated colors are always 6-digit hex codes.",
		},
		{
			name: "chunk",
			description: "Chunk an array into smaller arrays of a specified size.",
			category: "arrays",
			tags: ["array", "chunk", "split"],
			author: "PolGubau",
			since: "1.0.0",
			lastUpdated: "2025-03-15",
			type: "sync",
			compatibility: "universal",
			example: [
				{
					code: "chunk([1, 2, 3, 4, 5], 2)",
					output: "[[1, 2], [3, 4], [5]]",
				},
			],
			props: [
				{
					name: "data",
					type: "T[]",
					default: null,
					required: true,
					description: "The array to be chunked.",
				},
				{
					name: "size",
					type: "number",
					default: "10",
					required: false,
					description: "The size of each chunk.",
				},
			],
			return: {
				type: "array[]",
				description: "An array of smaller arrays of the specified size.",
			},
			error: null,
			notes:
				"If the array length is not a multiple of size, the last chunk may be smaller.",
		},
		{
			name: "groupBy",
			description:
				"Groups the elements of an array based on a provided key-generating function.",
			category: "arrays",
			tags: ["array", "grouping", "object"],
			author: "PolGubau",
			since: "1.0.0",
			lastUpdated: "2025-03-15",
			type: "sync",
			compatibility: "universal",
			example: [
				{
					code: `groupBy([
	{category: 'fruit', name: 'apple'}, 
	{category: 'fruit', name: 'banana'}, 
	{category: 'vegetable', name: 'carrot'}
], item => item.category)`,
					output: `{	fruit: [
		{ category: 'fruit', name: 'apple' }, 
		{ category: 'fruit', name: 'banana' }], 
	vegetable: [{category: 'vegetable', name: 'carrot' }]
}`,
				},
			],
			props: [
				{
					name: "arr",
					type: "T[]",
					default: null,
					required: true,
					description: "The array to be grouped.",
				},
				{
					name: "getKeyFromItem",
					type: "(item: T) => K",
					default: null,
					required: true,
					description: "A function that generates a key from an element.",
				},
			],
			return: {
				type: "Record<K, T[]>",
				description:
					"An object where each key is associated with an array of elements that share that key.",
			},
			error: null,
			notes: "Keys must be a valid property key (string, number, or symbol).",
		},
		{
			name: "limitArray",
			description:
				"Limit an array to a certain number of elements and return the remaining count.",
			category: "arrays",
			tags: ["array", "limit", "slice"],
			author: "PolGubau",
			since: "1.0.0",
			lastUpdated: "2025-03-15",
			type: "sync",
			compatibility: "universal",
			example: [
				{
					code: "limitArray([1, 2, 3, 4, 5], 3)",
					output: "{ limitedArray: [1, 2, 3], remaining: 2 }",
				},
			],
			props: [
				{
					name: "arr",
					type: "T[]",
					default: null,
					required: true,
					description: "The array to be limited.",
				},
				{
					name: "limit",
					type: "number",
					default: "3",
					required: false,
					description: "The maximum number of elements to keep.",
				},
			],
			return: {
				type: "{ limitedArray: T[], remaining: number }",
				description:
					"An object containing the limited array and the count of remaining elements.",
			},
			error: null,
			notes:
				"If the array length is less than or equal to the limit, `remaining` will be 0.",
		},
		{
			name: "remove",
			description:
				"Removes the element at the specified index from the array. This modifies the original array.",
			category: "arrays",
			tags: ["array", "remove", "mutation"],
			author: "PolGubau",
			since: "1.0.0",
			lastUpdated: "2025-03-15",
			type: "sync",
			compatibility: "universal",
			example: [
				{
					code: "remove([1, 2, 3], 1)",
					output: "[1, 3]",
				},
			],
			props: [
				{
					name: "arr",
					type: "T[]",
					default: null,
					required: true,
					description: "The array from which to remove the element.",
				},
				{
					name: "index",
					type: "number",
					default: null,
					required: true,
					description:
						"The index of the element to remove. Negative indices count from the end.",
				},
			],
			return: {
				type: "array",
				description: "The modified array with the element removed.",
			},
			error: null,
			notes:
				"If the index is out of bounds, the function returns the original array. The array is mutated.",
		},
		{
			name: "shuffle",
			description:
				"Randomizes the order of elements in an array using the Fisher-Yates algorithm.",
			category: "arrays",
			tags: ["array", "shuffle", "random"],
			author: "PolGubau",
			since: "1.0.0",
			lastUpdated: "2025-03-15",
			type: "sync",
			compatibility: "universal",
			example: [
				{
					code: "shuffle([1, 2, 3, 4, 5])",
					output: "[3, 1, 4, 5, 2]",
				},
			],
			props: [
				{
					name: "arr",
					type: "T[]",
					default: null,
					required: true,
					description: "The array to shuffle.",
				},
			],
			return: {
				type: "array",
				description: "A new array with its elements shuffled in random order.",
			},
			error: null,
			notes:
				"The function uses the Fisher-Yates algorithm to shuffle the elements in place. It does not mutate the original array.",
		},
		{
			name: "first",
			description: "Returns the first element of an array.",
			category: "arrays",
			tags: ["array", "first", "element"],
			author: "PolGubau",
			since: "1.0.0",
			lastUpdated: "2025-03-15",
			type: "sync",
			compatibility: "universal",
			example: [
				{
					code: "first([1, 2, 3])",
					output: "1",
				},
			],
			props: [
				{
					name: "arr",
					type: "T[]",
					default: null,
					required: true,
					description: "The array to get the first element from.",
				},
			],
			return: {
				type: "T | undefined",
				description:
					"The first element of the array or `undefined` if the array is empty.",
			},
			error: null,
			notes: "Returns `undefined` if the array is empty.",
		},
		{
			name: "last",
			description: "Returns the last element of an array.",
			category: "arrays",
			tags: ["array", "last", "element"],
			author: "PolGubau",
			since: "1.0.0",
			lastUpdated: "2025-03-15",
			type: "sync",
			compatibility: "universal",
			example: [
				{
					code: "last([1, 2, 3])",
					output: "3",
				},
			],
			props: [
				{
					name: "arr",
					type: "T[]",
					default: null,
					required: true,
					description: "The array to get the last element from.",
				},
			],
			return: {
				type: "T | undefined",
				description:
					"The last element of the array or `undefined` if the array is empty.",
			},
			error: null,
			notes: "Returns `undefined` if the array is empty.",
		},
		{
			name: "removeFirst",
			description: "Removes the first element of an array.",
			category: "arrays",
			tags: ["array", "remove", "first", "element"],
			author: "PolGubau",
			since: "1.0.0",
			lastUpdated: "2025-03-15",
			type: "sync",
			compatibility: "universal",
			example: [
				{
					code: "removeFirst([1, 2, 3])",
					output: "[2, 3]",
				},
			],
			props: [
				{
					name: "arr",
					type: "T[]",
					default: null,
					required: true,
					description: "The array from which to remove the first element.",
				},
			],
			return: {
				type: "array",
				description: "A new array without the first element.",
			},
			error: null,
			notes: "The original array is not mutated.",
		},
		{
			name: "removeLast",
			description: "Removes the last element of an array.",
			category: "arrays",
			tags: ["array", "remove", "last", "element"],
			author: "PolGubau",
			since: "1.0.0",
			lastUpdated: "2025-03-15",
			type: "sync",
			compatibility: "universal",
			example: [
				{
					code: "removeLast([1, 2, 3])",
					output: "[1, 2]",
				},
			],
			props: [
				{
					name: "arr",
					type: "T[]",
					default: null,
					required: true,
					description: "The array from which to remove the last element.",
				},
			],
			return: {
				type: "array",
				description: "A new array without the last element.",
			},
			error: null,
			notes: "The original array is not mutated.",
		},
		{
			name: "isClient",
			description:
				"Checks if the code is running in the client-side (browser).",
			category: "validations",
			tags: ["client", "browser", "environment"],
			author: "PolGubau",
			since: "1.0.0",
			lastUpdated: "2025-03-15",
			type: "sync",
			compatibility: "browser",
			example: [
				{
					code: "isClient()",
					output: "true or false",
				},
			],
			props: [],
			return: {
				type: "boolean",
				description:
					"Returns true if running on the client-side (browser), otherwise false.",
			},
			error: null,
			notes:
				"This function checks for the presence of `window` to determine if it's a browser environment.",
		},
		{
			name: "isDeepKey",
			description:
				"Checks if a given key is a deep key, containing a dot (.) or square brackets with a property accessor.",
			category: "validations",
			tags: ["deep key", "key", "property"],
			author: "PolGubau",
			since: "1.0.0",
			lastUpdated: "2025-03-15",
			type: "sync",
			compatibility: "universal",
			example: [
				{
					code: "isDeepKey('a.b')",
					output: "true",
				},
			],
			props: [
				{
					name: "key",
					type: "PropertyKey",
					default: null,
					required: true,
					description: "The key to check, can be a string or symbol.",
				},
			],
			return: {
				type: "boolean",
				description: "Returns true if the key is a deep key, otherwise false.",
			},
			error: null,
			notes:
				"Deep keys are typically used for nested object properties, e.g., 'a.b' or 'a[b]'.",
		},
		{
			name: "isEqual",
			description:
				"Compares two arrays for equality, checking if they have the same elements in the same order.",
			category: "validations",
			tags: ["array", "comparison", "equality"],
			author: "PolGubau",
			since: "1.0.0",
			lastUpdated: "2025-03-15",
			type: "sync",
			compatibility: "universal",
			example: [
				{
					code: "isEqual([1, 2, 3], [1, 2, 3])",
					output: "true",
				},
			],
			props: [
				{
					name: "array1",
					type: "T[]",
					default: null,
					required: true,
					description: "The first array to compare.",
				},
				{
					name: "array2",
					type: "T[]",
					default: null,
					required: true,
					description: "The second array to compare.",
				},
			],
			return: {
				type: "boolean",
				description: "Returns true if the arrays are equal, otherwise false.",
			},
			error: null,
			notes:
				"Arrays are considered equal if they have the same length and corresponding elements are identical.",
		},
		{
			name: "isObject",
			description: "Checks if the provided parameter is a plain object.",
			category: "validations",
			tags: ["object", "type checking"],
			author: "PolGubau",
			since: "1.0.0",
			lastUpdated: "2025-03-15",
			type: "sync",
			compatibility: "universal",
			example: [
				{
					code: "isObject({})",
					output: "true",
				},
				{
					code: "isObject(`string`)",
					output: "false",
				},
			],
			props: [
				{
					name: "item",
					type: "unknown",
					default: null,
					required: true,
					description: "The item to check.",
				},
			],
			return: {
				type: "boolean",
				description:
					"Returns true if the item is a plain object, otherwise false.",
			},
			error: null,
			notes:
				"A plain object is one that is created using the `Object` constructor, not an instance of a class.",
		},
		{
			name: "copyToClipboard",
			description: "Copies the given text to the clipboard.",
			category: "functions",
			tags: ["clipboard", "copy", "text"],
			author: "PolGubau",
			since: "1.0.0",
			lastUpdated: "2025-03-15",
			type: "async",
			compatibility: "browser",
			example: [
				{
					code: "await copyToClipboard('Hello, world!')",
					output: "true",
				},
			],
			props: [
				{
					name: "text",
					type: "string",
					default: null,
					required: true,
					description: "The text to be copied to the clipboard.",
				},
			],
			return: {
				type: "boolean",
				description:
					"Returns true if the text was successfully copied, otherwise false.",
			},
			error: "Warning if clipboard is not supported.",
			notes:
				"This function uses the `navigator.clipboard.writeText` API to copy text to the clipboard.",
		},
		{
			name: "daysBetween",
			description: "Calculates the number of days between two dates.",
			category: "dates",
			tags: ["dates", "utilities", "date manipulation"],
			author: "Polgubau",
			since: "1.0.0",
			lastUpdated: "2025-03-17",
			type: "sync",
			compatibility: "universal",
			example: [
				{
					code: "daysBetween(new Date('2025-03-17'), new Date('2025-03-22'))",
					output: "5",
				},
				{
					code: "daysBetween(new Date('2025-03-17'), new Date('2025-03-14'))",
					output: "3",
				},
			],
			props: [
				{
					name: "date1",
					type: "Date",
					description: "The first date to compare.",
				},
				{
					name: "date2",
					type: "Date",
					description: "The second date to compare.",
				},
			],
			return: {
				type: "number",
				description: "The absolute number of days between the two dates.",
			},
			error: null,
			notes:
				"This function calculates the absolute difference, so it does not matter which date is earlier.",
		},
		{
			name: "encrypt",
			description: "Encrypts a text using AES-GCM encryption algorithm.",
			category: "functions",
			tags: ["encryption", "AES-GCM", "security"],
			author: "PolGubau",
			since: "1.0.1",
			lastUpdated: "2025-03-15",
			type: "async",
			compatibility: "browser",
			example: [
				{
					code: "await encrypt('Hello, world!', 'your-32-character-key')",
					output: "encrypted text in base64",
				},
			],
			props: [
				{
					name: "text",
					type: "string",
					default: null,
					required: true,
					description: "The text to encrypt.",
				},
				{
					name: "key",
					type: "string",
					default: null,
					required: true,
					description:
						"The encryption key (must be at least 32 characters long).",
				},
			],
			return: {
				type: "string",
				description: "Returns the encrypted text in base64 format.",
			},
			error: "Throws an error if the key is less than 32 characters.",
			notes:
				"This function uses the AES-GCM encryption algorithm for encrypting text.",
		},
		{
			name: "decrypt",
			description:
				"Decrypts a base64 encoded encrypted text using AES-GCM decryption algorithm.",
			category: "functions",
			tags: ["decryption", "AES-GCM", "security"],
			author: "PolGubau",
			since: "1.0.0",
			lastUpdated: "2025-03-15",
			type: "async",
			compatibility: "browser",
			example: [
				{
					code: "await decrypt('encryptedTextInBase64', 'your-32-character-key')",
					output: "decrypted text",
				},
			],
			props: [
				{
					name: "encryptedText",
					type: "string",
					default: null,
					required: true,
					description: "The encrypted text in base64 format.",
				},
				{
					name: "key",
					type: "string",
					default: null,
					required: true,
					description:
						"The decryption key (must be at least 32 characters long).",
				},
			],
			return: {
				type: "string",
				description: "Returns the decrypted text.",
			},
			error: "Throws an error if the key is less than 32 characters.",
			notes:
				"This function uses the AES-GCM decryption algorithm for decrypting the text.",
		},
		{
			name: "sleep",
			description: "Pauses the execution for a specified duration.",
			category: "functions",
			tags: ["sleep", "delay", "timeout"],
			author: "PolGubau",
			since: "1.0.0",
			lastUpdated: "2025-03-15",
			type: "async",
			compatibility: "universal",
			example: [
				{
					code: "await sleep(1000)",
					output: "Pauses execution for 1000 milliseconds.",
				},
			],
			props: [
				{
					name: "ms",
					type: "number | `${number}ms`",
					default: null,
					required: true,
					description:
						"The duration to sleep, in milliseconds or a string representing milliseconds.",
				},
			],
			return: {
				type: "void",
				description: "Resolves after the specified duration.",
			},
			error: null,
			notes:
				"The `ms` parameter can be either a number (in milliseconds) or a string with the format `${number}ms`.",
		},
		{
			name: "debounce",
			description:
				"Creates a debounced function that delays invoking the provided function until after the specified delay.",
			category: "functions",
			tags: ["debounce", "delay", "function"],
			author: "PolGubau",
			since: "1.0.0",
			lastUpdated: "2025-03-15",
			type: "sync",
			compatibility: "universal",
			example: [
				{
					code: "const debouncedFunc = debounce(() => console.log('Hello'), 1000);",
					output: "Logs 'Hello' after a 1-second delay.",
				},
			],
			props: [
				{
					name: "fn",
					type: "function",
					default: null,
					required: true,
					description: "The function to debounce.",
				},
				{
					name: "delay",
					type: "number",
					default: null,
					required: true,
					description: "The number of milliseconds to delay.",
				},
			],
			return: {
				type: "function",
				description: "Returns a new debounced function.",
			},
			error: null,
			notes:
				"The returned function will delay the invocation of `fn` until after the specified `delay` period.",
		},
		{
			name: "getBrowserInfo",
			description:
				"Returns information about the user's browser, including name, version, and user agent string.",
			category: "functions",
			tags: ["browser", "user agent", "utilities"],
			author: "Polgubau",
			since: "1.0.0",
			lastUpdated: "2025-03-17",
			type: "sync",
			compatibility: "browser",
			example: [
				{
					code: "getBrowserInfo()",
					output:
						'{ "name": "Chrome", "version": "112.0.0.0", "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36" }',
				},
			],
			props: [],
			return: {
				type: "{ name: string; version: string; userAgent: string }",
				description:
					"An object containing the browser's name, version, and the full user agent string.",
			},
			error: null,
			notes:
				"This function works only in the browser environment where the `navigator.userAgent` property is available.",
		},
		{
			name: "pickRandom",
			description:
				"Pick a specified number of random items from an array without repeating.",
			category: "random",
			tags: ["random", "array", "utilities"],
			author: "Polgubau",
			since: "1.0.4",
			lastUpdated: "2025-03-17",
			type: "sync",
			compatibility: "universal",
			example: [
				{
					code: "pickRandom([1, 2, 3, 4, 5], 3)",
					output:
						"[2, 4, 5] // (random items, could be any combination from the array)",
				},
				{
					code: "pickRandom(['apple', 'banana', 'cherry', 'date'], 2)",
					output:
						'["banana", "cherry"] // (random items, could be any combination from the array)',
				},
			],
			props: [
				{
					name: "array",
					type: "T[]",
					description: "The input array to pick random items from.",
				},
				{
					name: "count",
					type: "number",
					description: "The number of random items to pick.",
				},
			],
			return: {
				type: "T[]",
				description: "An array containing the randomly selected items.",
			},
			error: null,
			notes:
				"This function returns an empty array if the count is less than or equal to zero, or if the input array is empty.",
		},
		{
			name: "uuid",
			description: "Generates a random UUID (Universally Unique Identifier).",
			category: "functions",
			tags: ["UUID", "identifier", "random"],
			author: "PolGubau",
			since: "1.0.0",
			lastUpdated: "2025-03-15",
			type: "sync",
			compatibility: "universal",
			example: [
				{
					code: "uuid()",
					output: "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx",
				},
			],
			props: [
				{
					name: "limit",
					type: "number",
					default: null,
					required: false,
					description: "Limits the length of the UUID string if provided.",
				},
			],
			return: {
				type: "string",
				description: "Returns the generated UUID as a string.",
			},
			error: null,
			notes: "The UUID follows the version 4 format, which uses random values.",
		},

		{
			name: "clamp",
			description:
				"Clamps a number within the inclusive lower and upper bounds.",
			category: "numbers",
			tags: ["number", "clamp", "bounds", "math"],
			author: "PolGubau",
			since: "1.0.0",
			lastUpdated: "2025-03-15",
			type: "sync",
			compatibility: "universal",
			example: [
				{
					code: "clamp(10, 5, 15)",
					output: "10",
				},
			],
			props: [
				{
					name: "value",
					type: "number",
					default: null,
					required: true,
					description: "The number to clamp.",
				},
				{
					name: "minimum",
					type: "number",
					default: null,
					required: false,
					description: "The minimum bound to clamp the number.",
				},
				{
					name: "maximum",
					type: "number",
					default: null,
					required: true,
					description: "The maximum bound to clamp the number.",
				},
			],
			return: {
				type: "number",
				description: "Returns the clamped number within the specified bounds.",
			},
			error: null,
			notes:
				"If only one bound is provided, it returns the minimum of the value and the bound.",
		},
		{
			name: "cloneDeep",
			description:
				"Deep clone an object. A deep clone is a clone of the source object and all of its children, and their children, and so on.",
			category: "objects",
			tags: ["clone", "deep", "object", "recursion"],
			author: "PolGubau",
			since: "1.0.0",
			lastUpdated: "2025-03-15",
			type: "sync",
			compatibility: "universal",
			example: [
				{
					code: "cloneDeep({ a: { b: 1 } })",
					output: "{ a: { b: 1 } }",
				},
			],
			props: [
				{
					name: "source",
					type: "T",
					default: null,
					required: true,
					description: "The source object to clone.",
				},
			],
			return: {
				type: "T",
				description: "Returns a deep clone of the source object.",
			},
			error: null,
			notes:
				"The function recursively clones the object and its nested properties. If the source is not an object, it is returned as is.",
		},
		{
			name: "getMainField",
			description:
				"Retrieves the main field from an item object based on a predefined list of labels to highlight.",
			category: "objects",
			tags: ["object", "field", "main", "label", "extraction"],
			author: "PolGubau",
			since: "1.0.0",
			lastUpdated: "2025-03-15",
			type: "sync",
			compatibility: "universal",
			example: [
				{
					code: "getMainField({ name: 'John Doe', value: 'johndoe123' })",
					output: "{ key: 'name', value: 'John Doe' }",
				},
			],
			props: [
				{
					name: "item",
					type: "Record<string, any>",
					default: null,
					required: true,
					description: "The item object from which to extract the main field.",
				},
			],
			return: {
				type: "object",
				description:
					"Returns an object containing the key and value of the main field.",
			},
			error: null,
			notes:
				"The function searches for the first label in the `DEFAULT_KEYS` array that exists in the item object. If no label is found, the first key-value pair from the item object is returned instead.",
		},
		{
			name: "merge",
			description:
				"Merges the properties of the source object into the target object, performing a deep merge.",
			category: "objects",
			tags: ["merge", "deep merge", "object", "recursive", "modification"],
			author: "PolGubau",
			since: "1.0.0",
			lastUpdated: "2025-03-15",
			type: "sync",
			compatibility: "universal",
			example: [
				{
					code: `merge(
	{a: 1, b: { x: 1 } }, 
	{ b: { y: 2 }, 
	c: 3 })`,
					output: `{	a: 1, 
	b: { x: 1, y: 2 }, 
	c: 3 }`,
				},
			],
			props: [
				{
					name: "target",
					type: "T",
					default: null,
					required: true,
					description:
						"The target object into which the source object properties will be merged. This object is modified in place.",
				},
				{
					name: "source",
					type: "S",
					default: null,
					required: true,
					description:
						"The source object whose properties will be merged into the target object.",
				},
			],
			return: {
				type: "T & S",
				description:
					"The updated target object with properties from the source object merged in.",
			},
			error: null,
			notes:
				"This function mutates the target object. If a property in the source is undefined, it does not overwrite a defined property in the target.",
		},
		{
			name: "isObjectLike",
			description: "Checks if the value is an object (excluding null).",
			category: "objects",
			tags: ["type check", "object", "null check"],
			author: "PolGubau",
			since: "1.0.0",
			lastUpdated: "2025-03-15",
			type: "sync",
			compatibility: "universal",
			example: [
				{
					code: "isObjectLike({ a: 1 })",
					output: "true",
				},
			],
			props: [
				{
					name: "value",
					type: "unknown",
					default: null,
					required: true,
					description: "The value to check.",
				},
			],
			return: {
				type: "boolean",
				description:
					"Returns `true` if the value is an object and not null, otherwise `false`.",
			},
			error: null,
			notes:
				"This function is used internally to determine whether the target or source values in the `merge` function should be deeply merged or simply replaced.",
		},
		{
			name: "mergeDeep",
			description:
				"Merges and deep copies the values of all enumerable own properties of the target object from the source object to a new object.",
			category: "objects",
			tags: [
				"merge",
				"deep merge",
				"object",
				"recursive",
				"copy",
				"modification",
			],
			author: "PolGubau",
			since: "1.0.0",
			lastUpdated: "2025-03-15",
			type: "sync",
			compatibility: "universal",
			example: [
				{
					code: "mergeDeep({ a: { x: 1 } }, { a: { y: 2 }, b: 3 })",
					output: "{ a: { x: 1, y: 2 }, b: 3 }",
				},
			],
			props: [
				{
					name: "target",
					type: "T extends object",
					default: null,
					required: true,
					description: "The target object from which to copy properties.",
				},
				{
					name: "source",
					type: "S extends object",
					default: null,
					required: true,
					description: "The source object from which to merge properties.",
				},
			],
			return: {
				type: "T & S",
				description:
					"A new object that is the result of merging and deeply copying properties from the source object into the target object.",
			},
			error: null,
			notes:
				"This function creates a new object by merging and deep copying properties from the source object into the target object. It performs a deep merge, meaning nested objects are merged recursively. If a nested object is found in both the target and source, it will be recursively merged. If the source object is empty, a deep copy of the target is returned.",
		},
		{
			name: "omit",
			description: "Creates a new object with specified keys omitted.",
			category: "objects",
			tags: ["omit", "object", "manipulation", "exclude", "keys"],
			author: "PolGubau",
			since: "1.0.0",
			lastUpdated: "2025-03-15",
			type: "sync",
			compatibility: "universal",
			example: [
				{
					code: "const obj = { a: 1, b: 2, c: 3 }; const result = omit(obj, ['b', 'c']);",
					output: "{ a: 1 }",
				},
			],
			props: [
				{
					name: "obj",
					type: "T extends Record<string, any>",
					default: null,
					required: true,
					description: "The object to omit keys from.",
				},
				{
					name: "keys",
					type: "K[]",
					default: null,
					required: true,
					description: "An array of keys to be omitted from the object.",
				},
			],
			return: {
				type: "Omit<T, K>",
				description: "A new object with the specified keys omitted.",
			},
			error: null,
			notes:
				"This function creates a shallow copy of the provided object and deletes the properties specified by the `keys` array. It does not modify the original object. If a key is not present in the object, it is simply ignored without causing any errors.",
		},
		{
			name: "toPath",
			description: "Converts a deep key string into an array of path segments.",
			category: "objects",
			tags: ["toPath", "deepKey", "path", "string", "parse", "array"],
			author: "PolGubau",
			since: "1.0.0",
			lastUpdated: "2025-03-15",
			type: "sync",
			compatibility: "universal",

			example: [
				{ code: "toPath('a.b.c')", output: "['a', 'b', 'c']" },
				{ code: "toPath('a[b][c]')", output: "['a', 'b', 'c']" },
				{ code: "toPath('.a.b.c')", output: "['', 'a', 'b', 'c']" },
				{ code: "toPath('a[\"b.c\"].d')", output: "['a', 'b.c', 'd']" },
				{ code: "toPath('')", output: "[]" },
				{
					code: "toPath('.a[b].c.d[e][\"f.g\"].h')",
					output: "['', 'a', 'b', 'c', 'd', 'e', 'f.g', 'h']",
				},
			],
			props: [
				{
					name: "deepKey",
					type: "string",
					default: "",
					required: true,
					description:
						"The deep key string to convert into an array of path segments.",
				},
			],
			return: {
				type: "string[]",
				description:
					"An array of strings, each representing a segment of the path.",
			},
			error: null,
			notes:
				"This function parses a deep key string and splits it into its respective path segments. It handles various cases, such as quoted segments, bracket notation, and escaped characters.",
		},
		{
			name: "parseJSON",
			description:
				"A wrapper for 'JSON.parse()' to support 'undefined' value. If parsing fails, an error is thrown.",
			category: "parsers",
			tags: ["JSON", "parse", "wrapper", "undefined", "error handling"],
			author: "PolGubau",
			since: "1.0.0",
			lastUpdated: "2025-03-15",
			type: "sync",
			compatibility: "universal",
			example: [
				{
					code: 'parseJSON(\'{"name":"John"}\')',
					output: "{ name: 'John' }",
				},
				{
					code: "parseJSON('null')",
					output: "undefined",
				},
				{
					code: "parseJSON('undefined')",
					output: "Error: parsing error on value: undefined",
				},
			],
			props: [
				{
					name: "value",
					type: "string | null",
					required: true,
					default: null,
					description: "The string to be parsed as JSON.",
				},
			],
			return: {
				type: "T | undefined",
				description:
					"Parsed object of type T or undefined if the input is null or an error occurs.",
			},
			error: "Thrown if parsing the value fails.",
			notes:
				"This function safely parses a JSON string. It returns 'undefined' for null or non-parsable values, and throws an error when parsing fails.",
		},
		{
			name: "saveParseJson",
			description:
				"A wrapper for 'JSON.parse()' to support 'undefined' value. If parsing fails, it silently returns 'undefined'.",
			category: "parsers",
			tags: ["JSON", "parse", "wrapper", "undefined", "error handling"],
			author: "PolGubau",
			since: "1.0.0",
			lastUpdated: "2025-03-15",
			type: "sync",
			compatibility: "universal",

			example: [
				{
					code: 'saveParseJson(\'{"name":"John"}\')',
					output: '{"name": "John"}',
				},
				{ code: "saveParseJson('null')", output: "undefined" },
				{ code: "saveParseJson('undefined')", output: "undefined" },
			],
			props: [
				{
					name: "value",
					type: "string | null",
					default: null,
					required: true,
					description: "The string to be parsed as JSON.",
				},
			],
			return: {
				type: "T | undefined",
				description:
					"Parsed object of type T or undefined if the input is null or an error occurs.",
			},
			error:
				"No error is thrown, it silently returns 'undefined' in case of failure.",
			notes:
				"This function parses a JSON string and returns 'undefined' for null or non-parsable values, without throwing errors.",
		},
		{
			name: "getTimeAgo",
			description:
				"Returns a human-readable relative time string based on a given timestamp.",
			category: "dates",
			tags: ["time", "date", "relativeTime", "intl", "locale"],
			author: "PolGubau",
			since: "1.0.0",
			lastUpdated: "2025-03-15",
			type: "sync",
			compatibility: "universal",
			example: [
				{
					code: "getTimeAgo(1616161600000)",
					output: "2 days ago",
				},
				{
					code: "getTimeAgo(1616161600000, { locale: 'es' })",
					output: "hace 2 días",
				},
			],
			props: [
				{
					name: "timestamp",
					type: "number",
					default: null,
					required: true,
					description:
						"The timestamp to compare the current time against, in milliseconds.",
				},
				{
					name: "options",
					type: "GetTimeAgoOptions",
					default: "{ locale: undefined }",
					required: false,
					description:
						"Optional settings, including the locale for formatting the relative time.",
				},
			],
			return: {
				type: "string",
				description:
					"A human-readable string indicating the relative time (e.g., '2 days ago').",
			},
			error: null,
			notes:
				"This function computes the difference between the current time and the provided timestamp, and returns a formatted string such as 'X days ago', 'X hours ago', or 'X minutes ago', based on the elapsed time.",
		},

		{
			name: "px",
			description: "Converts the specified number to a pixel string.",
			category: "strings",
			tags: ["conversion", "unit", "px", "string"],
			author: "PolGubau",
			since: "1.0.0",
			lastUpdated: "2025-03-15",
			type: "sync",
			compatibility: "universal",
			example: [
				{
					code: "px(10)",
					output: "'10px'",
				},
				{
					code: "px('10')",
					output: "'10px'",
				},
			],
			props: [
				{
					name: "arg",
					type: "string | number",
					default: null,
					required: true,
					description: "The number or string to convert into a pixel string.",
				},
			],
			return: {
				type: "string",
				description:
					"Returns the input number or string with 'px' appended at the end.",
			},
			error: null,
			notes:
				"If the input is a string or number, it will be converted to a string and suffixed with 'px'.",
		},
		{
			name: "toCamelCase",
			description: "Converts a string to camel case.",
			category: "strings",
			tags: ["string", "camelCase", "conversion"],
			author: "PolGubau",
			since: "1.0.0",
			lastUpdated: "2025-03-15",
			type: "sync",
			compatibility: "universal",
			example: [
				{
					code: "toCamelCase('hello-world')",
					output: "'helloWorld'",
				},
				{
					code: "toCamelCase('hello_world')",
					output: "'helloWorld'",
				},
			],
			props: [
				{
					name: "str",
					type: "string",
					default: null,
					required: true,
					description: "The string to convert to camel case.",
				},
			],
			return: {
				type: "string",
				description: "Returns the camel-cased string.",
			},
			error: null,
			notes:
				"This function converts strings with underscores or hyphens into camel case format.",
		},
		{
			name: "toTitleCase",
			description: "Converts a string to title case.",
			category: "strings",
			tags: ["string", "titleCase", "conversion"],
			author: "PolGubau",
			since: "1.0.0",
			lastUpdated: "2025-03-15",
			type: "sync",
			compatibility: "universal",
			example: [
				{
					code: "toTitleCase('hello world')",
					output: "'Hello World'",
				},
			],
			props: [
				{
					name: "str",
					type: "string",
					default: null,
					required: true,
					description: "The string to convert to title case.",
				},
			],
			return: {
				type: "string",
				description: "Returns the title-cased string.",
			},
			error: null,
			notes:
				"This function capitalizes the first letter of each word in the string.",
		},
		{
			name: "toKebabCase",
			description: "Converts a string to kebab case.",
			category: "strings",
			tags: ["string", "kebabCase", "conversion"],
			author: "PolGubau",
			since: "1.0.0",
			lastUpdated: "2025-03-15",
			type: "sync",
			compatibility: "universal",
			example: [
				{
					code: "toKebabCase('helloWorld')",
					output: "'hello-world'",
				},
			],
			props: [
				{
					name: "str",
					type: "string",
					default: null,
					required: true,
					description: "The string to convert to kebab case.",
				},
			],
			return: {
				type: "string",
				description: "Returns the kebab-cased string.",
			},
			error: null,
			notes: "This function converts camelCase strings into kebab-case format.",
		},
		{
			name: "toUpperCase",
			description: "Converts a string to upper case.",
			category: "strings",
			tags: ["string", "upperCase", "conversion"],
			author: "PolGubau",
			since: "1.0.0",
			lastUpdated: "2025-03-15",
			type: "sync",
			compatibility: "universal",
			example: [
				{
					code: "toUpperCase('hello world')",
					output: "'HELLO WORLD'",
				},
			],
			props: [
				{
					name: "str",
					type: "string",
					default: null,
					required: true,
					description: "The string to convert to upper case.",
				},
			],
			return: {
				type: "string",
				description: "Returns the upper-cased string.",
			},
			error: null,
			notes:
				"This function converts all characters of the string to uppercase.",
		},
		{
			name: "toLowerCase",
			description: "Converts a string to lower case.",
			category: "strings",
			tags: ["string", "lowerCase", "conversion"],
			author: "PolGubau",
			since: "1.0.0",
			lastUpdated: "2025-03-15",
			type: "sync",
			compatibility: "universal",
			example: [
				{
					code: "toLowerCase('HELLO WORLD')",
					output: "'hello world'",
				},
			],
			props: [
				{
					name: "str",
					type: "string",
					default: null,
					required: true,
					description: "The string to convert to lower case.",
				},
			],
			return: {
				type: "string",
				description: "Returns the lower-cased string.",
			},
			error: null,
			notes:
				"This function converts all characters of the string to lowercase.",
		},
		{
			name: "capitalize",
			description: "Capitalizes the first letter of a string.",
			category: "strings",
			tags: ["string", "capitalize", "conversion"],
			author: "PolGubau",
			since: "1.0.0",
			lastUpdated: "2025-03-15",
			type: "sync",
			compatibility: "universal",
			example: [
				{
					code: "capitalize('hello world')",
					output: "'Hello world'",
				},
			],
			props: [
				{
					name: "str",
					type: "string",
					default: null,
					required: true,
					description: "The string to capitalize.",
				},
			],
			return: {
				type: "string",
				description: "Returns the string with the first letter capitalized.",
			},
			error: null,
			notes:
				"This function only capitalizes the first letter of the string, leaving the rest intact.",
		},
		{
			name: "removeWhitespace",
			description: "Removes all whitespace from a string.",
			category: "strings",
			tags: ["string", "whitespace", "removal"],
			author: "PolGubau",
			since: "1.0.0",
			lastUpdated: "2025-03-15",
			type: "sync",
			compatibility: "universal",
			example: [
				{
					code: "removeWhitespace(' hello world ')",
					output: "'helloworld'",
				},
			],
			props: [
				{
					name: "str",
					type: "string",
					default: null,
					required: true,
					description: "The string to remove whitespace from.",
				},
			],
			return: {
				type: "string",
				description: "Returns the string without any whitespace.",
			},
			error: null,
			notes:
				"This function removes all types of whitespace characters (spaces, tabs, etc.) from the string.",
		},
		{
			name: "reverseString",
			description: "Reverses a string.",
			category: "strings",
			tags: ["string", "reverse"],
			author: "PolGubau",
			since: "1.0.0",
			lastUpdated: "2025-03-15",
			type: "sync",
			compatibility: "universal",
			example: [
				{
					code: "reverseString('hello world')",
					output: "dlrow olleh",
				},
			],
			props: [
				{
					name: "str",
					type: "string",
					default: null,
					required: true,
					description: "The string to reverse.",
				},
			],
			return: {
				type: "string",
				description: "Returns the reversed string.",
			},
			error: null,
			notes:
				"This function reverses the order of the characters in the string.",
		},
		{
			name: "truncateString",
			description: "Truncates a string to a specified length.",
			category: "strings",
			tags: ["string", "truncate"],
			author: "PolGubau",
			since: "1.0.0",
			lastUpdated: "2025-03-15",
			type: "sync",
			compatibility: "universal",
			example: [
				{
					code: "truncateString('This is a long string', 10)",
					output: "'This is a...'",
				},
			],
			props: [
				{
					name: "str",
					type: "string",
					default: null,
					required: true,
					description: "The string to truncate.",
				},
				{
					name: "length",
					type: "number",
					default: 50,
					required: false,
					description: "The maximum length of the truncated string.",
				},
				{
					name: "suffix",
					type: "string",
					default: "...",
					required: false,
					description: "The suffix to append after truncating.",
				},
			],
			return: {
				type: "string",
				description: "Returns the truncated string with an optional suffix.",
			},
			error: null,
			notes:
				"This function truncates the string to a specified length, appending a suffix if necessary.",
		},
	],
};
