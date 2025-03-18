/**
 * Checks if a value is falsy.
 *
 * A falsy value is a value that translates to `false` when evaluated in a Boolean context.
 * In JavaScript, the following values are considered falsy:
 * - `false`
 * - `0`
 * - `-0`
 * - `0n` (BigInt zero)
 * - `""` (empty string)
 * - `null`
 * - `undefined`
 * - `NaN`
 *
 * @param value - The value to check.
 * @returns `true` if the value is falsy, otherwise `false`.
 */
export function isFalsy(value: unknown): boolean {
	return !value;
}
