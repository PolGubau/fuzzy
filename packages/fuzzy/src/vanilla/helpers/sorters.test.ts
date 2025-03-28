import { describe, it, expect } from "vitest";
import { sortByScore, sortRangeTuple } from "./sorters";
import type { FuzzyMatches, FuzzyResult, Range } from "../types";

class FuzzyResultBuilder<T> {
	private result: FuzzyResult<T>;

	constructor() {
		this.result = { score: 0, item: {} as T, matches: [] };
	}

	setScore(score: number): this {
		this.result.score = score;
		return this;
	}

	setItem(item: T): this {
		this.result.item = item;
		return this;
	}

	setMatches(matches: FuzzyMatches): this {
		this.result.matches = matches;
		return this;
	}

	build(): FuzzyResult<T> {
		return this.result;
	}
}

describe("sortByScore", () => {
	it("should sort by score in ascending order", () => {
		const a = new FuzzyResultBuilder<number>().setScore(1).build();
		const b = new FuzzyResultBuilder<number>().setScore(2).build();
		const c = new FuzzyResultBuilder<number>().setScore(3).build();

		const array = [c, a, b];
		array.sort(sortByScore);

		expect(array).toEqual([a, b, c]);
	});
});

describe("sortRangeTuple", () => {
	it("should sort ranges by the first element in ascending order", () => {
		const a: Range = [1, 5];
		const b: Range = [2, 6];
		const c: Range = [3, 7];

		const array = [c, a, b];
		array.sort(sortRangeTuple);

		expect(array).toEqual([a, b, c]);
	});
});
