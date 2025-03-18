/**
 * Generates a random boolean value.
 *
 * @returns {boolean} A random boolean value, either `true` or `false`.
 */
export const getRandomBoolean = (): boolean => Math.random() < 0.5;

/**
 * Generates an array of random boolean values.
 *
 * @param length - The length of the array to generate.
 * @returns An array of random boolean values.
 */
export const getRandomBooleanArray = (length: number): boolean[] =>
	Array.from({ length }, () => getRandomBoolean());
