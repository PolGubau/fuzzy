import React from "react";
import { fuzzy, type Result } from "../index";

export type UseFuzzySearchListOptions<T, U> = {
	list: T[];
	key?: string;
	getText?: (item: T) => Array<string | null>;
	queryText: string;
	mapResultItem: (result: Result<T>) => U;
};

/**
 * Hook for fuzzy searching `list` against `queryText` and mapping the results with `mapResultItem`.
 *
 * If `queryText` is blank, `list` is returned in whole.
 *
 * See `createFuzzySearch` for more details. This hook simply wraps it (with memoization) in a React hook.
 *
 * For best performance, `getText` and `mapResultItem` functions should be memoized by the user.
 */
export default function useFuzzySearchList<T, U>({
	list,
	key,
	getText,
	queryText,
	mapResultItem,
}: UseFuzzySearchListOptions<T, U>): U[] {
	const performSearch = React.useMemo(
		// @ts-ignore
		() => fuzzy(list, { key, getText }),
		[list, key, getText],
	);
	const searchResults = React.useMemo(() => {
		return queryText
			? performSearch(queryText).results.map(mapResultItem)
			: list.map((item) =>
					mapResultItem({
						item,
						score: Number.POSITIVE_INFINITY,
						matches: [],
					}),
				);
	}, [list, mapResultItem, performSearch, queryText]);

	return searchResults;
}
