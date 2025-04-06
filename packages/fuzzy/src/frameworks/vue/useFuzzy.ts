import { ref, watch, type Ref } from "vue";
import type { FuzzyOptions, FuzzyResponse } from "../../core/types";
import { fuzzy } from "../../core";

/**
 * Vue composable to perform fuzzy search reactively
 *
 * @param list - Reactive list of items to search in
 * @param query - Reactive search query
 * @param options - Fuzzy search configuration
 * @returns A Ref containing the fuzzy search response
 */
export function useFuzzy<T, U = T>(
	/**
	 * List of items to search against
	 */
	list: Ref<T[]>,
	/**
	 * The query to search for. This is the string that will be searched for in the items.
	 * @default ""
	 * @example "foo"
	 */
	query: Ref<string>,

	/**
	 * Optional fuzzy search configuration
	 * @default {}
	 */
	options: FuzzyOptions<T, U> = {},
): Ref<FuzzyResponse<U>> {
	const response = ref<FuzzyResponse<U>>({
		results: [],
		length: 0,
		time: 0,
		normalizedQuery: "",
		hasExactMatch: false,
		bestMatch: null,
		hasResults: false,
	});

	// Watch for changes in the list and query
	watch(
		[list, query],
		([newItems, newQuery]) => {
			// Call fuzzy function to get search results
			const fn = fuzzy<T, U>(newItems, options);
			const searchResponse = fn(newQuery);
			response.value = searchResponse;
		},
		{ immediate: true },
	);

	return response as Ref<FuzzyResponse<U>>;
}
