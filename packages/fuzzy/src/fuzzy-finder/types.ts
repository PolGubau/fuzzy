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
 * `item` - the item that was matched
 * `score` - Difference between the query and the item. The lower the score, the better the match.
 * `matches` - list of matches for the item. Each match is a list of ranges of characters that should be highlighted in the item.
 */
export type Result<T> = { item: T; score: number; matches: Matches };

export type FuzzySearchOptions<T> = {
	key?: keyof T;
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
};

export type FuzzySearchResponse<T> = {
	results: Array<Result<T>>;
	/**
	 * @description The number of results found
	 * @default []
	 * @example [{ item: "foo", score: 0, matches: [] }, { item: "bar", score: 1, matches: [] }]
	 */
	length: number;
	/**
	 * The time it took to run the search in milliseconds
	 * @default 0
	 * @description The time it took to run the search in milliseconds
	 * @example 0.8
	 */
	time: number;

	/**
	 * The query that was used to search
	 * @default ""
	 */
	normalizedQuery: string;

	/**
	 * @description True if the query was an exact match to the item
	 * @default false
	 * @example true
	 */
	hasExactMatch: boolean;

	/**
	 * @description The best match found
	 * @default null
	 * @example { item: "foo", score: 0, matches: [] }
	 * @example null
	 */
	bestMatch: Result<T> | null;

	/**
	 * @description True if there were any results found
	 * @default false
	 * @example true
	 **/
	hasResults: boolean;
};

export type FuzzySearcher<T> = (query: string) => FuzzySearchResponse<T>;
