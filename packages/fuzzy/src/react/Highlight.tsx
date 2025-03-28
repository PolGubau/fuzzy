import { memo, Fragment, type FC, type CSSProperties } from "react";
import type { HighlightRanges } from "../vanilla/types";

type Style = CSSProperties;

type Props = {
	text: string;
	ranges: HighlightRanges | null;
	style?: Style;
	className?: string;
};

const fullSelection: HighlightRanges = [[0, Number.MAX_VALUE]];
const defaultStyle: Style = { backgroundColor: "rgba(245,220,0,.25)" };

type HighlightProps = Props;

const TextHighlighter: React.FC<HighlightProps> = ({
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

interface HighlightExport extends FC<Props> {
	FullSelection: typeof fullSelection;
}

/**
 * A React component that highlights text based on the provided props.
 *
 * This component is memoized for performance optimization and includes an additional
 * static property `FullSelection` for handling full text selection functionality.
 *
 * @component
 * @template Props - The props type for the `TextHighlighter` component.
 *
 * @property {FC<Props>} Highlight - The main text highlighter component.
 * @property {typeof fullSelection} FullSelection - A static property for full text selection.
 *
 * @example
 * ```tsx
 * import { Highlight } from './Highlight';
 *
 * const App = () => (
 *   <Highlight someProp="value" />
 * );
 * ```
 */
export const Highlight: HighlightExport = Object.assign(
	memo(TextHighlighter) as FC<Props>,
	{
		FullSelection: fullSelection,
	},
);

export function createHighlightComponent(
	customStyle: Style,
	customClassName: string,
): HighlightExport {
	const HighlightComponent: React.FC<Props> = ({
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
