export const categories = [
	"strings",
	"storage",
	"functions",
	"arrays",
	"objects",
	"accessibility",
	"validations",
	"parsers",
	"numbers",
	"random",
	"dates",
] as const;

export const compatibilities = ["browser", "universal"] as const;

export type Category = (typeof categories)[number];
export type Compatibility = (typeof compatibilities)[number];
export type CategoryWithAll = Category | "all";
export interface Data {
	name: string;
	version: `${number}.${number}.${number}`;
	utils: Util[];
}

export interface Util {
	name: string;
	description: string;
	category: Category;
	tags: string[];
	author: string;
	since: string;
	lastUpdated: string;
	type: string;
	compatibility: Compatibility;
	example: Example[];
	props: Prop[];
	return: Return;
	error: null | string;
	notes: string;
}

interface Prop {
	name: string;
	description: string;
	type: string;
	default?: string | null | number | boolean;
	required?: boolean;
}

type BaseReturn = {
	description: string;
};

type Return =
	| (BaseReturn & {
			type:
				| "void"
				| "string"
				| "number"
				| "boolean"
				| "object"
				| "array"
				| "function"
				| "any"
				| string;
			options?: never;
	  })
	| (BaseReturn & {
			type: "enum";
			options: string[];
	  });

interface Example {
	code: string;
	output: string;
}
