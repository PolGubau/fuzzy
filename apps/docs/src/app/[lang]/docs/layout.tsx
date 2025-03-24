import type { ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import { source } from "@/lib/source";
import { DocsLayout, type DocsLayoutProps } from "fumadocs-ui/layouts/notebook";
import { GithubInfo } from "fumadocs-ui/components/github-info";

const docsOptions = (lang: string): DocsLayoutProps => {
	return {
		...baseOptions(lang),
		tree: source.pageTree[lang],
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
};
export default async function Layout({
	params,
	children,
}: {
	params: Promise<{ lang: string }>;
	children: ReactNode;
}) {
	const { lang } = await params;
	return <DocsLayout {...docsOptions(lang)}>{children}</DocsLayout>;
}
