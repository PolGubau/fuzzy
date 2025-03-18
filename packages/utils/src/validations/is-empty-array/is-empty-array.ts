/**
 * Checks if the provided array is empty.
 *
 * @param arr - The array to check.
 * @returns `true` if the array is empty, otherwise `false`.
 */
export function isEmptyArray(arr: unknown[]): boolean {
	return Array.isArray(arr) && arr.length === 0;
}
