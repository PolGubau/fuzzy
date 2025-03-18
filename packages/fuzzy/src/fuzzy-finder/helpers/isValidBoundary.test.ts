import { describe, it, expect } from "vitest";
import { isValidWordBoundary } from "./isValidBoundary";

describe("isValidWordBoundary", () => {
	it("should return true for valid word boundary characters", () => {
		const validCharacters = [
			" ",
			" ",
			"[",
			"]",
			"(",
			")",
			"-",
			"–",
			"—",
			"'",
			'"',
			"“",
			"”",
		];
    for (const char of validCharacters) {
			expect(isValidWordBoundary(char)).toBe(true);
		};
	});

	it("should return false for invalid word boundary characters", () => {
		const invalidCharacters = [
			"a",
			"1",
			".",
			",",
			"!",
			"?",
			"@",
			"#",
			"$",
			"%",
			"^",
			"&",
			"*",
			"_",
			"+",
			"=",
			"{",
			"}",
			"|",
			"\\",
			":",
			";",
			"<",
			">",
			"/",
			"`",
			"~",
		];
    for (const char of invalidCharacters) {
			expect(isValidWordBoundary(char)).toBe(false);
		};
	});
});
