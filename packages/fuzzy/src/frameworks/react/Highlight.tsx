import { memo, Fragment, type FC, type CSSProperties } from "react";
import type { HighlightRanges } from "../../core/types";

type Style = CSSProperties;

type HighlightProps = {
	/**
	 * The text to be highlighted.
	 * @default ""
	 * @example "Hello, World!"
	 */
	text: string;

	/**
	 * The ranges of text to be highlighted.
	 * @default null
	 * @example [[0, 4], [7, 11]]
	 */
	ranges: HighlightRanges | null;
	/**
	 * The style to be applied to the highlighted text.
	 * @default { backgroundColor: "rgba(245,220,0,.25)" }
	 */
	style?: Style;
	/**
	 * The class name to be applied to the highlighted text.
	 * @default ""
	 */
	className?: string;
};

const fullSelection: HighlightRanges = [[0, Number.MAX_VALUE]];
const defaultStyle: Style = { backgroundColor: "rgba(245,220,0,.25)" };

const TextHighlighter: React.FC<HighlightProps> = ({
	text,
	ranges,
	style = defaultStyle,
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
			<span style={style} className={className} key={`${start}-${end}`}>
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

interface HighlightExport extends FC<HighlightProps> {
	FullSelection: typeof fullSelection;
}

/**
 * A React component that highlights text based on the provided props.
 *
 * This component is memoized for performance optimization and includes an additional
 * static property `FullSelection` for handling full text selection functionality.
 *
 * @component
 * @template HighlightProps - The props type for the `TextHighlighter` component.
 *
 * @property {FC<HighlightProps>} Highlight - The main text highlighter component.
 * @property {typeof fullSelection} FullSelection - A static property for full text selection.
 *
 * @example
 * ```tsx
 * import { Highlight } from './Highlight';
 *
 * const App = () => (
 *   <Highlight text="Hello, World!" ranges={[[0, 4]]} />
 * );
 * ```
 */
export const Highlight: HighlightExport = Object.assign(
	memo(TextHighlighter) as FC<HighlightProps>,
	{
		FullSelection: fullSelection,
	},
);

export function createHighlightComponent(
	customStyle: Style,
	customClassName: string,
): HighlightExport {
	const HighlightComponent: React.FC<HighlightProps> = ({
		style,
		className,
		...props
	}) => (
		<TextHighlighter
			{...props}
			style={style ?? customStyle}
			className={className ?? customClassName}
		/>
	);

	Object.assign(HighlightComponent, { FullSelection: fullSelection });

	return HighlightComponent as unknown as HighlightExport;
}
