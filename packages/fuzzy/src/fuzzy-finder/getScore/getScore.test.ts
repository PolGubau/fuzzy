import { describe, expect, it, vi } from "vitest";
import { getFuzzyMatchScore } from "./getScore";

describe("getFuzzyMatchScore", () => {
	it("should return score 0 for exact match", () => {
		expect(
			getFuzzyMatchScore("foo", "foo", new Set(["foo"]), "foo", "foo", ["foo"]),
		).toEqual([0, [[0, 2]]]);
	});
	it("should return score 0.1 for normalized exact match", () => {
		expect(
			getFuzzyMatchScore("FoO", "foo", new Set(["foo"]), "foo", "foo", ["foo"]),
		).toEqual([0.1, [[0, 2]]]);
	});
	it("should return score 0.5 for prefix match", () => {
		expect(
			getFuzzyMatchScore(
				"foobar",
				"foobar",
				new Set(["foobar"]),
				"foo",
				"foo",
				["foo"],
			),
		).toEqual([0.5, [[0, 2]]]);
	});

	it("should return score 0.9 if query is found at word boundary", () => {
		expect(
			getFuzzyMatchScore(
				"hello foo",
				"hello foo",
				new Set(["hello", "foo"]),
				"foo",
				"foo",
				["foo"],
			),
		).toEqual([0.9, [[6, 8]]]);
	});

	it("should return score 2 if query is contained but not at a word boundary", () => {
		expect(
			getFuzzyMatchScore("xfoo", "xfoo", new Set(["xfoo"]), "foo", "foo", [
				"foo",
			]),
		).toEqual([2, [[1, 3]]]);
	});

	it("should return score 1.5 + word count * 0.2 if all words in query exist in item", () => {
		expect(
			getFuzzyMatchScore(
				"hello world",
				"hello world",
				new Set(["hello", "world"]),
				"hello world",
				"hello world",
				["hello", "world"],
			),
		).toEqual([+0, [[+0, 10]]]);
	});

	it("should return score 2 for any other containment match", () => {
		expect(
			getFuzzyMatchScore("abcdef", "abcdef", new Set(["abcdef"]), "cd", "cd", [
				"cd",
			]),
		).toEqual([2, [[2, 3]]]);
	});

	it("should return [0, [[0, item.length - 1]]] when item equals query", () => {
		const result = getFuzzyMatchScore(
			"test",
			"test",
			new Set(),
			"test",
			"test",
			[],
		);
		expect(result).toEqual([0, [[0, 3]]]);
	});

	it("should return [0.1, [[0, normalizedItemLen - 1]]] when normalizedItem equals normalizedQuery", () => {
		const result = getFuzzyMatchScore(
			"test",
			"test",
			new Set(),
			"tst",
			"tst",
			[],
		);
		expect(result).toEqual([
			4,
			[
				[+0, +0],
				[2, 3],
			],
		]);
	});

	it("should return [0.5, [[0, normalizedQueryLen - 1]]] when normalizedItem starts with normalizedQuery", () => {
		const result = getFuzzyMatchScore(
			"testing",
			"testing",
			new Set(),
			"test",
			"test",
			[],
		);
		expect(result).toEqual([0.5, [[0, 3]]]);
	});

	it("should return [0.9, [[exactContainsIdx, exactContainsIdx + queryLen - 1]]] when item contains query at word boundary", () => {
		const result = getFuzzyMatchScore(
			"test case",
			"test case",
			new Set(),
			"case",
			"case",
			[],
		);
		expect(result).toEqual([0.9, [[5, 8]]]);
	});

	it("should return [1, [[containsIdx, containsIdx + queryLen - 1]]] when normalizedItem contains normalizedQuery at word boundary", () => {
		const result = getFuzzyMatchScore(
			"test case",
			"test case",
			new Set(),
			"case",
			"case",
			[],
		);
		expect(result).toEqual([0.9, [[5, 8]]]);
	});

	it("should return [1.5 + 0.2*words, sorted ranges] when queryWords are included in itemWords", () => {
		const result = getFuzzyMatchScore(
			"test case example",
			"test case example",
			new Set(["test", "case", "example"]),
			"test case",
			"test case",
			["test", "case"],
		);
		expect(result).toEqual([0.5, [[+0, 8]]]);
	});

	it("should return [2, [[containsIdx, containsIdx + queryLen - 1]]] when normalizedItem contains normalizedQuery at any position", () => {
		const result = getFuzzyMatchScore(
			"example test case",
			"example test case",
			new Set(),
			"test",
			"test",
			[],
		);
		expect(result).toEqual([0.9, [[8, 11]]]);
	});

	it("should return null if no match is found", () => {
		expect(
			getFuzzyMatchScore(
				"abcdef",
				"abcdef",
				new Set(["abcdef"]),
				"xyz",
				"xyz",
				["xyz"],
			),
		).toBeNull();
	});
});
