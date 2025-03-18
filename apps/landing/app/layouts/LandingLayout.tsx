import { fuzzy } from "@polgubau/fuzzy";
import { Background } from "components/bg";
import { Outlet } from "react-router";

export default function ProjectLayout() {
	const list = ["apple", "banana", "orange", "grape"];
	const queryText = "appl";

	const fuzzySearch = fuzzy(list);

	// Run this whenever search term changes
	// Only matching items will be returned, sorted by how well they match `queryText`
	const results = fuzzySearch(queryText);
	console.log(results);
	return (
		<div className="min-h-screen w-screen relative overflow-x-hidden">
			<section className="h-screen fixed top-0 w-screen select-none pointer-events-none">
				<Background />
			</section>
			<main className="z-20 h-full w-screen mb-20 relative">
				<Outlet />
			</main>
		</div>
	);
}
