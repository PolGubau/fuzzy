import { describe, expect, it } from "vitest";

import { merge } from "./merge";

describe("merge", () => {
	it("should merge properties from source object into target object", () => {
		const target = { a: 1, b: 2 };
		const source = { b: 3, c: 4 };
		const result = merge(target, source);

		expect(result).toEqual({ a: 1, b: 3, c: 4 });
	});
	it("should merge two objects when both are non-null objects", () => {
		const target = { a: 1, b: { x: 1 } };
		const source = { b: { y: 2 }, c: 3 };

		const result = merge(target, source);

		expect(result).toEqual({
			a: 1,
			b: { x: 1, y: 2 }, // merged `b`
			c: 3,
		});
	});

	it("should create an empty object if target value is undefined", () => {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const target: any = { a: 1 };
		const source = { b: { x: 1 } };

		const result = merge(target, source);

		expect(result).toEqual({
			a: 1,
			b: { x: 1 },
		});
	});

	it("should merge objects even if target has an empty object", () => {
		const target = { a: 1, b: {} };
		const source = { b: { x: 1 }, c: 3 };

		const result = merge(target, source);

		expect(result).toEqual({
			a: 1,
			b: { x: 1 }, // merged `b`
			c: 3,
		});
	});

	it("should keep the target properties when source has no corresponding property", () => {
		const target = { a: 1, b: { x: 1 } };
		const source = { c: 3 };

		const result = merge(target, source);

		expect(result).toEqual({
			a: 1,
			b: { x: 1 },
			c: 3,
		});
	});

	it("should merge deeply nested objects", () => {
		const target = { a: { b: { c: 1 } } };
		const source = { a: { b: { d: 2 } } };

		const result = merge(target, source);

		expect(result).toEqual({
			a: { b: { c: 1, d: 2 } },
		});
	});

	it("should handle objects with different nested structures", () => {
		const target = { a: { b: { c: 1 } } };
		const source = { a: { b: { d: 2 }, e: 3 } };

		const result = merge(target, source);

		expect(result).toEqual({
			a: { b: { c: 1, d: 2 }, e: 3 },
		});
	});

	it("should overwrite target properties when source has the same property", () => {
		const target = { a: 1, b: 2 };
		const source = { b: 3, c: 4 };

		const result = merge(target, source);

		expect(result).toEqual({
			a: 1,
			b: 3, // source value overwrites target
			c: 4,
		});
	});

	it("should handle deeply nested objects with undefined values", () => {
		const target = { a: { b: { c: undefined } } };
		const source = { a: { b: { c: 1 } } };

		const result = merge(target, source);

		expect(result).toEqual({
			a: { b: { c: 1 } },
		});
	});
	it("should deeply merge nested objects", () => {
		const target = { a: { x: 1, y: 2 }, b: 2 };
		const source = { a: { y: 3, z: 4 }, c: 5 };
		const result = merge(target, source);

		expect(result).toEqual({ a: { x: 1, y: 3, z: 4 }, b: 2, c: 5 });

		const names = {
			characters: [{ name: "barney" }, { name: "fred" }],
		};

		const ages = {
			characters: [{ age: 36 }, { age: 40 }],
		};

		const heights = {
			characters: [{ height: "5'4\"" }, { height: "5'5\"" }],
		};

		const expected = {
			characters: [
				{ name: "barney", age: 36, height: "5'4\"" },
				{ name: "fred", age: 40, height: "5'5\"" },
			],
		};

		expect(merge(merge(names, ages), heights)).toEqual(expected);

		const target2 = { a: [1, 2], b: { x: 1 } };
		const source2 = { a: [3], b: { y: 2 } };
		expect(merge(target2, source2)).toEqual({ a: [3, 2], b: { x: 1, y: 2 } });
	});

	it("should merge arrays deeply", () => {
		const target = { a: [1, 2] };
		const source = { a: [3, 4] };
		const result = merge(target, source);

		expect(result).toEqual({ a: [3, 4] });
	});

	it("should handle merging with null values", () => {
		const target = { a: null };
		const source = { a: [1, 2, 3] };
		const result = merge(target, source);

		expect(result).toEqual({ a: [1, 2, 3] });
	});

	it("should not overwrite existing values with undefined from source", () => {
		const target = { a: 1, b: 2 };
		const source = { b: undefined, c: 3 };
		const result = merge(target, source);

		expect(result).toEqual({ a: 1, b: 2, c: 3 });
	});

	it("should handle merging of deeply nested objects with arrays and objects", () => {
		const target = { a: { b: { c: [1] } } };
		const source = { a: { b: { c: [2], d: 3 }, e: [4] } };
		const result = merge(target, source);

		expect(result).toEqual({ a: { b: { c: [2], d: 3 }, e: [4] } });
	});
});
