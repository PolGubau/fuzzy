import { Card } from "components/card";
import { Content } from "components/content";
import { CopySnipped } from "components/copy-snipped";
import { Header } from "components/header";
import { Links } from "components/home/links";

export function Homepage() {
	return (
		<section className="flex gap-[40vh] flex-col items-center pt-[30vh] h-full">
			<Card>
				<Header />
				<CopySnipped />
				<Links />
			</Card>

			<Card>
				<Content />
				<div className="py-4">
					<Links />
				</div>
			</Card>
		</section>
	);
}
