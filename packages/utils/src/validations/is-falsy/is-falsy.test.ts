import { describe, it, expect } from "vitest";
import { isFalsy } from "./is-falsy";

describe("isFalsy", () => {
	it("should return true for false", () => {
		expect(isFalsy(false)).toBe(true);
	});

	it("should return true for 0", () => {
		expect(isFalsy(0)).toBe(true);
	});

	it("should return true for -0", () => {
		expect(isFalsy(-0)).toBe(true);
	});

	it("should return true for 0n", () => {
		// @ts-ignore
		expect(isFalsy(0n)).toBe(true);
	});

	it("should return true for empty string", () => {
		expect(isFalsy("")).toBe(true);
	});

	it("should return true for null", () => {
		expect(isFalsy(null)).toBe(true);
	});

	it("should return true for undefined", () => {
		expect(isFalsy(undefined)).toBe(true);
	});

	it("should return true for NaN", () => {
		expect(isFalsy(Number.NaN)).toBe(true);
	});

	it("should return false for true", () => {
		expect(isFalsy(true)).toBe(false);
	});

	it("should return false for non-zero numbers", () => {
		expect(isFalsy(1)).toBe(false);
		expect(isFalsy(-1)).toBe(false);
		// @ts-ignore
		expect(isFalsy(1n)).toBe(false);

		// @ts-ignore
		expect(isFalsy(-1n)).toBe(false);
	});

	it("should return false for non-empty strings", () => {
		expect(isFalsy("hello")).toBe(false);
	});

	it("should return false for objects", () => {
		expect(isFalsy({})).toBe(false);
	});

	it("should return false for arrays", () => {
		expect(isFalsy([])).toBe(false);
	});

	it("should return false for functions", () => {
		expect(isFalsy(() => {})).toBe(false);
	});
});
