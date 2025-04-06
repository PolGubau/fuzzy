import type { Result, Range } from "../core/types";

export const sortByScore = <T>(a: Result<T>, b: Result<T>): number =>
	a.score - b.score;

type SortRangeTuple = (a: Range, b: Range) => number;
export const sortRangeTuple: SortRangeTuple = (a, b): number => a[0] - b[0];
