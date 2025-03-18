import { describe, expect, it } from "vitest";
import { aggressiveFuzzyMatch } from "./agressive";

describe("aggressiveFuzzyMatch", () => {
	it("should return null if no match is found", () => {
		const result = aggressiveFuzzyMatch("abcdef", "xyz");
		expect(result).toBeNull();
	});

	it("should return correct score and highlight ranges for a simple match", () => {
		const result = aggressiveFuzzyMatch("abcdef", "abc");
		expect(result).toEqual([2.4, [[0, 2]]]);
	});

	it("should return correct score and highlight ranges for a match with gaps", () => {
		const result = aggressiveFuzzyMatch("a_b_c_d_e_f", "ace");
		expect(result).toEqual([
			5.6,
			[
				[0, 0],
				[4, 4],
				[8, 8],
			],
		]);
	});

	it("should return correct score and highlight ranges for a match with consecutive letters", () => {
		const result = aggressiveFuzzyMatch("aabbcc", "abc");
		expect(result).toEqual([
			5.6,
			[
				[0, 0],
				[2, 2],
				[4, 4],
			],
		]);
	});

	it("should return correct score and highlight ranges for a match with repeated letters", () => {
		const result = aggressiveFuzzyMatch("aaaabbbbcccc", "abc");
		expect(result).toEqual([
			5.6,
			[
				[0, 0],
				[4, 4],
				[8, 8],
			],
		]);
	});

	it("should return correct score and highlight ranges for a match at the end of the string", () => {
		const result = aggressiveFuzzyMatch("xyzabcdef", "def");
		expect(result).toEqual([2.8, [[6, 8]]]);
	});
});
