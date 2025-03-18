import { describe, it, expect, vi, beforeAll, afterAll } from "vitest";
import { getSecondsDiff, getUnitAndValueDate, getTimeAgo } from "./getTimeAgo";

describe("Utility Functions", () => {
	// Utilizamos fake timers para controlar Date.now()
	beforeAll(() => {
		const now = 1678917600000; // Un timestamp fijo (por ejemplo, 2023-03-17T00:00:00Z)
		vi.useFakeTimers().setSystemTime(now);
	});

	afterAll(() => {
		vi.useRealTimers(); // Restauramos los timers reales después de las pruebas
	});

	describe("getSecondsDiff", () => {
		it("should return the correct seconds difference", () => {
			const timestamp = Date.now() - 10000; // 10 seconds ago
			const diff = getSecondsDiff(timestamp);
			expect(Math.round(diff)).toBe(10);
		});
	});

	describe("getUnitAndValueDate", () => {
		it("should return correct unit and value for days", () => {
			const secondsElapsed = 86400 * 2; // 2 days
			const result = getUnitAndValueDate(secondsElapsed);
			expect(result).toEqual({ value: 2, unit: "day" });
		});

		it("should return correct unit and value for hours", () => {
			const secondsElapsed = 3600 * 5; // 5 hours
			const result = getUnitAndValueDate(secondsElapsed);
			expect(result).toEqual({ value: 5, unit: "hour" });
		});

		it("should return correct unit and value for minutes", () => {
			const secondsElapsed = 60 * 30; // 30 minutes
			const result = getUnitAndValueDate(secondsElapsed);
			expect(result).toEqual({ value: 30, unit: "minute" });
		});

		it("should return correct unit and value for seconds", () => {
			const secondsElapsed = 45; // 45 seconds
			const result = getUnitAndValueDate(secondsElapsed);
			expect(result).toEqual({ value: 45, unit: "second" });
		});
		it("should return 0 seconds when time elapsed is less than a second", () => {
			// Dado que 1 segundo es menor que 1 minuto, este caso debería devolver { value: 0, unit: 'second' }
			const result = getUnitAndValueDate(0.5); // Menos de un segundo
			expect(result).toEqual({ value: 0, unit: "second" });
		});
	});

	describe("getTimeAgo", () => {
		it("should return the correct time ago format", () => {
			const timestamp = Date.now() - 86400 * 1000 * 2; // 2 days ago
			const timeAgo = getTimeAgo(timestamp, { locale: "en-US" });
			expect(timeAgo).toBe("2 days ago");
		});
		it("should return the correct time ago format in Spanish", () => {
			const timestamp = Date.now() - 86400 * 1000 * 2; // 2 days ago
			const timeAgo = getTimeAgo(timestamp, { locale: "es-ES" });
			expect(timeAgo).toBe("hace 2 días");
		});
	});
});
