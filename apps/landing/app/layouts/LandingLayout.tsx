import { Background } from "components/bg";
import { Outlet } from "react-router";

export default function ProjectLayout() {
	return (
		<div className="min-h-screen w-screen relative overflow-x-hidden">
			<section className="h-screen fixed top-0 w-screen select-none pointer-events-none animate-blur">
				<Background />
			</section>
			<main className="z-20 h-full w-screen mb-20 relative">
				<Outlet />
			</main>
		</div>
	);
}
