import type { Result } from "../types";

/**
 * Filters and sorts an array of results based on a maximum score and a limit.
 *
 * @template T - The type of the result data.
 * @param results - An array of results to filter and sort. Each result must have a `score` property.
 * @param maxScore - The maximum score threshold. Results with a score greater than this value will be excluded.
 * @param limit - The maximum number of results to return after filtering and sorting.
 * @returns A new array of results that are filtered by the maximum score, sorted in ascending order of score, and limited to the specified number of items.
 */
export const filterResults = <T>(
	results: Result<T>[],
	maxScore: number,
	limit: number,
): Result<T>[] => {
	return results
		.filter((result) => result.score <= maxScore)
		.sort((a, b) => a.score - b.score)
		.slice(0, limit);
};

/**
 * Transforms an array of `Result<T>` objects into an array of `Result<U>` objects
 * by applying an optional mapping function to the `item` property of each result.
 *
 * @template T - The type of the input items in the results.
 * @template U - The type of the output items in the results after mapping.
 *
 * @param results - An array of `Result<T>` objects to be transformed.
 * @param mapResultItem - An optional function that maps an item of type `T` to type `U`.
 *                         If not provided, the original results are returned as `Result<U>[]`.
 *
 * @returns An array of `Result<U>` objects. If `mapResultItem` is not provided, the original
 *          results are returned with their type cast to `Result<U>[]`.
 */
export const getMapResultItem = <T, U>(
	results: Result<T>[],
	mapResultItem?: (item: T) => U | undefined,
): Result<U>[] => {
	// if mapResultItem is not provided, return the original results
	if (!mapResultItem) {
		return results as unknown as Result<U>[];
	}

	// otherwise, map the results using the provided function
	return results.map(({ item, ...rest }) => ({
		...rest,
		item: mapResultItem(item),
	})) as unknown as Result<U>[];
};

export const parseResults = <T, U>(
	results: Result<T>[],
	maxScore: number,
	limit: number,
	mapResultItem?: (item: T) => U,
): Result<U>[] => {
	const filteredResults = filterResults(results, maxScore, limit);

	return getMapResultItem(filteredResults, mapResultItem);
};
