import { source } from "@/lib/source";
import { createFromSource } from "fumadocs-core/search/server";

export const { GET } = createFromSource(source, undefined, {
	localeMap: {
		cat: "català",
	},
});
