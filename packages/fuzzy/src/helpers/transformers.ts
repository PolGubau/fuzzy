import { FuzzyBuilder } from "../builders/searcher.builder";
import type { FuzzyResponse, MapResult, Result } from "../core/types";
import { parseResults } from "./filters";

export const unmatchedItem = <T>(item: T): Result<T> => {
	return {
		item,
		score: Number.MAX_SAFE_INTEGER,
		matches: [],
	};
};

export const unmatchedItems = <T>(items: T[]): Result<T>[] => {
	return items.map(unmatchedItem);
};

export const emptyResponse = <T>(query = ""): FuzzyResponse<T> => {
	const startTime = Date.now();

	return new FuzzyBuilder<T>({
		results: [],
		startTime,
		endTime: startTime,
		normalizedQuery: query,
	}).build();
};

export const unsortedResponse = <T, U = T>(
	items: T[],
	maxScore: number,
	limit: number,
	mapResult?: MapResult<T, U>,
	normalizedQuery = "",
): FuzzyResponse<U> => {
	const itemsWithResult = unmatchedItems(items);
	const results = parseResults(itemsWithResult, maxScore, limit, mapResult);
	return new FuzzyBuilder<U>({
		results,
		normalizedQuery,
	}).build();
};
