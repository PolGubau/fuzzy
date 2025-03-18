import { describe, expect, it } from "vitest";
import { uuid } from "./uuid";

const uuidRegex =
	/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
const hexaRegex = /^[0-9a-f-]+$/;
describe("uuid", () => {
	it("should generate a UUID of the correct format without a limit", () => {
		const id = uuid();
		expect(id).toMatch(uuidRegex);
		expect(id.length).toBe(36); // Standard UUID length
	});

	it("should generate a UUID limited to the specified number of characters", () => {
		const limit = 10;
		const id = uuid(limit);
		expect(id.length).toBe(limit);
		expect(id).toMatch(hexaRegex);
	});

	it("should return an empty string if the limit is 0", () => {
		const id = uuid(0);
		expect(id).toBe("");
	});

	it("should return a valid partial UUID if the limit is less than 36", () => {
		const limit = 15;
		const id = uuid(limit);
		expect(id.length).toBe(limit);
		expect(id).toMatch(hexaRegex); // Only hexadecimal characters and dashes
	});

	it("should return a complete UUID if the limit is greater than or equal to 36", () => {
		const limit = 50;
		const id = uuid(limit);
		expect(id.length).toBe(36); // Full UUID length
		expect(id).toMatch(uuidRegex);
	});

	it("should correctly handle edge cases for limits within hyphen positions", () => {
		const limit = 8; // Cuts through the first part of the UUID
		const id = uuid(limit);
		expect(id.length).toBe(limit);
		expect(id).toMatch(hexaRegex);
	});
});
