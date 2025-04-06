import { describe, it, expect } from "vitest";
import normalizeText from "../normalizeText";

describe("normalizeText", () => {
	it("should convert text to lowercase", () => {
		expect(normalizeText("Hello World")).toBe("hello world");
	});

	it("should remove diacritics", () => {
		expect(normalizeText("café")).toBe("cafe");
		expect(normalizeText("résumé")).toBe("resume");
	});

	it("should remove extra whitespace", () => {
		expect(normalizeText("  hello world  ")).toBe("hello world");
	});

	it("should replace ł with l", () => {
		expect(normalizeText("łódź")).toBe("lodz");
	});

	it("should replace ñ with n", () => {
		expect(normalizeText("piñata")).toBe("pinata");
	});

	it("should handle combined cases", () => {
		expect(normalizeText("  Héllo Wórld!  ")).toBe("hello world!");
		expect(normalizeText("  łódź piñata  ")).toBe("lodz pinata");
	});
});
