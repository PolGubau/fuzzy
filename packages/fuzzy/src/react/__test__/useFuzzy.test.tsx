import { renderHook, waitFor } from "@testing-library/react";
import { useFuzzy } from "../useFuzzy";
import { describe, it, expect } from "vitest";

describe("useFuzzy", () => {
	const mockList = [
		{ id: 1, name: "apple" },
		{ id: 2, name: "banana" },
		{ id: 3, name: "grape" },
		{ id: 4, name: "orange" },
	];

	it("returns the full list when query is empty", () => {
		const { result } = renderHook(() =>
			useFuzzy({
				list: mockList,
				query: "",
				getKey: (item) => [item.name],
			}),
		);

		expect(result.current).toHaveLength(mockList.length);
		expect(result.current.map((res) => res.item)).toEqual(mockList);
	});

	it("returns filtered results based on the query", async () => {
		const { result } = renderHook(() =>
			useFuzzy({
				list: mockList,
				query: "ap",
				getKey: (item) => [item.name],
			}),
		);
		await waitFor(() => {
			expect(result.current).toHaveLength(2);
			expect(result.current.map((res) => res.item.name)).toEqual([
				"apple",
				"grape",
			]);
		});
	});

	it("applies the mapResultItem function to the results", () => {
		const { result } = renderHook(() =>
			useFuzzy({
				list: mockList,
				query: "ap",
				getKey: (item) => [item.name],
				mapResultItem: (item) => ({
					...item,
					// Add a custom property to the result item
					matched: true,
				}),
			}),
		);

		expect(result.current).toHaveLength(2);
		expect(result.current[0].item.matched).toBe(true);
		expect(result.current[1].item.matched).toBe(true);
	});

	it("returns an empty array when no matches are found", () => {
		const { result } = renderHook(() =>
			useFuzzy({
				list: mockList,
				query: "xyz",
				getKey: (item) => [item.name],
			}),
		);

		expect(result.current).toHaveLength(0);
	});

	it("respects the limit option", () => {
		const { result } = renderHook(() =>
			useFuzzy({
				list: mockList,
				query: "a",
				getKey: (item) => [item.name],
				limit: 1,
			}),
		);

		expect(result.current).toHaveLength(1);
	});
});
