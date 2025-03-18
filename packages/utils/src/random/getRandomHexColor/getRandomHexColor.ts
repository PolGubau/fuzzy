/**
 * Generates a random hexadecimal color code.
 *
 * @returns {string} A string representing a random hex color code in the format `#RRGGBB`.
 */
export const getRandomHexColor = (): string =>
	`#${Math.floor(Math.random() * 16777215)
		.toString(16)
		.padStart(6, "0")}`;