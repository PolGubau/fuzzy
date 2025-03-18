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
export type FuzzyMatches = Array<HighlightRanges | null>;

/**
 * Result of fuzzy matching `queryText` against an item.
 *
 * `score` - lower = better match (think "error level")
 */
export type FuzzyResult<T> = { item: T; score: number; matches: FuzzyMatches };

/**
 * Strategy for fuzzy search
 *
 * 'off'        - no fuzzy search, only matches if item contains/starts with query/contains query words
 * 'smart'      - (default) matches letters in order, but poor quality matches are ignored
 * 'aggressive' - matches letters in order with no restrictions (classic fuzzy search)
 */
export type FuzzySearchStrategy = "off" | "smart" | "aggressive";

export type FuzzySearchOptions<T> = {
	key?: keyof T;
	getText?: (item: T) => Array<string | null>;
	strategy?: FuzzySearchStrategy;
};

export type FuzzySearcher<T> = (query: string) => Array<FuzzyResult<T>>;
