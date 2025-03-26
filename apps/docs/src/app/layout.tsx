import type { Locale } from "@/types/base";
import { locales } from "@/constants/locales";
import { baseTranslations } from "@/dictionary/base-translations";
import { I18nProvider } from "fumadocs-ui/i18n";
import { RootProvider } from "fumadocs-ui/provider";
import { Inter } from "next/font/google";
import type { LocaleItem } from "node_modules/fumadocs-ui/dist/contexts/i18n";
import "./global.css";
import type { SearchLink } from "fumadocs-ui/components/dialog/search";

const inter = Inter({
	subsets: ["latin"],
});
const interestingLinks = ["Home", "Docs", "Examples"] as const;
type InterestingLinks = (typeof interestingLinks)[number];
const allLinksTranslations: [InterestingLinks, Record<Locale, string>][] = [
	["Home", { es: "Inicio", en: "Home", cat: "Inici", de: "Startseite" }],
	[
		"Docs",
		{
			es: "Documentación",
			en: "Docs",
			cat: "Documentació",
			de: "Dokumentation",
		},
	],
	[
		"Examples",
		{ es: "Ejemplos", en: "Examples", cat: "Exemples", de: "Beispiele" },
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
