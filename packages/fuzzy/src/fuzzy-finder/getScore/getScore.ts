import { isValidWordBoundary } from "../helpers/isValidBoundary";
import { sortRangeTuple } from "../helpers/sorters";
import { findFuzzyMatches } from "../algorithm/findFuzzyMatches";
import type { HighlightRanges, Range } from "../types";

export function getFuzzyMatchScore(
	item: string,
	normalizedItem: string,
	itemWords: Set<string>,
	query: string,
	normalizedQuery: string,
	queryWords: string[],
): [number, HighlightRanges] | null {
	// quick matches
	if (item === query) {
		return [0, [[0, item.length - 1]]];
	}

	const queryLen = query.length;
	const normalizedItemLen = normalizedItem.length;
	const normalizedQueryLen = normalizedQuery.length;

	if (normalizedItem === normalizedQuery) {
		return [0.1, [[0, normalizedItemLen - 1]]];
	}
	if (normalizedItem.startsWith(normalizedQuery)) {
		return [0.5, [[0, normalizedQueryLen - 1]]];
	}

	// contains query (starting at word boundary)
	// NOTE: It would be more correct to do a regex search, than to check previous character, since
	// it could be that the item found does _not_ start at a word boundary, but there is another match
	// that does. However, this is faster and should rarely be a problem, while fuzzy search will still
	// find other matches (just ranked lower)
	const exactContainsIdx = item.indexOf(query);
	if (
		exactContainsIdx > -1 &&
		isValidWordBoundary(item[exactContainsIdx - 1])
	) {
		return [0.9, [[exactContainsIdx, exactContainsIdx + queryLen - 1]]];
	}

	const containsIdx = normalizedItem.indexOf(normalizedQuery);
	if (
		containsIdx > -1 &&
		isValidWordBoundary(normalizedItem[containsIdx - 1])
	) {
		return [1, [[containsIdx, containsIdx + queryLen - 1]]];
	}

	// Match by words included
	// Score: 1.5 + 0.2*words (so that it's better than two non-word chunks)
	const queryWordCount = queryWords.length;
	if (queryWordCount > 1) {
		if (queryWords.every((word) => itemWords.has(word))) {
			const score = 1.5 + queryWordCount * 0.2;
			return [
				score,
				queryWords
					.map((word) => {
						const wordIndex = normalizedItem.indexOf(word);
						return [wordIndex, wordIndex + word.length - 1] as Range;
					})
					.sort(sortRangeTuple),
			];
		}
	}

	// Contains query (at any position)
	if (containsIdx > -1) {
		return [2, [[containsIdx, containsIdx + queryLen - 1]]];
	}

	return findFuzzyMatches(normalizedItem, normalizedQuery);
}
