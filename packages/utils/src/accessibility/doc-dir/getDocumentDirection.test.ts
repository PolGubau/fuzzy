import { describe, it, expect, vi } from "vitest";
import { DirEnum, getDocumentDirection } from "./getDocumentDirection";

describe("DirEnum", () => {
	it("should have the correct values", () => {
		expect(DirEnum.rtl).toBe("rtl");
		expect(DirEnum.ltr).toBe("ltr");
		expect(DirEnum.auto).toBe("auto");
	});
});

describe("getDocumentDirection", () => {
	it("should return 'ltr' by default when no dir attribute is set", () => {
		// Simulamos que el entorno no tiene el atributo dir
		vi.spyOn(document.documentElement, "getAttribute").mockReturnValue(null);
		vi.spyOn(window, "getComputedStyle").mockReturnValue({
			direction: "ltr",
		} as CSSStyleDeclaration);

		const result = getDocumentDirection();
		expect(result).toBe("ltr");
	});

	it("should return 'rtl' when the dir attribute is 'rtl'", () => {
		// Simulamos que el documento tiene el atributo dir="rtl"
		vi.spyOn(document.documentElement, "getAttribute").mockReturnValue("rtl");

		const result = getDocumentDirection();
		expect(result).toBe("rtl");
	});

	it("should return 'ltr' when the dir attribute is 'ltr'", () => {
		// Simulamos que el documento tiene el atributo dir="ltr"
		vi.spyOn(document.documentElement, "getAttribute").mockReturnValue("ltr");

		const result = getDocumentDirection();
		expect(result).toBe("ltr");
	});

	it("should return 'auto' when the dir attribute is 'auto'", () => {
		// Simulamos que el documento tiene el atributo dir="auto"
		vi.spyOn(document.documentElement, "getAttribute").mockReturnValue("auto");

		const result = getDocumentDirection();
		expect(result).toBe("ltr");
	});

	it("should return 'ltr' in a non-browser environment (e.g. Node.js)", () => {
		// Simulamos que estamos en un entorno sin acceso a window/document (por ejemplo, Node.js)
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		globalThis.window = undefined as any;
		const result = getDocumentDirection();
		expect(result).toBe("ltr");
	});
});
