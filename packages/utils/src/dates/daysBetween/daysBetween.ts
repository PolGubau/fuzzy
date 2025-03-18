/**
 * Calculates the number of days between two dates.
 *
 * @param date1 - The first date.
 * @param date2 - The second date.
 * @returns The number of days between the two dates.
 */
export function daysBetween(date1: Date, date2: Date): number {
	const timeDiff = Math.abs(date2.getTime() - date1.getTime());
	return Math.floor(timeDiff / (1000 * 3600 * 24)); // ms -> days
}
