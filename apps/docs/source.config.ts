import { rehypeCodeDefaultOptions } from "fumadocs-core/mdx-plugins";
import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import { transformerTwoslash } from "fumadocs-twoslash";
import { remarkAutoTypeTable } from 'fumadocs-typescript';
export const docs = defineDocs({
	dir: "content/docs",
});

export default defineConfig({
	mdxOptions: {    remarkPlugins: [remarkAutoTypeTable],

		rehypeCodeOptions: {
			themes: {
				light: "github-light",
				dark: "github-dark",
			},
			transformers: [
				...(rehypeCodeDefaultOptions.transformers ?? []),
				transformerTwoslash(),
			],
		},
	},
});
