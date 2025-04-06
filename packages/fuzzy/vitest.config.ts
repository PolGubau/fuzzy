// https://vitest.dev/guide/#configuring-vitest

import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		environment: "jsdom",
		setupFiles: ["./vitest-setup.ts"],
		globals: true,
		css: true,
		coverage: {
			provider: "v8",
			thresholds: {
				lines: 0,
				branches: 0,
				functions: 0,
				statements: 0,
			},
			reportsDirectory:"./.coverage",
			reporter: ["json-summary", "text"],
			reportOnFailure: true,
			include: ["**/*.ts", "**/*.tsx"],
			exclude: [
				"dist/",
				"node_modules/",
				"coverage/",
				"**/*.d.ts",
				"**/*.test.ts",
				"**/*.test.tsx",
				"**/index.ts",
			],
		},
	},
});
