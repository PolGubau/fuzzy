import { describe, it, expect, vi, type Mock } from "vitest";
import { singleFuzzy } from "../single-fuzzy";
import normalizeText from "../normalizeText";
import { getFuzzyMatchScore } from "../getScore/getScore";

vi.mock("../normalizeText", () => ({
	default: vi.fn((text: string) => text.toLowerCase()),
}));

vi.mock("../getScore/getScore", () => ({
	getFuzzyMatchScore: vi.fn(),
}));

describe("singleFuzzy", () => {
	it("should return a match result when a match is found", () => {
		const text = "Hello World";
		const query = "hello";
		const normalizedText = "hello world";
		const normalizedQuery = "hello";
		const itemWords = new Set(normalizedText.split(" "));
		const queryWords = normalizedQuery.split(" ");
		const mockScore = [0.9, "hello"];

		(getFuzzyMatchScore as Mock).mockReturnValue(mockScore);

		const result = singleFuzzy(text, query);

		expect(normalizeText).toHaveBeenCalledWith(query);
		expect(normalizeText).toHaveBeenCalledWith(text);
		expect(getFuzzyMatchScore).toHaveBeenCalledWith(
			text,
			normalizedText,
			itemWords,
			query,
			normalizedQuery,
			queryWords,
		);
		expect(result).toEqual({
			item: text,
			score: mockScore[0],
			matches: [mockScore[1]],
		});
	});

	it("should return null when no match is found", () => {
		const text = "Hello World";
		const query = "xyz";

		(getFuzzyMatchScore as Mock).mockReturnValue(null);

		const result = singleFuzzy(text, query);

		expect(result).toBeNull();
	});

	it("should handle empty text and query gracefully", () => {
		const text = "";
		const query = "";

		(getFuzzyMatchScore as Mock).mockReturnValue(null);

		const result = singleFuzzy(text, query);

		expect(result).toBeNull();
	});
});
