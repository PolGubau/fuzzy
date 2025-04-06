import { describe, it, expect } from "vitest";
import { filterResults, getMapResultItem } from "./filters";
import type { Result } from "../types";

describe("filterResults", () => {
	it("filters results based on maxScore and sorts them in ascending order", () => {
		const results: Result<number>[] = [
			{ item: 1, score: 10, matches: [] },
			{ item: 2, score: 5, matches: [] },
			{ item: 3, score: 15, matches: [] },
		];
		const maxScore = 10;
		const limit = 2;

		const filtered = filterResults(results, maxScore, limit);

		expect(filtered).toEqual([
			{ item: 2, score: 5, matches: [] },
			{ item: 1, score: 10, matches: [] },
		]);
	});

	it("limits the number of results returned", () => {
		const results: Result<number>[] = [
			{ item: 1, score: 10, matches: [] },
			{ item: 2, score: 5, matches: [] },
			{ item: 3, score: 8, matches: [] },
		];
		const maxScore = 10;
		const limit = 2;

		const filtered = filterResults(results, maxScore, limit);

		expect(filtered.length).toBe(2);
	});

	it("returns an empty array if no results match the criteria", () => {
		const results: Result<number>[] = [
			{ item: 1, score: 15, matches: [] },
			{ item: 2, score: 20, matches: [] },
		];
		const maxScore = 10;
		const limit = 2;

		const filtered = filterResults(results, maxScore, limit);

		expect(filtered).toEqual([]);
	});
});

describe("getMapResultItem", () => {
	it("maps the item property of each result using the provided function", () => {
		const results: Result<number>[] = [
			{ item: 1, score: 10, matches: [] },
			{ item: 2, score: 5, matches: [] },
		];
		const mapResult = (item: number) => `Mapped-${item}`;

		const mapped = getMapResultItem(results, mapResult);

		expect(mapped).toEqual([
			{ item: "Mapped-1", score: 10, matches: [] },
			{ item: "Mapped-2", score: 5, matches: [] },
		]);
	});

	it("returns the original results if no mapping function is provided", () => {
		const results: Result<number>[] = [
			{ item: 1, score: 10, matches: [] },
			{ item: 2, score: 5, matches: [] },
		];

		const mapped = getMapResultItem(results);

		expect(mapped).toEqual(results);
	});

	it("handles undefined values returned by the mapping function", () => {
		const results: Result<number>[] = [
			{ item: 1, score: 10, matches: [] },
			{ item: 2, score: 5, matches: [] },
		];
		const mapResult = (item: number) => undefined;

		const mapped = getMapResultItem(results, mapResult);

		expect(mapped).toEqual([
			{ item: undefined, score: 10, matches: [] },
			{ item: undefined, score: 5, matches: [] },
		]);
	});
});
