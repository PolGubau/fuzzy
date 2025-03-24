/**
 * Range of indices in a string, [index of first character, index of last character]
 */
export type Range = [number, number];

/**
 * List of character ranges in a string that should be highlighted
 */
export type HighlightRanges = Range[];

/**
 * List of fuzzy search matches (ranges of matching characters) for an item. This usually has one item, but can have more if `getText`
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
	getText?: (item: T) => Array<string | null>;
	/**
	 * If true, will log debug information to the console
	 * @default false
	 */
	debug?: boolean;
};

export type FuzzySearchResponse<T> = {
	results: Array<Result<T>>;
	/**
	 * The number of results found
	 */
	length: number;
	/**
	 * The time it took to run the search in milliseconds
	 */
	time: number;
};

export type FuzzySearcher<T> = (query: string) => FuzzySearchResponse<T>;
