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

const { MAX_SAFE_INTEGER } = Number;

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
	const {
		getText,
		debug,
		limit = Number.MAX_SAFE_INTEGER,
		maxScore = 100,
	} = options;

	const normalizedTexts: [T, [string, string, Set<string>][]][] =
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

	const res: FuzzySearcher<T> = (query: string): FuzzySearchResponse<T> => {
		const startTime = Date.now();
		const results: Array<Result<T>> = [];
		const normalizedQuery = normalizeText(query);
		const queryWords = normalizedQuery.split(" ");

		if (!normalizedQuery.length) {
			return new FuzzySearcherBuilder({
				results: [] as Array<Result<T>>,
				startTime,
				endTime: startTime,
				normalizedQuery,
			}).build();
		}

		for (const [element, texts] of normalizedTexts) {
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
					bestScore = Math.min(bestScore, result[0]);
					matches.push(result[1]);
				} else {
					matches.push(null);
				}
			}
			if (bestScore < MAX_SAFE_INTEGER) {
				results.push({ item: element, score: bestScore, matches });
			}
		}

		// Filter the max score and then the filters
		results
			.sort(sortByScore)
			.filter((result) => {
				if (maxScore && result.score > maxScore) {
					return false;
				}
				return true;
			})
			.slice(0, limit);

		const endTime = Date.now();

		const built = new FuzzySearcherBuilder({
			results,
			startTime,
			endTime,
			normalizedQuery,
		}).build();

		if (debug) {
			// Group of logs with the info of the search
			console.groupCollapsed("Fuzzy Search");
			console.log("Query:", query);
			console.log("Normalized Query:", normalizedQuery);
			console.log("Results Length:", built.length);
			console.log("Results:", built.results);
			console.log("Preprocessed Collection:", normalizedTexts);
			console.log("Time:", built.time, "ms");
			console.groupEnd();
		}

		return built;
	};

	return res;
}
