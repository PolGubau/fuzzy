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
	describe("query words contained in itemWords", () => {
		it("should return correct score and highlight ranges when all query words exist in itemWords", () => {
			const item = "hello world example";
			const normalizedItem = "hello world example";
			const itemWords = new Set(["hello", "world", "example"]);
			const query = "hello world";
			const normalizedQuery = "hello world";
			const queryWords = ["hello", "world"];

			const result = getFuzzyMatchScore(
				item,
				normalizedItem,
				itemWords,
				query,
				normalizedQuery,
				queryWords,
			);

			expect(result).toEqual([
				1.9,
				[
					[0, 4], // "hello"
					[6, 10], // "world"
				],
			]);
		});

		it("should return null when not all query words exist in itemWords", () => {
			const item = "hello world example";
			const normalizedItem = "hello world example";
			const itemWords = new Set(["hello", "example"]);
			const query = "hello world";
			const normalizedQuery = "hello world";
			const queryWords = ["hello", "world"];

			const result = getFuzzyMatchScore(
				item,
				normalizedItem,
				itemWords,
				query,
				normalizedQuery,
				queryWords,
			);

			expect(result).toBeNull();
		});
	});

	describe("getFuzzyMatchScore - contains query at a word boundary", () => {
		it("should return correct score and highlight range when query is found at a word boundary", () => {
			const item = "hello world example";
			const normalizedItem = "hello world example";
			const itemWords = new Set(["hello", "world", "example"]);
			const query = "world";
			const normalizedQuery = "world";
			const queryWords = ["world"];

			const result = getFuzzyMatchScore(
				item,
				normalizedItem,
				itemWords,
				query,
				normalizedQuery,
				queryWords,
			);

			expect(result).toEqual([
				1,
				[[6, 10]], // "world" at index 6
			]);
		});

		it("should return null when query is found but not at a word boundary", () => {
			const item = "helloworld example";
			const normalizedItem = "helloworld example";
			const itemWords = new Set(["helloworld", "example"]);
			const query = "world";
			const normalizedQuery = "world";
			const queryWords = ["world"];

			const result = getFuzzyMatchScore(
				item,
				normalizedItem,
				itemWords,
				query,
				normalizedQuery,
				queryWords,
			);

			expect(result).toBeNull();
		});
	});
	describe("Query words match in itemWords", () => {
		it("should return correct score and ranges when all query words are in itemWords", () => {
			const item = "hello world example";
			const normalizedItem = "hello world example";
			const itemWords = new Set(["hello", "world", "example"]);
			const query = "world hello";
			const normalizedQuery = "world hello";
			const queryWords = ["world", "hello"];

			const result = getFuzzyMatchScore(
				item,
				normalizedItem,
				itemWords,
				query,
				normalizedQuery,
				queryWords,
			);

			expect(result).toEqual([
				1.9, // 1.5 + 2*0.2 (because queryWords.length is 2)
				[
					[6, 10], // "world"
					[0, 4], // "hello"
				].sort((a, b) => a[0] - b[0]),
			]);
		});

		it("should return null if not all query words are in itemWords", () => {
			const item = "hello world";
			const normalizedItem = "hello world";
			const itemWords = new Set(["hello", "world"]);
			const query = "world missing";
			const normalizedQuery = "world missing";
			const queryWords = ["world", "missing"];

			const result = getFuzzyMatchScore(
				item,
				normalizedItem,
				itemWords,
				query,
				normalizedQuery,
				queryWords,
			);
			expect(result).toBeNull();
		});

		it("should handle repeated words correctly", () => {
			const item = "hello hello world";
			const normalizedItem = "hello hello world";
			const itemWords = new Set(["hello", "world"]);
			const query = "hello world";
			const normalizedQuery = "hello world";
			const queryWords = ["hello", "world"];

			const result = getFuzzyMatchScore(
				item,
				normalizedItem,
				itemWords,
				query,
				normalizedQuery,
				queryWords,
			);

			expect(result).toEqual([
				1.9, // 1.5 + 2*0.2
				[
					[0, 4], // "hello" (first occurrence)
					[12, 16], // "world"
				].sort((a, b) => a[0] - b[0]),
			]);
		});
	});
});
