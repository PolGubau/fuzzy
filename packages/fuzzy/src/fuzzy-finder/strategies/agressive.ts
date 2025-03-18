import { scoreConsecutiveLetters } from "../scores/consecutive";
import type { HighlightRanges } from "../types";

export function aggressiveFuzzyMatch(
	normalizedItem: string,
	normalizedQuery: string,
): [number, HighlightRanges] | null {
	const normalizedItemLen = normalizedItem.length;
	const normalizedQueryLen = normalizedQuery.length;

	let queryIdx = 0;
	let queryChar = normalizedQuery[queryIdx];
	const indices: HighlightRanges = [];
	let chunkFirstIdx = -1;
	let chunkLastIdx = -2;
	// TODO: May improve performance by early exits (less to go than remaining query)
	// and by using .indexOf(x, fromIndex)
	for (let itemIdx = 0; itemIdx < normalizedItemLen; itemIdx += 1) {
		// DEBUG:
		// console.log(`${itemIdx} (${normalizedItem[itemIdx]}), ${queryIdx} (${queryChar}), ${chunkLastIdx}, score: ${consecutiveChunks}`)
		if (normalizedItem[itemIdx] === queryChar) {
			if (itemIdx !== chunkLastIdx + 1) {
				if (chunkFirstIdx >= 0) {
					indices.push([chunkFirstIdx, chunkLastIdx]);
				}
				chunkFirstIdx = itemIdx;
			}
			chunkLastIdx = itemIdx;
			queryIdx += 1;
			if (queryIdx === normalizedQueryLen) {
				indices.push([chunkFirstIdx, chunkLastIdx]);
				return scoreConsecutiveLetters(indices, normalizedItem);
			}
			queryChar = normalizedQuery[queryIdx];
		}
	}

	return null;
}
