import { source } from "@/lib/source";
import {
	DocsPage,
	DocsBody,
	DocsDescription,
	DocsTitle,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import defaultMdxComponents, { createRelativeLink } from "fumadocs-ui/mdx";
import { Popup, PopupContent, PopupTrigger } from "fumadocs-twoslash/ui";
import { TypeTable } from "fumadocs-ui/components/type-table";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { createTypeTable } from "fumadocs-typescript/ui";
import { Accordion, Accordions } from "fumadocs-ui/components/accordion";
import { Step, Steps } from "fumadocs-ui/components/steps";
import { ExampleNotesSearchDisplay } from "@/components/examples/notes-search";
import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";

export default async function Page({
	params,
}: {
	params: Promise<{ lang: string; slug?: string[] }>;
}) {
	const { slug, lang } = await params;
	const page = source.getPage(slug, lang);
	if (!page) notFound();

	const MDXContent = page.data.body;
	const { AutoTypeTable } = createTypeTable();

	return (
		<DocsPage toc={page.data.toc} full={page.data.full}>
			<DocsTitle>{page.data.title}</DocsTitle>
			<DocsDescription>{page.data.description}</DocsDescription>
			<DocsBody>
				<MDXContent
					components={{
						...defaultMdxComponents,
						Popup,
						Accordion,
						Accordions,
						Tab,
						Tabs,
						Step,
						Steps,
						PopupContent,
						PopupTrigger,
						TypeTable,
						AutoTypeTable,
						pre: ({ ref: _ref, ...props }) => (
							<CodeBlock {...props}>
								<Pre>{props.children}</Pre>
							</CodeBlock>
						),
						// this allows you to link to other pages with relative file paths
						a: createRelativeLink(source, page),
						ExampleNotesSearchDisplay,
						// you can add other MDX components here
					}}
				/>
			</DocsBody>
		</DocsPage>
	);
}

export async function generateStaticParams() {
	return source.generateParams();
}

export async function generateMetadata(props: {
	params: Promise<{ slug?: string[] }>;
}) {
	const params = await props.params;
	const page = source.getPage(params.slug);
	if (!page) notFound();

	return {
		title: page.data.title,
		description: page.data.description,
	};
}
