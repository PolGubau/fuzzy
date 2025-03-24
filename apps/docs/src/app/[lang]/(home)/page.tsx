import { Card } from "@/components/card";
import { CopySnipped } from "@/components/copy-snipped";
import { Header } from "@/components/header";
import { Links } from "@/components/links";
import type { Lang } from "@/types/base";

export default async function Page({
	params,
}: {
	params: Promise<{ lang: Lang }>;
}) {
	const { lang } = await params;
	return (
		<section className="flex gap-[40vh] flex-col items-center pt-[30vh] h-full">
			<Card>
				<Header />
				<CopySnipped />
				<Links lang={lang} />
			</Card>
		</section>
	);
}
