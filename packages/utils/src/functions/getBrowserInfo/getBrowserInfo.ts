/**
 * Retrieves information about the browser being used.
 *
 * @returns An object containing the browser name, version, and user agent string.
 *
 * @example
 * ```typescript
 * const browserInfo = getBrowserInfo();
 * console.log(browserInfo.name); // e.g., "Chrome"
 * console.log(browserInfo.version); // e.g., "91.0.4472.124"
 * console.log(browserInfo.userAgent); // e.g., "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
 * ```
 */
export function getBrowserInfo(): {
	name: string;
	version: string;
	userAgent: string;
} {
	const userAgent = navigator.userAgent;

	// Detectar navegador y versión con expresiones regulares
	const browserData = {
		name: "Unknown",
		version: "Unknown",
	};

	const browsers = [
		{ name: "Chrome", regex: /Chrome\/([0-9.]+)/ },
		{ name: "Firefox", regex: /Firefox\/([0-9.]+)/ },
		{ name: "Safari", regex: /Safari\/([0-9.]+)/ },
		{ name: "Edge", regex: /Edg\/([0-9.]+)/ },
		{ name: "Internet Explorer", regex: /MSIE ([0-9.]+)/ },
		{ name: "Opera", regex: /Opera\/([0-9.]+)/ },
	];

	for (const browser of browsers) {
		const match = userAgent.match(browser.regex);
		if (match) {
			browserData.name = browser.name;
			browserData.version = match[1];
			break;
		}
	}

	return {
		...browserData,
		userAgent,
	};
}
