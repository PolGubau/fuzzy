import { describe, it, expect } from "vitest";
import { pickRandom } from "./pickRandom";

describe("pickRandom", () => {
	it("should return an empty array if the input array is empty", () => {
		expect(pickRandom([])).toEqual([]);
	});

	it("should return an empty array if count is less than or equal to 0", () => {
		expect(pickRandom([1, 2, 3], 0)).toEqual([]);
		expect(pickRandom([1, 2, 3], -1)).toEqual([]);
	});

	it("should return an array with one element if count is 1", () => {
		const array = [1, 2, 3];
		const result = pickRandom(array, 1);
		expect(result.length).toBe(1);
		expect(array).toContain(result[0]);
	});

	it("should return an array with the specified number of random elements", () => {
		const array = [1, 2, 3, 4, 5];
		const count = 3;
		const result = pickRandom(array, count);
		expect(result.length).toBe(count);
		for (const item of result) {
			expect(array).toContain(item);
		}
	});

	it("should return all elements if count is greater than or equal to array length", () => {
		const array = [1, 2, 3];
		expect(pickRandom(array, 3).sort()).toEqual(array.sort());
		expect(pickRandom(array, 4).sort()).toEqual(array.sort());
	});

	it("should not modify the original array", () => {
		const array = [1, 2, 3];
		const arrayCopy = [...array];
		pickRandom(array, 2);
		expect(array).toEqual(arrayCopy);
	});
});
