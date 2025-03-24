import { Background } from "@/components/bg";
import type { PropsWithChildren } from "react";

export default function ProjectLayout({ children }: PropsWithChildren) {
	return (
		<div className="min-h-screen w-screen relative overflow-x-hidden">
			<section className="h-screen fixed top-0 w-screen select-none pointer-events-none">
				<Background />
			</section>
			<main className="z-20 h-full w-screen mb-20 relative">{children}</main>
		</div>
	);
}
