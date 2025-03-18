// https://vitest.dev/guide/#configuring-vitest

import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		environment: "jsdom",
		globals: true,
		// setupFiles: "./vitest.setup.ts",
		css: true,
		coverage: {
			provider: "v8",
			thresholds: {
				lines: 0,
				branches: 0,
				functions: 0,
				statements: 0,
			},
			reporter: ["json-summary","text"],
			reportOnFailure: true,
			include: ["**/*.ts"],
			exclude: [
				"dist/",
				"node_modules/",
				"coverage/",
				"**/*.d.ts",
				"**/*.stories.tsx",
				"**/*.spec.ts",
				"**/*.spec.tsx",
				"**/*.test.ts",
				"**/*.test.tsx",
				"**/props.ts",
				"**/props.tsx",
				"**/theme.ts",
				"**/theme.tsx",
				"**/index.ts",
				"**/test/utils.ts",
				"**/test/props.ts",
				"**/test/**",
				"**/*config*.ts",
				"**/*setup*.ts",
				"**/mock-data.*",
				".storybook/",
				"src/models/**",
				"src/design/**",
				"src/types/**",
				"src/stories/**",
				"src/tests/**",
				"src/plugins/**",
			],
		},
	},
});
