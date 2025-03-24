import { Background } from "@/components/bg";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import type { ReactNode } from "react";
import { baseOptions } from "../layout.config";
import type { Lang } from "@/types/base";

export default async function Layout({
	params,
	children,
}: {
	params: Promise<{ lang: Lang }>;
	children: ReactNode;
}) {
	const { lang } = await params;

	return (
		<HomeLayout {...baseOptions(lang)}>
			<div className="min-h-screen w-screen relative overflow-x-hidden">
				<section className="h-screen fixed top-0 w-screen select-none pointer-events-none">
					<Background />
				</section>
				<main className="z-20 h-full w-screen mb-20 relative">{children}</main>
			</div>
		</HomeLayout>
	);
}
