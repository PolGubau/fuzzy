import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { i18n } from "@/lib/i18n";
import type { Locale } from "@/types/base";

export function baseOptions(locale: Locale): BaseLayoutProps {
	const docsLabels = {
		es: "Documentación",
		en: "Documentation",
		cat: "Documentació",
		de: "Dokumentation",
	};
	return {
		i18n,
		nav: {
			title: (
				<>
					<svg
						width="24"
						height="24"
						xmlns="http://www.w3.org/2000/svg"
						aria-label="Logo"
					>
						<title>Logo</title>
						<circle cx={12} cy={12} r={12} fill="currentColor" />
					</svg>
					Fuzzy
				</>
			),
		},
		links: [
			{
				text: docsLabels[locale],
				url: "/docs",
				active: "nested-url",
			},
		],
	};
}
