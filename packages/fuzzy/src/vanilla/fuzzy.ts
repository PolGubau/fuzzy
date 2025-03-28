import { FuzzySearcherBuilder } from "./builders/searcher.builder";
import { getFuzzyMatchScore } from "./getScore/getScore";
import { sortByScore } from "./helpers/sorters";
import normalizeText from "./normalizeText";
import type {
	FuzzySearchOptions,
	FuzzySearchResponse,
	FuzzySearcher,
	Matches,
	Result,
} from "./types";
/*
Based on https://github.com/Nozbe/microfuzz, but with some changes as direct tailwind support or more customization. Thanks to Nozbe for the original idea.

General idea:
- case-insensitive
- diacritics-insensitive
- works with Latin script, Cyrillic, rudimentary CJK support
- limited fuzzing: matches query letters in order, but they don't have to be consecutive
  (but no or very limited transposition or removals are allowed - they cause more confusion than help)
- no FTS-style stemming, soundex, levenstein, autocorrect - query can be lazy, but not sloppy
- sort by how well text matches the query

Think VS Code/Dash-like search, not Google-like search

## Sorting

Results are sorted in roughly this order:

1. [0]    Exact match (found === query)
2. [0.1]  Full match (like exact, but case&diacritics-insensitive)
3. [0.5]  "Starts with" match
4. [0.9]  Contains query (starting at word boundary) exactly
5. [1]    Contains query (starting at word boundary)
6. [1.5+] Contains query words (space separated) in any order
7. [2]    Contains query
8. [2+]   Contains letters -- the fewer chunks, the better

Note:
- Lower score is better (think "error level")
- Exact scoring values are not an API contract, can change between releases
- Secondary sort criteria (for equal fuzzy sort) is input order

*/

/**
 * Performs a fuzzy search on a collection of items and returns a function that can be used to query the collection.
 *
 * @template T - The type of the items in the collection.
 * @template U - The type of the items in the search results (defaults to `T`).
 *
 * @param collection - The array of items to search through.
 * @param options - Configuration options for the fuzzy search.
 * @param options.getKey - A function that extracts an array of strings (keys) from each item in the collection.
 *                         If not provided, the items themselves are converted to strings.
 * @param options.debug - If `true`, logs debug information about the search process to the console.
 * @param options.limit - The maximum number of results to return. Defaults to `Number.MAX_SAFE_INTEGER`.
 * @param options.maxScore - The maximum score a result can have to be included in the results. Defaults to `100`.
 * @param options.mapResultItem - A function to map each result item to a different type.
 *
 * @returns A function that takes a query string and returns a `FuzzySearchResponse` containing the search results.
 *
 * @example
 * ```typescript
 * const collection = ['apple', 'banana', 'cherry'];
 * const search = fuzzySearch(collection, { limit: 2 });
 * const results = search('app');
 * console.log(results);
 * ```
 */
export function fuzzy<T, U = T>(
	collection: T[],
	options: FuzzySearchOptions<T, U> = {},
): FuzzySearcher<U> {
	const {
		getKey,
		debug,
		limit = Number.MAX_SAFE_INTEGER,
		maxScore = 100,
		mapResultItem,
	} = options;

	const normalizedTexts: [T, [string, string, Set<string>][]][] =
		collection.map((element: T) => {
			const texts = getKey ? getKey(element) : [String(element)];

			const preprocessedTexts: [string, string, Set<string>][] = texts.map(
				(text) => {
					const item = text || "";
					const normalizedItem = normalizeText(item);
					const itemWords = new Set(normalizedItem.split(" "));

					return [item, normalizedItem, itemWords];
				},
			);

			return [element, preprocessedTexts];
		});

	const res: FuzzySearcher<U> = (query: string): FuzzySearchResponse<U> => {
		const startTime = Date.now();
		const results: Array<Result<T>> = [];
		const normalizedQuery = normalizeText(query);

		if (!normalizedQuery.length) {
			return new FuzzySearcherBuilder<U>({
				results: [],
				startTime,
				endTime: startTime,
				normalizedQuery,
			}).build();
		}
		const queryWords = normalizedQuery.split(" ");

		for (const [element, texts] of normalizedTexts) {
			let bestScore = Number.MAX_SAFE_INTEGER;
			const matches: Matches = [];

			for (const [item, normalizedItem, itemWords] of texts) {
				const result = getFuzzyMatchScore(
					item,
					normalizedItem,
					itemWords,
					query,
					normalizedQuery,
					queryWords,
				);

				if (result) {
					bestScore = Math.min(bestScore, result[0]);
					matches.push(result[1]);
				} else {
					matches.push(null);
				}
			}

			if (bestScore < Number.MAX_SAFE_INTEGER) {
				results.push({ item: element, score: bestScore, matches });
			}
		}

		const filteredResults = results
			.sort(sortByScore)
			.filter((result) => result.score <= maxScore)
			.slice(0, limit);

		const mappedResults = mapResultItem
			? filteredResults.map(({ item, ...rest }) => ({
					...rest,
					item: mapResultItem(item),
				}))
			: (filteredResults as unknown as Result<U>[]);

		const endTime = Date.now();

		const built = new FuzzySearcherBuilder<U>({
			results: mappedResults,
			startTime,
			endTime,
			normalizedQuery,
		}).build();

		if (debug) {
			console.groupCollapsed("Fuzzy Search");
			console.log("Query:", query);
			console.log("Normalized Query:", normalizedQuery);
			console.log("Results Length:", built.results.length);
			console.log("Results:", built.results);
			console.log("Preprocessed Collection:", normalizedTexts);
			console.log("Time:", built.time, "ms");
			console.groupEnd();
		}

		return built;
	};

	return res;
}
