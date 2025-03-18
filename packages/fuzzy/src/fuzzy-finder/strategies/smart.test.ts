import { describe, it, expect } from "vitest";
import { experimentalSmartFuzzyMatch } from "./smart";
import type { HighlightRanges } from "../types";

describe("experimentalSmartFuzzyMatch", () => {
	it("should return null if no match is found", () => {
		const result = experimentalSmartFuzzyMatch("abcdef", "xyz");
		expect(result).toBeNull();
	});

	it("should match consecutive letters at word boundaries", () => {
		const result = experimentalSmartFuzzyMatch("abc def ghi", "def");
		expect(result).toEqual([2.2, [[4, 6]]]);
	});
  it("should skip non-word-boundary single-letter matches and continue searching", () => {
	const result = experimentalSmartFuzzyMatch("xa test", "test");
	expect(result).toEqual([2.2, [[3, 6]]]);
});

	it("should match chunks of 3+ letters", () => {
		const result = experimentalSmartFuzzyMatch("abc def ghi", "ghi");
		expect(result).toEqual([2.2, [[8, 10]]]);
	});

	it("should match multiple chunks", () => {
		const result = experimentalSmartFuzzyMatch("abc def ghi", "adg");
		expect(result).toEqual([
			3.1999999999999997,
			[
				[0, 0],
				[4, 4],
				[8, 8],
			],
		]);
	});

	it("should prefer word boundaries over longer chunks", () => {
		const result = experimentalSmartFuzzyMatch("xabc", "abc");
		expect(result).toEqual([ 2.8, [[ 1, 3 ]]]);
	});

	it("should handle case where query is longer than item", () => {
		const result = experimentalSmartFuzzyMatch("abc", "abcdef");
		expect(result).toBeNull();
	});

	it("should handle case where item is empty", () => {
		const result = experimentalSmartFuzzyMatch("", "abc");
		expect(result).toBeNull();
	});

	it("should handle case where query is empty", () => {
		const result = experimentalSmartFuzzyMatch("abc", "");
		expect(result).toBeNull();
	});
});
