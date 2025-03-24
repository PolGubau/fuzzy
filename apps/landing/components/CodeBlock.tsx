import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";

export async function CodeBlock() {
	const [html, setHtml] = useState<string>("");
	useEffect(() => {
		codeToHtml("const a = 1 + 3", {
			lang: "javascript",
			theme: "nord",
		}).then((html) => {
			setHtml(html);
		});
	}, []);

	return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
