import type { Locale } from "@/types/base";
import { locales } from "@/constants/locales";
import { baseTranslations } from "@/dictionary/base-translations";
import { I18nProvider } from "fumadocs-ui/i18n";
import { RootProvider } from "fumadocs-ui/provider";
import { Inter } from "next/font/google";
import type { LocaleItem } from "node_modules/fumadocs-ui/dist/contexts/i18n";
import "./global.css";
import type { SearchLink } from "fumadocs-ui/components/dialog/search";
import type { Metadata, ResolvingMetadata } from "next";
type Props = {
	params: Promise<{ lang: Locale }>;
	children: React.ReactNode;
};
const metadataByLang: Record<Locale, Metadata> = {
	es: {
		title:
			"Fuzzy - Biblioteca de búsqueda difusa optimizada y fácil de usar - Pol Gubau Amores",
		description:
			"Una biblioteca optimizada para la búsqueda inexacta, diseñada para el rendimiento y la facilidad de uso.",
	},
	en: {
		title: "Fuzzy - Optimized and easy fuzzy finder library - Pol Gubau Amores",
		description:
			"A comprehensive library for fuzzy searching and matching, designed for performance and ease of use.",
	},
	cn: {
		title:
			"Fuzzy - Biblioteca de fuzzy finder optimitzada i fàcil d'usar - Pol Gubau Amores",
		description:
			"Una biblioteca optimizada per a la cerca difusa, dissenyada per al rendiment i la facilitat d'ús.",
	},
	de: {
		title:
			"Fuzzy - Optimierte und einfach zu verwendende Fuzzy-Finder-Bibliothek - Pol Gubau Amores",
		description:
			"Eine umfassende Bibliothek für unscharfes Suchen und Abgleichen, die für Leistung und Benutzerfreundlichkeit entwickelt wurde.",
	},
};
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

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	// read route params
	const { lang } = await params;

	// optionally access and extend (rather than replace) parent metadata
	const prevMetadata = await parent;

	const metadata = metadataByLang[lang];

	const oldMetadata = prevMetadata as Metadata;

	return {
		...oldMetadata,
		title: metadata.title,
		description: metadata.description,
		openGraph: {
			...oldMetadata.openGraph,
			title: metadata.title ?? oldMetadata.title ?? undefined,
			description: metadata.description ?? oldMetadata.description ?? undefined,
			images: [
				{
					url: "https://polgubau.com/fuzzy/opengraph-image.png",
					alt: "Fuzzy Finder Library",
				},
			],
		},
	};
}

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

export default async function RootLayout({ params, children }: Props) {
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
