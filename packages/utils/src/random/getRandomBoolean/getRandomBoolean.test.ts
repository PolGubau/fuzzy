import { describe, it, expect } from "vitest";
import { getRandomBoolean, getRandomBooleanArray } from "./getRandomBoolean";

describe("getRandomBoolean", () => {
	it("should return a boolean value", () => {
		const result = getRandomBoolean();
		expect(typeof result).toBe("boolean");
	});

	it("should return true or false", () => {
		const results = new Set();
		for (let i = 0; i < 100; i++) {
			results.add(getRandomBoolean());
		}
		expect(results.has(true)).toBe(true);
		expect(results.has(false)).toBe(true);
	});
});

describe("getRandomBooleanArray", () => {
	it("should return an array of the specified length", () => {
		const length = 10;
		const result = getRandomBooleanArray(length);
		expect(result.length).toBe(length);
	});

	it("should return an array of boolean values", () => {
		const length = 10;
		const result = getRandomBooleanArray(length);
    for (const value of result) {
			expect(typeof value).toBe("boolean");
		}
	});
});
