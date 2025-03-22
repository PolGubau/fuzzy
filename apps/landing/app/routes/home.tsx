import type { Route } from "./+types/home";
import { Homepage } from "../pages/home/home";

export function meta(_args: Route.MetaArgs) {
	return [
		{
			title: "Fuzzy - Typescript Fuzzy finder algorithm - by Pol Gubau Amores",
			name: "title",
		},
		{
			name: "description",
			content:
				"Documentation of @polgubau/fuzzy, a framework agnostic fuzzy finder algorithm for your typescript project",
		},
		{
			name: "keywords",
			content: "typescript, utils, helpers, library, framework agnostic, fuzzy",
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
			content: "Fuzzy - Typescript Fuzzy finder - Pol Gubau Amores",
		},
		{
			property: "og:description",
			content:
				"Documentation of @polgubau/fuzzy, a framework agnostic fuzzy finder algorithm for your typescript project",
		},
		{
			property: "og:url",
			content: "https://examfuzzy.polgubau.com",
		},
	];
}
export default function Home() {
	return <Homepage />;
}
