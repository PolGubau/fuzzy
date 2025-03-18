import { afterEach, describe, expect, it } from "vitest";
import { getBrowserInfo } from "./getBrowserInfo";

describe("getBrowserInfo", () => {
	const originalUserAgent = navigator.userAgent;

	afterEach(() => {
		Object.defineProperty(navigator, "userAgent", {
			value: originalUserAgent,
			configurable: true,
		});
	});

	it("should detect Chrome browser", () => {
		Object.defineProperty(navigator, "userAgent", {
			value:
				"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
			configurable: true,
		});

		const browserInfo = getBrowserInfo();
		expect(browserInfo.name).toBe("Chrome");
		expect(browserInfo.version).toBe("91.0.4472.124");
		expect(browserInfo.userAgent).toContain("Chrome/91.0.4472.124");
	});

	it("should detect Firefox browser", () => {
		Object.defineProperty(navigator, "userAgent", {
			value:
				"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0",
			configurable: true,
		});

		const browserInfo = getBrowserInfo();
		expect(browserInfo.name).toBe("Firefox");
		expect(browserInfo.version).toBe("89.0");
		expect(browserInfo.userAgent).toContain("Firefox/89.0");
	});

	it("should detect Safari browser", () => {
		Object.defineProperty(navigator, "userAgent", {
			value:
				"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15",
			configurable: true,
		});

		const browserInfo = getBrowserInfo();
		expect(browserInfo.name).toBe("Safari");
		expect(browserInfo.version).toBe("605.1.15");
		expect(browserInfo.userAgent).toContain("Safari/605.1.15");
	});

	it("should detect Internet Explorer browser", () => {
		Object.defineProperty(navigator, "userAgent", {
			value: "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)",
			configurable: true,
		});

		const browserInfo = getBrowserInfo();
		expect(browserInfo.name).toBe("Internet Explorer");
		expect(browserInfo.version).toBe("10.0");
		expect(browserInfo.userAgent).toContain("MSIE 10.0");
	});

	 

	it("should return Unknown for unrecognized browser", () => {
		Object.defineProperty(navigator, "userAgent", {
			value:
				"Mozilla/5.0 (compatible; UnknownBrowser/1.0; Windows NT 10.0; Win64; x64)",
			configurable: true,
		});

		const browserInfo = getBrowserInfo();
		expect(browserInfo.name).toBe("Unknown");
		expect(browserInfo.version).toBe("Unknown");
		expect(browserInfo.userAgent).toContain("UnknownBrowser/1.0");
	});
});
