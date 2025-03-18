import { describe, it, expect } from "vitest";
import { scoreConsecutiveLetters } from "./consecutive";
import type { HighlightRanges } from "../types";

describe("scoreConsecutiveLetters", () => {
	it("should return 2 points if it's just 1 consecutive", () => {
		const result = scoreConsecutiveLetters([], "test");
		expect(result).toStrictEqual([2, []]);
	});

	it("should score a full word correctly", () => {
		const indices: HighlightRanges = [[0, 3]];
		const result = scoreConsecutiveLetters(indices, "test");
		expect(result).toEqual([2.2, indices]);
	});

	it("should score a chunk starting at the beginning of a word correctly", () => {
		const indices: HighlightRanges = [[0, 1]];
		const result = scoreConsecutiveLetters(indices, "test");
		expect(result).toEqual([2.4, indices]);
	});

	it("should score a chunk in the middle of a word (>=3 characters) correctly", () => {
		const indices: HighlightRanges = [[1, 3]];
		const result = scoreConsecutiveLetters(indices, "atest");
		expect(result).toEqual([2.8, indices]);
	});

	it("should score a chunk in the middle of a word (1 or 2 characters) correctly", () => {
		const indices: HighlightRanges = [[1, 2]];
		const result = scoreConsecutiveLetters(indices, "atest");
		expect(result).toEqual([3.6, indices]);
	});

	it("should handle multiple chunks correctly", () => {
		const indices: HighlightRanges = [
			[0, 1],
			[2, 4],
		];
		const result = scoreConsecutiveLetters(indices, "a test");
		expect(result).toEqual([2.6, indices]);
	});

	it("should handle chunks at the end of a word correctly", () => {
		const indices: HighlightRanges = [[2, 3]];
		const result = scoreConsecutiveLetters(indices, "test");
		expect(result).toEqual([3.6, indices]);
	});
});
