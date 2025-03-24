import { Card } from "@/components/card";
import { CopySnipped } from "@/components/copy-snipped";
import { Header } from "@/components/header";
import { Links } from "@/components/links";

export default function HomePage() {
	return (
		<section className="flex gap-[40vh] flex-col items-center pt-[30vh] h-full">
			<Card>
				<Header />
				<CopySnipped />
				<Links />
			</Card>
		</section>
	);
}
