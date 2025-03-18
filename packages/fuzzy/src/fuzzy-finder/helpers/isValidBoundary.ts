const validWordBoundaries = new Set("  []()-–—'\"“”".split(""));

export function isValidWordBoundary(character: string): boolean {
	return validWordBoundaries.has(character);
}