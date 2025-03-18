import { describe, expect, it, vi } from "vitest";
import { sleep } from "./sleep";

describe("sleep", () => {
	it("should pause execution for the specified duration in milliseconds", async () => {
		// Usamos los temporizadores falsos para controlar el tiempo de ejecución
		vi.useFakeTimers();

		const start = Date.now();
		const sleepPromise = sleep(1000); // Pausar durante 1000 ms (1 segundo)

		// Avanzamos el tiempo y verificamos que se haya pasado al menos 1000 ms
		vi.advanceTimersByTime(1000);

		await sleepPromise; // Aseguramos que la promesa se resuelve después de avanzar el tiempo

		const end = Date.now();
		expect(end - start).toBeGreaterThanOrEqual(1000);

		vi.useRealTimers(); // Restauramos los temporizadores reales después del test
	});

	it("should correctly handle sleep with string input (e.g., '2000ms')", async () => {
		// Usamos los temporizadores falsos
		vi.useFakeTimers();

		const start = Date.now();
		const sleepPromise = sleep("2000ms"); // Pausar durante 2000 ms (2 segundos)

		vi.advanceTimersByTime(2000); // Avanzamos el tiempo

		await sleepPromise; // Aseguramos que la promesa se resuelve después de avanzar el tiempo

		const end = Date.now();
		expect(end - start).toBeGreaterThanOrEqual(2000);

		vi.useRealTimers(); // Restauramos los temporizadores reales después del test
	});
});
