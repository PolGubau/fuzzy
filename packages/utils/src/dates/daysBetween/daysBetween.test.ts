import { describe, it, expect } from "vitest";
import { daysBetween } from "./daysBetween";

describe("daysBetween", () => {
	it("should return 0 when the dates are the same", () => {
		const date = new Date("2023-01-01");
		expect(daysBetween(date, date)).toBe(0);
	});

	it("should return 1 when the dates are one day apart", () => {
		const date1 = new Date("2023-01-01");
		const date2 = new Date("2023-01-02");
		expect(daysBetween(date1, date2)).toBe(1);
	});

	it("should return the correct number of days between two dates", () => {
		const date1 = new Date("2023-01-01");
		const date2 = new Date("2023-01-10");
		expect(daysBetween(date1, date2)).toBe(9);
	});

	it("should return the correct number of days regardless of the order of dates", () => {
		const date1 = new Date("2023-01-01");
		const date2 = new Date("2023-01-10");
		expect(daysBetween(date2, date1)).toBe(9);
	});

	it("should handle leap years correctly", () => {
		const date1 = new Date("2020-02-28");
		const date2 = new Date("2020-03-01");
		expect(daysBetween(date1, date2)).toBe(2);
	});

	it("should handle different months and years correctly", () => {
		const date1 = new Date("2022-12-31");
		const date2 = new Date("2023-01-01");
		expect(daysBetween(date1, date2)).toBe(1);
	});
});
