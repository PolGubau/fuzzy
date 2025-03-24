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

const { MAX_SAFE_INTEGER } = Number;

class FuzzySearcherBuilder<T> {
	private results: Array<Result<T>>;
	private time: number;

	constructor({
		results,
		startTime = Date.now(),
		endTime = Date.now(),
	}: {
		results?: Array<Result<T>>;
		startTime?: number;
		endTime?: number;
	}) {
		this.time = endTime - startTime;
		this.results = results ?? [];
	}

	public build(): FuzzySearchResponse<T> {
		return {
			results: this.results,
			length: this.results.length,
			time: this.time,
		};
	}
}

export function findFuzzyMatch(
	text: string,
	query: string,
): Result<string> | null {
	const normalizedQuery = normalizeText(query);
	const queryWords = normalizedQuery.split(" ");

	const normalizedText = normalizeText(text);
	const itemWords = new Set(normalizedText.split(" "));

	const result = getFuzzyMatchScore(
		text,
		normalizedText,
		itemWords,
		query,
		normalizedQuery,
		queryWords,
	);
	if (result) {
		return { item: text, score: result[0], matches: [result[1]] };
	}
	return null;
}

export function fuzzySearch<T>(
	collection: T[],
	options: FuzzySearchOptions<T> = {},
): FuzzySearcher<T> {
	const { getText, debug } = options;

	const preprocessedCollection: [T, [string, string, Set<string>][]][] =
		collection.map((element: T) => {
			let texts: (string | null)[];

			if (getText) {
				texts = getText(element);
			} else {
				texts = [
					options.key
						? element[options.key as keyof T]
						: // biome-ignore lint/suspicious/noExplicitAny: <explanation>
							(element as any),
				];
			}

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

	return (query: string) => {
		const startTime = Date.now();
		const results: Array<Result<T>> = [];
		const normalizedQuery = normalizeText(query);
		const queryWords = normalizedQuery.split(" ");

		if (!normalizedQuery.length) {
			return [];
		}

		for (const [element, texts] of preprocessedCollection) {
			let bestScore = MAX_SAFE_INTEGER;
			const matches: Matches = [];
			for (let i = 0, len = texts.length; i < len; i += 1) {
				const [item, normalizedItem, itemWords] = texts[i];
				const result = getFuzzyMatchScore(
					item,
					normalizedItem,
					itemWords,
					query,
					normalizedQuery,
					queryWords,
				);
				if (result) {
					bestScore = Math.min(bestScore, result[0]); // take the lowest score of any match
					matches.push(result[1]);
				} else {
					matches.push(null);
				}
			}
			if (bestScore < MAX_SAFE_INTEGER) {
				results.push({ item: element, score: bestScore, matches });
			}
		}

		results.sort(sortByScore);

		const endTime = Date.now();

		const time = endTime - startTime;

		const built = new FuzzySearcherBuilder(results, time).build();

		if (debug) {
			// Group of logs with the info of the search
			console.groupCollapsed("Fuzzy Search");
			console.log("Query:", query);
			console.log("Normalized Query:", normalizedQuery);
			console.log("Results Length:", built.length);
			console.log("Results:", built.results);
			console.log("Preprocessed Collection:", preprocessedCollection);
			console.log("Time:", built.time, "ms");
			console.groupEnd();
		}

		return built;
	};
}
