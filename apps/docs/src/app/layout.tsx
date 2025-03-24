import { I18nProvider, type Translations } from "fumadocs-ui/i18n";
import "./global.css";
import { RootProvider } from "fumadocs-ui/provider";
import { Inter } from "next/font/google";

const inter = Inter({
	subsets: ["latin"],
});
const es: Partial<Translations> = {
	search: "Buscar",
};

const locales = [
	{
		name: "English",
		locale: "en",
	},
	{
		name: "Español",
		locale: "es",
	},
	{
		name: "Català",
		locale: "cat",
	},
	{
		name: "Deutsch",
		locale: "de",
	},
];
export default async function RootLayout({
	params,
	children,
}: {
	params: Promise<{ lang: string }>;
	children: React.ReactNode;
}) {
	const lang = (await params).lang;
	return (
		<html lang={lang} className={inter.className} suppressHydrationWarning>
			<body className="flex flex-col min-h-screen">
				<I18nProvider
					locale={lang}
					locales={locales}
					translations={{ es }[lang]}
				>
					<RootProvider
						search={{
							links: [
								["Home", "/"],
								["Docs", "/docs"],
							],
						}}
					>
						{children}
					</RootProvider>{" "}
				</I18nProvider>
			</body>
		</html>
	);
}
