import { esbuildPluginFilePathExtensions } from "esbuild-plugin-file-path-extensions";
import { type Options, defineConfig } from "tsup";

// Inspired by https://github.com/immerjs/immer/pull/1032/files
export default defineConfig((options) => {
	const commonOptions: Partial<Options> = {
		entry: [
			"src/**/*.[jt]s?(x)",
			"!./src/**/*.d.ts",
			"!./src/**/*.spec.[jt]s",
			"!./src/**/*.test.[jt]s",
			"!./src/**/__test__/**",
		],
		platform: "node",
		target: "node22",
		// `splitting` should be false, it ensures we are not getting any `chunk-*` files in the output.
		splitting: false,
		// `bundle` should be false, it ensures we are not getting the entire bundle in EVERY file of the output.
		bundle: false,
		// `sourcemap` should be true, we want to be able to point users back to the original source.
		sourcemap: true,
		clean: true,
		...options,
	};
	const productionOptions: Partial<Options> = {
		minify: true,
		define: {
			"process.env.NODE_ENV": JSON.stringify("production"),
		},
	};

	return [
		// ESM, standard bundler dev, embedded `process` references.
		// (this is consumed by ["exports" > "." > "import"] and ["exports > "." > "types"] in package.json)
		{
			...commonOptions,

			format: ["esm"],
			clean: true,
			outDir: "./dist/esm/",
			esbuildPlugins: [esbuildPluginFilePathExtensions({ filter: /^\./ })],
			outExtension: () => ({ js: ".mjs" }),
			// Yes, bundle: true => https://github.com/favware/esbuild-plugin-file-path-extensions?tab=readme-ov-file#usage
			bundle: true,
			dts: {
				compilerOptions: {
					resolveJsonModule: false,
					outDir: "./dist",
				},
			},
		},
		// ESM for use in browsers. Minified, with `process` compiled away
		{
			...commonOptions,
			...productionOptions,
			// `splitting` should be true (revert to the default)
			splitting: true,
			// `bundle` should be true, so we get everything in one file.
			bundle: true,
			entry: {
				"fuzzy.production.min": "src/core/index.ts",
			},
			platform: "browser",
			format: ["esm"],
			outDir: "./dist/browser/",
		},
		// CJS
		{
			...commonOptions,
			clean: true,
			format: ["cjs"],
			outDir: "./dist/",
		},
	];
});
