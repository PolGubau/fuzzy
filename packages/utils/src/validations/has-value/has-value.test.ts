import { describe, it, expect } from "vitest";
import { hasValue } from "./has-value";

describe("hasValue", () => {
	it("should return true for truthy values", () => {
		expect(hasValue(true)).toBe(true);
		expect(hasValue(1)).toBe(true);
		expect(hasValue("non-empty string")).toBe(true);
		expect(hasValue([])).toBe(true);
		expect(hasValue({})).toBe(true);
	});

	it("should return false for falsy values", () => {
		expect(hasValue(false)).toBe(false);
		expect(hasValue(0)).toBe(false);
		expect(hasValue("")).toBe(false);
		expect(hasValue(null)).toBe(false);
		expect(hasValue(undefined)).toBe(false);
		expect(hasValue(Number.NaN)).toBe(false);
	});
});
