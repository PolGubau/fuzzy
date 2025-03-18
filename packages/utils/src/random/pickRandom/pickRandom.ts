/**
 * Selects a specified number of random elements from an array.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} array - The array to pick random elements from.
 * @param {number} [count=1] - The number of random elements to pick. Defaults to 1.
 * @returns {T[]} An array containing the randomly picked elements. If the input array is empty, 
 *                or the count is less than or equal to 0, an empty array is returned.
 */
export function pickRandom<T>(array: T[], count = 1): T[] {
	if (!Array.isArray(array) || array.length === 0 || count <= 0) {
		return [];
	}

	const result: T[] = [];
	const availableItems = [...array]; // Crea una copia del array para evitar modificar el original

	for (let i = 0; i < count && availableItems.length > 0; i++) {
		const randomIndex = Math.floor(Math.random() * availableItems.length);
		result.push(availableItems.splice(randomIndex, 1)[0]); // Elimina el ítem del array para no repetirlo
	}

	return result;
}
