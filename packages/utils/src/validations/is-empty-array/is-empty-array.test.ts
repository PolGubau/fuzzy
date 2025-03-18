import { describe, it, expect } from "vitest";
import { isEmptyArray } from "./is-empty-array";

describe("isEmptyArray", () => {
	it("should return true for an empty array", () => {
		expect(isEmptyArray([])).toBe(true);
	});

	it("should return false for a non-empty array", () => {
		expect(isEmptyArray([1, 2, 3])).toBe(false);
	});

	it("should return false for a non-array value", () => {
		expect(isEmptyArray("not an array" as any)).toBe(false);
		expect(isEmptyArray(123 as any)).toBe(false);
		expect(isEmptyArray({} as any)).toBe(false);
		expect(isEmptyArray(null)).toBe(false);
		expect(isEmptyArray(undefined)).toBe(false);
	});
});
