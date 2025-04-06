import React from "react";
import { unsortedResponse } from "../../helpers/transformers";
import { defaults } from "../../constants";
import type { FuzzyOptions, FuzzyResponse } from "../../types";
import { fuzzy } from "../../core";

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
} & FuzzyOptions<T, U>;

/**
 * Hook for fuzzy searching `list` against `query` and mapping the results with `mapResult`.
 *
 * If `query` is blank, `list` is returned in whole.
 *
 * See `createFuzzySearch` for more details. This hook simply wraps it (with memoization) in a React hook.
 *
 * For best performance, `getKey` and `mapResult` functions should be memoized by the user.
 */

export function useFuzzy<T, U = T>({
	list,
	query,
	...options
}: useFuzzyOptions<T, U>): FuzzyResponse<U> {
	const {
		key,
		getKey,
		debug = defaults.debug,
		limit = defaults.limit,
		maxScore = defaults.maxScore,
		mapResult,
	} = options;

	// Memoriza las opciones para evitar recreaciones innecesarias
	const memoizedOptions = React.useMemo(
		() => ({ key, getKey, debug, limit, maxScore, mapResult }),
		[key, getKey, debug, limit, maxScore, mapResult],
	);

	// Memoiza la lista para evitar cambios en cada render (si la recibe como prop)
	const stableList = React.useMemo(() => list, [list]);

	// Crea la función fuzzy solo cuando cambian lista u opciones
	const executeFuzzy = React.useMemo(
		() => fuzzy(stableList, memoizedOptions),
		[stableList, memoizedOptions],
	);

	// Devuelve los resultados filtrados o la lista original ordenada si no hay query
	const results = React.useMemo(() => {
		if (!query) {
			return unsortedResponse(stableList, maxScore, limit, mapResult, query);
		}
		return executeFuzzy(query);
	}, [stableList, maxScore, limit, mapResult, query, executeFuzzy]);

	return results;
}
