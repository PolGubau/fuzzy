import { describe, it, expect } from "vitest";
import { getRandomHexColor } from "./getRandomHexColor";

describe("getRandomHexColor", () => {
	it("should return a string", () => {
		const color = getRandomHexColor();
		expect(typeof color).toBe("string");
	});

	it("should return a valid hex color code", () => {
		const color = getRandomHexColor();
		const hexColorPattern = /^#[0-9A-Fa-f]{6}$/;
		expect(color).toMatch(hexColorPattern);
	});

	it("should return different colors on subsequent calls", () => {
		const color1 = getRandomHexColor();
		const color2 = getRandomHexColor();
		expect(color1).not.toBe(color2);
	});
});
