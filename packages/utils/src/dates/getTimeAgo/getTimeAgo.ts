const DATE_UNITS = {
	day: 86400,
	hour: 3600,
	minute: 60,
	second: 1,
};

export const getSecondsDiff = (timestamp: number) => (Date.now() - timestamp) / 1000;

export const getUnitAndValueDate = (
	secondsElapsed: number,
): { value: number; unit: Intl.RelativeTimeFormatUnit } => {
	const absSecondsElapsed = Math.abs(secondsElapsed);

	if (absSecondsElapsed >= DATE_UNITS.day) {
		return {
			value: Math.round(secondsElapsed / DATE_UNITS.day),
			unit: "day",
		};
	}

	for (const [unit, secondsInUnit] of Object.entries(DATE_UNITS)) {
		if (absSecondsElapsed >= secondsInUnit) {
			return {
				value: Math.round(secondsElapsed / secondsInUnit),
				unit: unit as Intl.RelativeTimeFormatUnit,
			};
		}
	}

	return { value: 0, unit: "second" };
};

type GetTimeAgoOptions = {
	locale?: Intl.LocalesArgument;
};

export const getTimeAgo = (
	timestamp: number,
	options: GetTimeAgoOptions = {
		locale: undefined,
	},
): string => {
	const { locale } = options;
	const rtf = new Intl.RelativeTimeFormat(locale, {
		numeric: "always",
	});
	const secondsElapsed = getSecondsDiff(timestamp) * -1;
	const { value, unit } = getUnitAndValueDate(secondsElapsed);
	return rtf.format(value, unit);
};
