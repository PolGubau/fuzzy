import { describe, it, expect } from "vitest";
import { addDays } from "./addDays";

describe("addDays", () => {
	it("should add days to the given date", () => {
		const initialDate = new Date("2023-01-01");
		const result = addDays(initialDate, 5);
		expect(result).toEqual(new Date("2023-01-06"));
	});

	it("should handle negative days", () => {
		const initialDate = new Date("2023-01-10");
		const result = addDays(initialDate, -5);
		expect(result).toEqual(new Date("2023-01-05"));
	});

	it("should handle adding zero days", () => {
		const initialDate = new Date("2023-01-01");
		const result = addDays(initialDate, 0);
		expect(result).toEqual(new Date("2023-01-01"));
	});

	it("should handle month overflow", () => {
		const initialDate = new Date("2023-01-28");
		const result = addDays(initialDate, 5);
		expect(result).toEqual(new Date("2023-02-02"));
	});

	it("should handle year overflow", () => {
		const initialDate = new Date("2023-12-28");
		const result = addDays(initialDate, 5);
		expect(result).toEqual(new Date("2024-01-02"));
	});
});
