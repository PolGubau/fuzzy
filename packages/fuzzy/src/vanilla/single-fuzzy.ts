import { getFuzzyMatchScore } from "./getScore/getScore";
import normalizeText from "./normalizeText";
import type { Result } from "./types";

/**
 * Finds a fuzzy match between a given text and a query string.
 *
 * Runs a one-off fuzzy search matching on `text` against `queryText`.
 *
 * Use `fuzzyMatch` whenever you have a single item to search.
 *
 * This function normalizes both the input text and query, splits them into words,
 * and calculates a fuzzy match score. If a match is found, it returns the result
 * containing the original text, the match score, and the matched segments.
 *
 * @param text - The input text to search for a fuzzy match.
 * @param query - The query string to match against the input text.
 * @returns A `Result<string>` object containing the match details if a match is found,
 *          or `null` if no match is found.
 */
export function singleFuzzy(text: string, query: string): Result<string> | null {
		const normalizedQuery = normalizeText(query);
		const queryWords = normalizedQuery.split(" ");

		const normalizedText = normalizeText(text);
		const itemWords = new Set(normalizedText.split(" "));

		const result = getFuzzyMatchScore(
			text,
			normalizedText,
			itemWords,
			query,
			normalizedQuery,
			queryWords,
		);
		if (result) {
			return { item: text, score: result[0], matches: [result[1]] };
		}
		return null;
	}
