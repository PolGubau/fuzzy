import type { Locale } from "@/types/base";
import { locales } from "@/constants/locales";
import { baseTranslations } from "@/dictionary/base-translations";
import { I18nProvider } from "fumadocs-ui/i18n";
import { RootProvider } from "fumadocs-ui/provider";
import { Inter } from "next/font/google";
import type { LocaleItem } from "node_modules/fumadocs-ui/dist/contexts/i18n";
import "./global.css";
import type { SearchLink } from "fumadocs-ui/components/dialog/search";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Fuzzy - Optimized and easy fuzzy finder library - Pol Gubau Amores",
	description:
		"A comprehensive library for fuzzy searching and matching, designed for performance and ease of use.",
	keywords: [
		"fuzzy",
		"fuzzy search",
		"fuzzy matching",
		"fuzzy finder",
		"fuzzy library",
		"javascript",
		"typescript",
	],
	authors: [{ name: "Pol Gubau Amores", url: "https://polgubau.com" }],
	openGraph: {
		title: "Fuzzy - Optimized and easy fuzzy finder library - Pol Gubau Amores",
		description:
			"A comprehensive library for fuzzy searching and matching, designed for performance and ease of use.",
		url: "https://polgubau.com/fuzzy",
	},
	twitter: {
		site: "@polgubau",
	},
};
const inter = Inter({
	subsets: ["latin"],
});
type InterestingLinks = "Home" | "Docs" | "Examples";
const allLinksTranslations: [InterestingLinks, Record<Locale, string>][] = [
	["Home", { es: "Inicio", en: "Home", cn: "Inici", de: "Startseite" }],
	[
		"Docs",
		{
			es: "Documentación",
			en: "Docs",
			cn: "Documentació",
			de: "Dokumentation",
		},
	],
	[
		"Examples",
		{ es: "Ejemplos", en: "Examples", cn: "Exemples", de: "Beispiele" },
	],
];
const getLinksByLang = (locale: Locale): SearchLink[] => {
	return allLinksTranslations.map(([name, translations]) => [
		name,
		translations[locale],
	]);
};
export default async function RootLayout({
	params,
	children,
}: {
	params: Promise<{ lang: Locale }>;
	children: React.ReactNode;
}) {
	const lang = (await params).lang;

	return (
		<html lang={lang} className={inter.className} suppressHydrationWarning>
			<body className="flex flex-col min-h-screen">
				<I18nProvider
					locale={lang}
					locales={locales as unknown as LocaleItem[]}
					translations={baseTranslations[lang]}
				>
					<RootProvider
						search={{
							options: {
								allowClear: true,
							},
							links: getLinksByLang(lang),
						}}
					>
						{children}
					</RootProvider>
				</I18nProvider>
			</body>
		</html>
	);
}
