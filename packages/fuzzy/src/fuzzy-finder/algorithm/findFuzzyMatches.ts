import { isValidWordBoundary } from "../helpers/isValidBoundary";
import { scoreConsecutiveLetters } from "../scores/consecutive";
import type { HighlightRanges } from "../types";

export function findFuzzyMatches(
	normalizedItem: string,
	normalizedQuery: string,
): [number, HighlightRanges] | null {
	const normalizedItemLen = normalizedItem.length;

	// Match by consecutive letters, but only match beginnings of words or chunks of 3+ letters
	// Note that there may be multiple valid ways in which such matching can be done, and we'll only
	// match each chunk to the first one found that matches these criteria. It's not perfect as it's
	// possible that later chunks will fail to match while there's a better match, for example:
	// - query: ABC
	// - item: A xABC
	//         ^___xx (no match)
	//         ___^^^ (better match)
	// But we want to limit the algorithmic complexity and this should generally work.

	const indices: HighlightRanges = [];
	let queryIdx = 0;
	let queryChar = normalizedQuery[queryIdx];
	let chunkFirstIdx = -1;
	let chunkLastIdx = -2;

	// eslint-disable-next-line no-constant-condition
	while (true) {
		// Find match for first letter of chunk
		const idx = normalizedItem.indexOf(queryChar, chunkLastIdx + 1);
		if (idx === -1) {
			break;
		}

		// Check if chunk starts at word boundary
		if (idx === 0 || isValidWordBoundary(normalizedItem[idx - 1])) {
			chunkFirstIdx = idx;
		} else {
			// Else, check if chunk is at least 3+ letters
			const queryCharsLeft = normalizedQuery.length - queryIdx;
			const itemCharsLeft = normalizedItem.length - idx;
			const minimumChunkLen = Math.min(3, queryCharsLeft, itemCharsLeft);
			const minimumQueryChunk = normalizedQuery.slice(
				queryIdx,
				queryIdx + minimumChunkLen,
			);

			if (
				normalizedItem.slice(idx, idx + minimumChunkLen) === minimumQueryChunk
			) {
				chunkFirstIdx = idx;
			} else {
				// Move index to continue search for valid chunk
				chunkLastIdx += 1;
				continue;
			}
		}

		// We have first index of a valid chunk, find its last index
		// TODO: We could micro-optimize by setting chunkLastIdx earlier if we already know it's len 3 or more
		for (
			chunkLastIdx = chunkFirstIdx;
			chunkLastIdx < normalizedItemLen;
			chunkLastIdx += 1
		) {
			if (normalizedItem[chunkLastIdx] !== queryChar) {
				break;
			}

			queryIdx += 1;
			queryChar = normalizedQuery[queryIdx];
		}

		// Add chunk to indices
		chunkLastIdx -= 1; // decrement as we've broken out of loop on non-matching char
		indices.push([chunkFirstIdx, chunkLastIdx]);

		// Check if we're done
		if (queryIdx === normalizedQuery.length) {
			return scoreConsecutiveLetters(indices, normalizedItem);
		}
	}

	// eslint-disable-next-line no-unreachable
	return null;
}
