import { Card } from "components/card";
import { CopySnipped } from "components/copy-snipped";
import { Header } from "components/header";
import { Links } from "components/home/links";
import { GettingStarted } from "data/documentation/getting-started";

export function Homepage() {
	return (
		<section className="flex gap-[40vh] flex-col items-center pt-[30vh] h-full">
			<Card>
				<Header />
				<CopySnipped />
				<Links />
			</Card>

			<Card>
				<GettingStarted />
				<div className="py-4">
					<Links />
				</div>
			</Card>
		</section>
	);
}
