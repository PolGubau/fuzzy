import { Card } from "components/card";
import { Usage } from "data/documentation/usage";
import { Link } from "react-router";
import type { Data } from "~/assets/data.types";
type ListPageProps = {
	data: Data;
};
export const ListPage = (props: ListPageProps) => {
	return (
		<section className="flex gap-[10vh] flex-col pt-20 h-full">
			<article className="max-w-4xl w-full mx-auto">
				<Card>
					<header>
						<nav>
							<Link
								to="/"
								className="hover:underline text-xs gap-4 opacity-60 font-thin"
							>
								&lt; Back to Home
							</Link>
						</nav>
						<h1 className="text-3xl font-bold text-center mb-4">
							Fuzzy <span className="text-primary">Docs</span>
						</h1>
					</header>
					<div className="grid md:grid-cols-[1fr_auto] gap-2">
						<Usage />

						<div className="sticky top-0 w-full h-full bg-red-300">TOC</div>
					</div>
					<nav>
						<Link
							to="/"
							className="hover:underline text-xs gap-4 opacity-60 font-thin"
						>
							&lt; Back to Home
						</Link>
					</nav>
				</Card>
			</article>
		</section>
	);
};
