import { describe, it, expect } from "vitest";
import { getRandomInt } from "./getRandomInt";

describe("getRandomInt", () => {
	it("should generate a random integer between the specified minimum and maximum values", () => {
		const min = 1;
		const max = 10;
		const result = getRandomInt(min, max);
		expect(result).toBeGreaterThanOrEqual(min);
		expect(result).toBeLessThanOrEqual(max);
	});

	it("should return the minimum value when min and max are the same", () => {
		const min = 5;
		const max = 5;
		const result = getRandomInt(min, max);
		expect(result).toBe(min);
	});

	it("should handle negative values correctly", () => {
		const min = -10;
		const max = -1;
		const result = getRandomInt(min, max);
		expect(result).toBeGreaterThanOrEqual(min);
		expect(result).toBeLessThanOrEqual(max);
	});

	it("should handle a large range of values", () => {
		const min = 1;
		const max = 1000000;
		const result = getRandomInt(min, max);
		expect(result).toBeGreaterThanOrEqual(min);
		expect(result).toBeLessThanOrEqual(max);
	});
});
