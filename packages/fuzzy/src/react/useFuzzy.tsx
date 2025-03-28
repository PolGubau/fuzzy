import React from "react";
import { fuzzy, type FuzzySearchOptions, type Result } from "../index";

export type useFuzzyOptions<T, U = T> = {
	/**
	 * List of items to search against
	 */
	list: T[];

	/**
	 * The query to search for. This is the string that will be searched for in the items.
	 * @default ""
	 * @example "foo"
	 */
	query: string;
} & FuzzySearchOptions<T, U>;

/**
 * Hook for fuzzy searching `list` against `query` and mapping the results with `mapResultItem`.
 *
 * If `query` is blank, `list` is returned in whole.
 *
 * See `createFuzzySearch` for more details. This hook simply wraps it (with memoization) in a React hook.
 *
 * For best performance, `getKey` and `mapResultItem` functions should be memoized by the user.
 */
export function useFuzzy<T, U = T>({
	list,
	query,
	mapResultItem,
	...options
}: useFuzzyOptions<T, U>): Result<U>[] {
	const {
		key,
		getKey,
		debug = false,
		limit = Number.MAX_SAFE_INTEGER,
		maxScore = 100,
	} = options;

	const executeFuzzy = React.useMemo(
		() => fuzzy(list, { key, getKey, debug, limit, maxScore }),
		[list, key, getKey, debug, limit, maxScore],
	);

	const searchResults = React.useMemo(() => {
		const results = query
			? executeFuzzy(query).results
			: list.map((item) => ({
					item,
					score: Number.POSITIVE_INFINITY,
					matches: [],
				}));

		return mapResultItem
			? results.map(({ item, ...rest }) => ({
					...rest,
					item: mapResultItem(item),
				}))
			: (results as unknown as Result<U>[]);
	}, [list, mapResultItem, executeFuzzy, query]);

	return searchResults;
}
