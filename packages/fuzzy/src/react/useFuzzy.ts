import React from "react";
import { fuzzy, type Result } from "../index";

export type useFuzzyOptions<T, U> = {
	/**
	 * List of items to search against
	 */
	list: T[];
	/**
	 * The query to search for. This is the string that will be searched for in the items.
	 * @default ""
	 * @example "foo"
	 */
	key?: string;
	/**
	 * Function that returns the string to search for in the item. This is useful if the item is an object and you want to search for a specific property.
	 * @default undefined
	 * @example (item) => [item.name]
	 * @example (item) => [item.name, item.surname]
	 */
	getKey?: (item: T) => Array<string | null>;
	/**
	 * The query to search for. This is the string that will be searched for in the items.
	 * @default ""
	 * @example "foo"
	 */
	query: string;
	/**
	 * Function that maps the result item to a new item. This is useful if you want to transform the result item before returning it.
	 * @default (result) => result.item
	 * @example (result) => ({ ...result.item, score: result.score })
	 */
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
