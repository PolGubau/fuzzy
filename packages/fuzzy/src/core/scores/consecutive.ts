import type { HighlightRanges } from "../../types";

export function scoreConsecutiveLetters(
	indices: HighlightRanges,
	normalizedItem: string,
): [number, HighlightRanges] | null {
	// Score: 2 + sum of chunk scores
	// Chunk scores:
	// - 0.2 for a full word
	// - 0.4 for chunk starting at beginning of word
	// - 0.8 for chunk in the middle of the word (if >=3 characters)
	// - 1.6 for chunk in the middle of the word (if 1 or 2 characters)
	let score = 2;

	for (const [firstIdx, lastIdx] of indices) {
		const chunkLength = lastIdx - firstIdx + 1;
		const isStartOfWord =
			firstIdx === 0 ||
			normalizedItem[firstIdx] === " " ||
			normalizedItem[firstIdx - 1] === " ";
		const isEndOfWord =
			lastIdx === normalizedItem.length - 1 ||
			normalizedItem[lastIdx] === " " ||
			normalizedItem[lastIdx + 1] === " ";
		const isFullWord = isStartOfWord && isEndOfWord;
		// DEBUG:
		// console.log({
		//   firstIdx,
		//   lastIdx,
		//   chunkLength,
		//   isStartOfWord,
		//   isEndOfWord,
		//   isFullWord,
		//   before: normalizedItem[firstIdx - 1],
		//   after: normalizedItem[lastIdx + 1],
		// })
		if (isFullWord) {
			score += 0.2;
		} else if (isStartOfWord) {
			score += 0.4;
		} else if (chunkLength >= 3) {
			score += 0.8;
		} else {
			score += 1.6;
		}
	}

	return [score, indices];
}
