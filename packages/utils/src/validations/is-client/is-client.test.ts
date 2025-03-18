import { describe, expect, it, vi } from "vitest";
import { isClient } from "./is-client";

describe("isClient", () => {
	it("should return true when running in the client (browser)", () => {
		// Simulamos que estamos en el entorno de cliente (navegador)
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		globalThis.window = {} as any; // Le damos un objeto window (puede ser vacío, no importa)

		expect(isClient()).toBe(true);

		// Limpiar el mock
		globalThis.window = undefined;
	});

	it("should return false when running in a non-client (server-side)", () => {
		// Simulamos que estamos en un entorno sin window (como Node.js o SSR)
		globalThis.window = undefined; // Nos aseguramos de que window no esté definido

		expect(isClient()).toBe(false);
	});
});
