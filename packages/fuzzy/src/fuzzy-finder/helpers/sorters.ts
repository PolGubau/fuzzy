import type { FuzzyResult, Range } from "../types";

export const sortByScore = <T>(a: FuzzyResult<T>, b: FuzzyResult<T>): number =>
	a.score - b.score;

type SortRangeTuple = (a: Range, b: Range) => number;
export const sortRangeTuple: SortRangeTuple = (a, b): number => a[0] - b[0];
