import React from "react";
import { fuzzy, type Result } from "../index";

export type useFuzzyOptions<T, U> = {
	list: T[];
	key?: string;
	getKey?: (item: T) => Array<string | null>;
	query: string;
	mapResultItem: (result: Result<T>) => U;
};

/**
 * Hook for fuzzy searching `list` against `query` and mapping the results with `mapResultItem`.
 *
 * If `query` is blank, `list` is returned in whole.
 *
 * See `createFuzzySearch` for more details. This hook simply wraps it (with memoization) in a React hook.
 *
 * For best performance, `getKey` and `mapResultItem` functions should be memoized by the user.
 */
export function useFuzzy<T, U>({
	list,
	key,
	getKey,
	query,
	mapResultItem,
}: useFuzzyOptions<T, U>): U[] {
	const executeFuzzy = React.useMemo(
		// @ts-ignore
		() => fuzzy(list, { key, getKey }),
		[list, key, getKey],
	);

	const searchResults = React.useMemo(() => {
		return query
			? executeFuzzy(query).results.map(mapResultItem)
			: list.map((item) =>
					mapResultItem({
						item,
						score: Number.POSITIVE_INFINITY,
						matches: [],
					}),
				);
	}, [list, mapResultItem, executeFuzzy, query]);

	return searchResults;
}
