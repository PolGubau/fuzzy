/**
 * Range of indices in a string, [index of first character, index of last character]
 */
export type Range = [number, number];
/**
 * List of character ranges in a string that should be highlighted
 */
export type HighlightRanges = Range[];
/**
 * List of fuzzy search matches (ranges of matching characters) for an item. This usually has one item, but can have more if `getKey`
 * was used to return multiple strings for an item.
 */
export type Matches = Array<HighlightRanges | null>;
/**
 * Result of fuzzy against an item.
 *
 * - `item` - the item that was matched
 * - `score` - Difference between the query and the item. The lower the score, the better the match.
 * - `matches` - list of matches for the item. Each match is a list of ranges of characters that should be highlighted in the item.
 */
export interface Result<T> {
	item: T;
	score: number;
	matches: Matches;
}
export interface FuzzySearchOptions<T> {
	/**
	 * The query to search for. This is the string that will be searched for in the items.
	 * @default ""
	 * @example "foo"
	 */
	key?: keyof T;

	/**
	 * Function that returns the string to search for in the item. This is useful if the item is an object and you want to search for a specific property.
	 * @default undefined
	 * @example (item) => item.name
	 * @example (item) => item.name + " " + item.surname
	 */
	getKey?: (item: T) => Array<string | null>;
	/**
	 * If true, will log debug information to the console
	 * @default false
	 */
	debug?: boolean;
	/**
	 * The maximum number of results to return. If not specified, all results will be returned.
	 * @description The lower the number, the more results will be filtered out.
	 * @default Number.MAX_SAFE_INTEGER
	 * @example 10
	 */
	limit?: number;
	/**
	 * The max score to return. If not specified, all results will be returned.
	 * @default 100
	 * @example 2.5
	 * @description The lower the score, the better the match.
	 */
	maxScore?: number;
}
export type FuzzySearchResponse<T> = {
	/**
	 * The array of results found
	 * @default []
	 * @example [{ item: "foo", score: 0, matches: [] }, { item: "bar", score: 1, matches: [] }]
	 */
	results: Array<Result<T>>;
	/**
	 * The amount (int) of results found
	 * @default 0
	 * @example 2
	 */
	length: number;
	/**
	 * The time it took to run the search in milliseconds
	 * @default 0
	 * @example 0.8
	 */
	time: number;

	/**
	 * The query that was used to search
	 * @default ""
	 */
	normalizedQuery: string;

	/**
	 * True if the query was an exact match to the item
	 * @default false
	 * @example true
	 */
	hasExactMatch: boolean;

	/**
	 * The best match found
	 * @default null
	 * @example { item: "foo", score: 0, matches: [] }
	 * @example null
	 */
	bestMatch: Result<T> | null;

	/**
	 * True if there were any results found
	 * @default false
	 * @example true
	 **/
	hasResults: boolean;
};
export type FuzzySearcher<T> = (query: string) => FuzzySearchResponse<T>;
