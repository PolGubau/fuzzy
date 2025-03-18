/**
 * Converts a given text into a URL-friendly slug.
 *
 * This function normalizes the input text by removing diacritical marks,
 * replacing non-alphanumeric characters with a specified separator,
 * and optionally converting the text to lowercase.
 *
 * @param text - The input string to be slugified.
 * @param options - An optional object to customize the slugification process.
 * @param options.separator - The character to use as a separator between words. Defaults to "-".
 * @param options.lowercase - A boolean indicating whether to convert the text to lowercase. Defaults to true.
 * @returns The slugified version of the input text.
 */
export function slugify(
	text: string,
	options: { separator?: string; lowercase?: boolean } = {},
): string {
	const { separator = "-", lowercase = true } = options;

	return (
		text
			.normalize("NFD") // Descompone caracteres con tildes
			// biome-ignore lint/suspicious/noMisleadingCharacterClass: <explanation>
			.replace(/[̀-ͯ]/g, "") // Elimina los diacríticos
			.replace(/[^a-zA-Z0-9]+/g, separator) // Reemplaza caracteres no alfanuméricos
			.replace(new RegExp(`^${separator}|${separator}$`, "g"), "") // Quita separadores al inicio y final
			.replace(new RegExp(`${separator}{2,}`, "g"), separator) // Evita separadores duplicados
			.trim()
			[lowercase ? "toLowerCase" : "toString"]()
	);
}
