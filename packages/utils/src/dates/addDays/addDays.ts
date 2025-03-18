/**
 * Adds a specified number of days to a given date.
 *
 * @param date - The initial date to which days will be added.
 * @param days - The number of days to add to the date.
 * @returns A new `Date` object with the specified number of days added.
 */
export function addDays(date: Date, days: number): Date {
	const newDate = new Date(date);
	newDate.setDate(newDate.getDate() + days);
	return newDate;
}
