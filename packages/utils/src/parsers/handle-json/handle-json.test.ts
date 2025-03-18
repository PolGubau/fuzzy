import { describe, expect, it, vi } from "vitest";
import { parseJSON, saveParseJson } from "./handle-json";

describe("parseJSON", () => {
	it("should parse valid JSON string", () => {
		const json = '{"name": "Pol"}';
		const result = parseJSON<{ name: string }>(json);
		expect(result).toEqual({ name: "Pol" });
	});

	it("should return undefined for null value", () => {
		const result = parseJSON(null);
		expect(result).toBeUndefined();
	});

	it("should throw an error for invalid JSON string", () => {
		const invalidJson = "{name: Pol}";
		expect(() => parseJSON(invalidJson)).toThrowError(
			"parsing error on value: {name: Pol}",
		);
	});

	it("should throw an error with proper message when parsing fails", () => {
		const invalidJson = "{name: Pol}";
		const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
		try {
			parseJSON(invalidJson);
		} catch (e) {
			expect(consoleSpy).toHaveBeenCalledWith("parsing error on value: ", {
				value: "{name: Pol}",
			});
		}
		consoleSpy.mockRestore();
	});
});

describe("saveParseJson", () => {
	it("should parse valid JSON string and return the object", () => {
		const json = '{"age": 25}';
		const result = saveParseJson<{ age: number }>(json);
		expect(result).toEqual({ age: 25 });
	});

	it("should return undefined for null value", () => {
		const result = saveParseJson(null);
		expect(result).toBeUndefined();
	});

	it("should return undefined for invalid JSON string", () => {
		const invalidJson = "{age: 25}";
		const result = saveParseJson(invalidJson);
		expect(result).toBeUndefined();
	});

	it("should log error to console on invalid JSON", () => {
		const invalidJson = "{age: 25}";
		const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
		const result = saveParseJson(invalidJson);
		expect(result).toBeUndefined();
		expect(consoleSpy).toHaveBeenCalledWith("parsing error on value: ", {
			value: "{age: 25}",
		});
		consoleSpy.mockRestore();
	});
});
