import type { FuzzyResult, HighlightRanges } from "data/ff";
import { Link } from "react-router";
import type { Util } from "~/assets/data.types";
type ItemProps = {
	data: FuzzyResult<Util>;
};
type Letter = {
	char: string;
	isHighlighted: boolean;
};
const areLettersHighlighted = (
	str: string,
	matches: HighlightRanges | null,
): Letter[] => {
	if (!matches) {
		return str.split("").map((char) => {
			return { char, isHighlighted: false };
		});
	}

	const letters: Letter[] = str.split("").map((char) => {
		return { char, isHighlighted: false };
	});
	for (const match of matches) {
		const [start, end] = match;
		for (let i = start; i <= end; i++) {
			if (letters[i]) {
				letters[i].isHighlighted = true;
			}
		}
	}
	return letters;
};
export const Item = ({ data }: ItemProps) => {
	const { item: util, score, matches } = data;

	const parsedName = areLettersHighlighted(util.name, matches[0]);
	const parsedDescription = areLettersHighlighted(util.description, matches[1]);

	// new is added last month
	const isNew =
		new Date(util.lastUpdated) >
		new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
	return (
		<Link
			to={`/docs/${util.name}`}
			aria-description={util.description}
			className={
				"group p-4 capitalize relative w-full flex flex-col gap-2 mb-2 last:mb-0 hover:bg-neutral-500/20 rounded-xl"
			}
		>
			{isNew && (
				<span
					title={util.lastUpdated}
					className="absolute top-2 right-2 text-xs bg-primary/20 text-primary rounded-lg px-2 py-1"
				>
					New
				</span>
			)}
			<ul className="opacity-80 flex gap-2 flex-wrap -ml-1">
				<li>
					<small
						title="category"
						className="py-1 text-sm px-2.5 rounded-full bg-neutral-500/20"
					>
						{util.category}
					</small>
				</li>

				<li>
					<small className="py-1 text-xs text-neutral-50/50 px-2.5 rounded-full bg-neutral-500/20">
						{util.compatibility}
					</small>
				</li>

				<li>
					<small className="py-1 text-xs text-neutral-50/50 px-2.5 rounded-full bg-neutral-500/20">
						{util.type}
					</small>
				</li>
				<li>
					<small className="py-1 text-xs text-neutral-50/50 px-2.5 rounded-full bg-neutral-500/20">
						Since {util.since}
					</small>
				</li>
			</ul>

			<div className="pr-10 flex flex-col gap-1">
				<h3 className="text-xl text-pretty font-bold group-hover:text-primary/80">
					<HighlightedText text={parsedName} whatIs={"name"} />
				</h3>
				<p className="text-sm text-neutral-50/70 text-balanced">
					<HighlightedText text={parsedDescription} whatIs={"desc"} />
				</p>
			</div>
		</Link>
	);
};

type HighlightedTextProps = {
	text: Letter[];
	/**
	 * Only to avoid duplicate keys in the map function
	 * @default "text"
	 */
	whatIs?: string;
	classNames?: {
		base?: string;
		highlighted?: string;
		noHighlight?: string;
		first?: string;
		last?: string;
	};
};
const HighlightedText = ({
	text,
	whatIs = "text",
	classNames,
}: HighlightedTextProps) => {
	return (
		<>
			{text.map((letter, idx) => {
				const nextHighlighted = text[idx + 1]?.isHighlighted;
				const prevHighlighted = text[idx - 1]?.isHighlighted;
				const isFirstOfRange = letter.isHighlighted && !prevHighlighted;
				const isLastOfRange = letter.isHighlighted && !nextHighlighted;
				return (
					<span
						key={`${letter.char + text[idx].char + idx + whatIs}`}
						className={` 
							${classNames?.base || ""}
							${letter.isHighlighted && `bg-primary/30 ${classNames?.highlighted || ""}`}
							${!letter.isHighlighted && ` ${classNames?.noHighlight || ""}`}
							${isFirstOfRange && `rounded-l-md ${classNames?.first || ""}`}
							${isLastOfRange && `rounded-r-md ${classNames?.last || ""}`}

							`}
					>
						{letter.char}
					</span>
				);
			})}
		</>
	);
};
