import { Card } from "components/card";
import { Link } from "react-router";
import type { Util } from "~/assets/data.types";

import { formatString } from "@polgubau/utils/texts";
import { CopySnipped } from "components/copy-snipped";
import { dataAccess } from "data/dataAccess";
import { Item } from "components/util-list/item";

type DetailsPageProps = {
	data: Util;
};
export const DetailsPage = ({ data }: DetailsPageProps) => {
	const headerTableKeys: ReadonlyArray<keyof Util> = [
		"category",
		"compatibility",
		"type",
		"lastUpdated",
		"since",
		"author",
	] as const;
	const related = dataAccess.getRelated(data.name);
	return (
		<section className="flex flex-col pt-20 h-full ">
			<article className="max-w-2xl w-full mx-auto ">
				<Card>
					<nav>
						<Link
							to="/docs"
							className="hover:underline text-xs gap-4 opacity-60 font-thin"
						>
							&lt; Back to List
						</Link>
					</nav>
					<header className="mb-4 space-y-2">
						<h1 className="text-3xl font-bold">{formatString(data.name)}</h1>
						<h2 className="text-neutral-500 mb-4">{data.description}</h2>
						<table className="text-sm text-neutral-500 w-full">
							{Object.entries(data)
								.filter(([key]) => headerTableKeys.includes(key as keyof Util))
								.map(([key, value]) => (
									<tr key={key}>
										<td className="font-bold text-neutral-100/80 sm:w-1/3 md:w-1/5">
											{formatString(key)}
										</td>
										<td>{formatString(value)}</td>
									</tr>
								))}
						</table>
					</header>

					<div className="prose prose-invert max-md:max-w-none mb-4 prose-sm">
						<CopySnipped
							text={`import { ${data.name} } from "@polgubau/utils/${data.category}";`}
						/>

						<h2>Example</h2>
						<ul className="not-prose divide-y space-y-4 divide-neutral-500/20 border-l-2 border-neutral-500/40 pl-4">
							{data.example.map((example) => (
								<li
									key={example.code}
									className="grid gap-2 pb-4 pl-4 items-start grid-cols-[1fr_5fr]"
								>
									<h3 className="text-sm text-neutral-200/80">Input</h3>

									<pre className="rounded-lg px-2 py-1 bg-neutral-500/20 text-xs font-mono whitespace-pre-wrap w-fit">
										<code>{example.code}</code>
									</pre>

									<h3 className="text-sm text-neutral-200/80">Output:</h3>

									<pre className="rounded-lg px-2 py-1 bg-neutral-500/20 text-xs font-mono whitespace-pre-wrap w-fit">
										{example.output}
									</pre>
								</li>
							))}
						</ul>

						<h2>Return</h2>
						<div className="border-l-2 border-neutral-500/40 pl-4 mb-4">
							<p>{data.return.description}</p>
							<p>Type: {data.return.type}</p>
							{data.return.type === "enum" && (
								<ul className="flex gap-2 flex-wrap not-prose">
									Options:
									{data.return.options?.map((value) => (
										<li
											key={value}
											className="bg-neutral-500/20 px-2 py-0.5 rounded-full"
										>
											{value}
										</li>
									))}
								</ul>
							)}
						</div>
						{data.props.length > 0 && (
							<>
								<h2>Props</h2>
								<div className="border-l-2 border-neutral-500/40 pl-4 mb-4">
									<table>
										<thead>
											<tr>
												<th>Name</th>
												<th>Type</th>
												<th>Default</th>
												<th>Required</th>
												<th>Description</th>
											</tr>
										</thead>
										<tbody className="text-xs">
											{data.props.map((param) => (
												<tr key={param.name}>
													<td>{param.name}</td>
													<td>{param.type}</td>
													<td>{param.default ?? "null"}</td>
													<td>
														{(param.required ?? false) ? (
															<span className="bg-green-500/20 py-1 px-2 rounded-lg">
																Yes
															</span>
														) : (
															<span className="bg-red-500/20 py-1 px-2 rounded-lg">
																No
															</span>
														)}
													</td>
													<td>{param.description}</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</>
						)}

						{data.notes && (
							<>
								<h2>Notes</h2>
								<div className="border-l-2 border-neutral-500/40 pl-4 mb-4">
									<p>{data.notes}</p>
								</div>
							</>
						)}

						{data.error && (
							<>
								<h2>Errors</h2>
								<div className="border-l-2 border-neutral-500/40 pl-4 mb-4">
									<p>{data.error}</p>
								</div>
							</>
						)}

						{data.tags.length > 0 && (
							<div className="flex flex-col gap-2">
								<h2>Tags</h2>
								<ul>
									{data.tags.map((tag) => (
										<li key={tag}>
											<span className="bg-neutral-500/20 text-sm px-2 py-1 rounded-full">
												{tag}
											</span>
										</li>
									))}
								</ul>
							</div>
						)}

						{related.length > 0 && (
							<>
								<h2>Related</h2>
								<ul className="not-prose divide-y space-y-4 divide-neutral-500/20 border-l-2 border-neutral-500/40 pl-4">
									{related.map((item) => (
										<Item
											key={item.name}
											data={{ item, score: 0, matches: [] }}
										/>
									))}
								</ul>
							</>
						)}
					</div>
					<nav>
						<Link
							to="/docs"
							className="hover:underline text-xs gap-4 opacity-60 font-thin"
						>
							&lt; Back to List
						</Link>
					</nav>
				</Card>
			</article>
		</section>
	);
};
