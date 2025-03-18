import { dataAccess } from "data/dataAccess";
import { DetailsPage } from "~/pages/docs/details";
import type { Route } from "./+types/details";
export function meta(_args: Route.MetaArgs) {
	console.log(_args);
	const name = _args.data.data?.name || "Util";
	const author = _args.data.data?.author || "Pol Gubau Amores";
	return [
		{
			title: `${name} - Utils - by ${author}`,
		},
		{
			name: "description",
			content:
				"List of @polgubau/utils items, a framework agnostic library with builtin helper functions for your typescript project",
		},
		{
			name: "keywords",
			content: "typescript, utils, helpers, library, framework agnostic",
		},
		{
			name: "author",
			content: "Pol Gubau Amores",
		},
		{
			property: "og:image",
			content: "/og.png",
		},
		{
			property: "og:title",
			content:
				"Utils - Lightweight Typescript helpers for your Projects 🚀 - Pol Gubau Amores",
		},
		{
			property: "og:description",
			content:
				"Documentation of @polgubau/utils, a framework agnostic library with builtin helper functions for your typescript project",
		},
	];
}

export async function loader({ params }: Route.LoaderArgs) {
	const utilName = params.util;
	const util = dataAccess.getUtilByName(utilName);

	return { data: util ?? null };
}

export default function ListMetaPage({ loaderData }: Route.ComponentProps) {
	return (
		<>
			{loaderData?.data !== null ? (
				<DetailsPage data={loaderData.data} />
			) : (
				<div>No data available</div>
			)}
		</>
	);
}
