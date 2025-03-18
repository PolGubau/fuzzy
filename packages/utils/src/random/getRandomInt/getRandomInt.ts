/**
 * Generates a random integer between the specified minimum and maximum values, inclusive.
 *
 * @param min - The minimum value of the random integer.
 * @param max - The maximum value of the random integer.
 * @returns A random integer between `min` and `max`, inclusive.
 */
export const getRandomInt = (min: number, max: number): number =>
	Math.floor(Math.random() * (max - min + 1)) + min;
