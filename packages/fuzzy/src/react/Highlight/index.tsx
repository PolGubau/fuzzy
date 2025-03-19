import { memo, Fragment, type FunctionComponent } from "react";
import type { HighlightRanges } from "../../fuzzy-finder/types";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type Style = Record<string, any> | null | undefined;
type ClassName = string | undefined;

type Props = {
	text: string;
	ranges: HighlightRanges | null;
	style?: Style;
	className?: ClassName;
};

const fullSelection: HighlightRanges = [[0, Number.MAX_VALUE]];
const defaultStyle: Style = { backgroundColor: "rgba(245,220,0,.25)" };

type HighlightProps = Props;

const Highlight: React.FC<HighlightProps> = ({
	text,
	ranges,
	style,
	className,
}) => {
	if (!ranges || ranges.length === 0) {
		return <>{text}</>;
	}

	let lastHighlightedIndex = 0;
	const nodes: Array<React.ReactNode> = [];

	for (const range of ranges) {
		const [start, end] = range;

		if (start < lastHighlightedIndex || end < start) {
			console.warn(
				`Broken range in <Highlight>: ${start}-${end}, last: ${lastHighlightedIndex}`,
			);
			return null;
		}

		if (start > lastHighlightedIndex) {
			nodes.push(
				<Fragment key={`t${lastHighlightedIndex}-${start}`}>
					{text.slice(lastHighlightedIndex, start)}
				</Fragment>,
			);
		}

		nodes.push(
			<span
				style={style ?? defaultStyle}
				className={className}
				key={`${start}-${end}`}
			>
				{text.slice(start, end + 1)}
			</span>,
		);

		lastHighlightedIndex = end + 1;
	}

	if (text.length > lastHighlightedIndex) {
		nodes.push(
			<Fragment key="last">{text.slice(lastHighlightedIndex)}</Fragment>,
		);
	}

	return <>{nodes}</>;
};

interface HighlightExport extends FunctionComponent<Props> {
	FullSelection: typeof fullSelection;
}

const ExportedHighlight: HighlightExport = Object.assign(
	memo(Highlight) as FunctionComponent<Props>,
	{
		FullSelection: fullSelection,
	},
);

export default ExportedHighlight;
export function createHighlightComponent(
	customStyle: Style,
	customClassName: ClassName,
): HighlightExport {
	const HighlightComponent: React.FC<Props> = ({
		style,
		className,
		...props
	}) => (
		<Highlight
			{...props}
			style={style ?? customStyle}
			className={className ?? customClassName}
		/>
	);

	Object.assign(HighlightComponent, { FullSelection: fullSelection });

	return HighlightComponent as unknown as HighlightExport;
}
