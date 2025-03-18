import { copyToClipboard } from "@polgubau/utils";
import { useState } from "react";
type CopySnippedProps = {
	text?: string;
};
export const CopySnipped = ({
	text = "pnpm add @polgubau/utils",
}: CopySnippedProps) => {
	const [isCopied, setIsCopied] = useState(false);

	const conditionalClassName = isCopied
		? "outline-green-300/50 bg-green-500/10 text-white outline-2"
		: "outline-neutral-500/50 text-white/80";

	const handleCopy = () => {
		copyToClipboard(text);
		setIsCopied(true);
		setTimeout(() => setIsCopied(false), 2000);
	};

	return (
		<button
			type="button"
			onClick={handleCopy}
			className={`w-fit grid grid-cols-[1fr_auto] items-center gap-4 border-0 outline relative transition-all rounded-xl px-4 py-2 ${conditionalClassName} cursor-pointer text-left max-sm:text-xs max-md:text-sm`}
		>
			<code className="not-prose">{text}</code>

			<span className="text-xs text-neutral-200/60 min-w-[45px] text-right">
				{isCopied ? "Copied!" : "Copy"}
			</span>
		</button>
	);
};
