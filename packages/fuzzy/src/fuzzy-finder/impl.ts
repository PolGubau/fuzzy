import { getFuzzyMatchScore } from "./getScore/getScore";
import { sortByScore } from "./helpers/sorters";
import normalizeText from "./normalizeText";
import type {
	Matches,
	Result,
	FuzzySearchOptions,
	FuzzySearcher,
} from "./types";

const { MAX_SAFE_INTEGER } = Number;

export function fuzzyMatchImpl(
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

export function createFuzzySearchImpl<Element>(
	collection: Element[],
	options: FuzzySearchOptions<Element> = {},
): FuzzySearcher<Element> {
	const { getText } = options;

	const preprocessedCollection: [Element, [string, string, Set<string>][]][] =
		collection.map((element: Element) => {
			let texts: (string | null)[];

			if (getText) {
				texts = getText(element);
			} else {
				texts = [
					options.key
						? element[options.key as keyof Element]
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
		// DEBUG
		// const b4 = Date.now()
		const results: Array<Result<Element>> = [];
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

		// DEBUG
		// console.log(`fuzzy search complete in ${Date.now() - b4} ms`)

		return results;
	};
}
