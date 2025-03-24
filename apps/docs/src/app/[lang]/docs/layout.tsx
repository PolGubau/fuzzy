import type { ReactNode } from "react";
import { baseOptions } from "@/app/[lang]/layout.config";
import { source } from "@/lib/source";
import { DocsLayout, type DocsLayoutProps } from "fumadocs-ui/layouts/notebook";
import { GithubInfo } from "fumadocs-ui/components/github-info";

const docsOptions: DocsLayoutProps = {
	...baseOptions,
	tree: source.pageTree,
	githubUrl: "https://github.com/PolGubau/fuzzy",
	sidebar: {
		tabs: [
			{
				title: "Fuzzy",
				description: "Fuzzy Documentation",
				icon: <span className="text-2xl">📚</span>,
				url: "/docs",
			},
		],
	},
	links: [
		{
			type: "custom",
			children: (
				<GithubInfo owner="PolGubau" repo="fuzzy" className="lg:-mx-2" />
			),
		},
	],
};
export default function Layout({ children }: { children: ReactNode }) {
	return <DocsLayout {...docsOptions}>{children}</DocsLayout>;
}
