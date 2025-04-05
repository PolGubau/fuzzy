import type { ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import { source } from "@/lib/source";
import { DocsLayout, type DocsLayoutProps } from "fumadocs-ui/layouts/notebook";
import { GithubInfo } from "fumadocs-ui/components/github-info";
import type { Locale } from "@/types/base";
import { i18n } from "@/lib/i18n";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title:
		"Docs - Fuzzy - Optimized and easy fuzzy finder library - Pol Gubau Amores",
};
type Text = "MadeBy" | "Proudly" | "version";
const allLinksTranslations: Record<Text, Record<Locale, string>> = {
	MadeBy: {
		en: "Made by",
		es: "Hecho por",
		cn: "Fet per",
		de: "Gemacht von",
	},
	Proudly: {
		en: "Proudly",
		es: "Totalmente",
		cn: "Totalment",
		de: "Stolz",
	},
	version: {
		en: "Version",
		es: "Versión",
		cn: "Versió",
		de: "Version",
	},
};
const getText = (key: Text, locale: Locale) => {
	return allLinksTranslations[key][locale];
};

const docsOptions = (lang: Locale): DocsLayoutProps => {
	return {
		...baseOptions(lang),
		tree: source.pageTree[lang],
		githubUrl: "https://github.com/PolGubau/fuzzy",
		sidebar: {
			footer: (
				<div className="flex flex-col gap-2 text-sm">
					<p>
						{getText("MadeBy", lang)}{" "}
						<Link
							className="underline underline-offset-2 decoration-primary"
							href="https://polgubau.com"
							target="_blank"
							rel="noreferrer"
						>
							Pol Gubau Amores
						</Link>
					</p>
					<p className="opacity-70">
						{getText("Proudly", lang)}{" "}
						<Link
							className="underline underline-offset-2"
							href="https://github.com/PolGubau/fuzzy"
							target="_blank"
							rel="noreferrer"
						>
							Open Source
						</Link>
					</p>
				</div>
			),
		},
		i18n,
		links: [
			{
				type: "custom",
				children: (
					<GithubInfo owner="PolGubau" repo="fuzzy" className="lg:-mx-2" />
				),
			},
			{
				type: "menu",
				text: getText("version", lang),
				items: [{ text: "Latest", url: "/docs/" }],
			},
		],
	};
};
export default async function Layout({
	params,
	children,
}: {
	params: Promise<{ lang: Locale }>;
	children: ReactNode;
}) {
	const { lang } = await params;
	return <DocsLayout {...docsOptions(lang)}>{children}</DocsLayout>;
}
