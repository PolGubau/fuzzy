import { describe, it, expect } from "vitest";
import { slugify } from "./slugify";

describe("slugify", () => {
	it("should convert text to a URL-friendly slug", () => {
		expect(slugify("Hello World")).toBe("hello-world");
	});

	it("should remove diacritical marks", () => {
		expect(slugify("Café")).toBe("cafe");
	});

	it("should replace non-alphanumeric characters with the specified separator", () => {
		expect(slugify("Hello, World!", { separator: "_" })).toBe("hello_world");
	});

	it("should convert text to lowercase by default", () => {
		expect(slugify("Hello World")).toBe("hello-world");
	});

	it("should not convert text to lowercase if lowercase option is false", () => {
		expect(slugify("Hello World", { lowercase: false })).toBe("Hello-World");
	});

	it("should trim leading and trailing separators", () => {
		expect(slugify("-Hello World-")).toBe("hello-world");
	});

	it("should avoid duplicate separators", () => {
		expect(slugify("Hello    World")).toBe("hello-world");
	});

	it("should handle empty strings", () => {
		expect(slugify("")).toBe("");
	});

	it("should handle strings with only non-alphanumeric characters", () => {
		expect(slugify("!@#$%^&*()")).toBe("");
	});
});
