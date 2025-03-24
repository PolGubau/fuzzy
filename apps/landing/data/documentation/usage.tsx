import { CodeBlock } from "components/CodeBlock";

export const Usage = () => {
	return (
		<section className="prose prose-invert max-md:prose-sm prose-h2:text-primary prose-code:text-yellow-50 p-1 max-md:max-w-[90vw]">
			<h1 className="text-balance" id="usage">
				Usage
			</h1>

			<h2>Usage</h2>
			<p>What you need:</p>
			<ol>
				<li className="pl-4 border-l-4 border-primary/70">
					A list of items to search through
					<CodeBlock
						code={`const list = ["apple", "banana", "orange", "grape"];`}
					/>
					<pre className="!my-2">
						<code>const list = ["apple", "banana", "orange", "grape"];</code>
					</pre>
				</li>
				<li className="py-1 px-4 bg-primary/20 rounded-lg">
					A list of items to search through
					<pre className="!my-2">
						<code>const list = ["apple", "banana", "orange", "grape"];</code>
					</pre>
				</li>
				<li className="py-1 px-4 bg-primary/20 rounded-lg">
					A search term
					<pre className="!my-2">
						<code>const queryText = "ap";</code>
					</pre>
				</li>
			</ol>
			<h3>Simple string array</h3>
			<pre>
				<code>
					{`import fuzzy from '@polgubau/fuzzy';

const list = ["apple", "banana", "orange", "grape"];
const queryText = "ap"; // The search term
const fuzzySearch = fuzzy(list)

// Run this whenever search term changes
const results = fuzzySearch(queryText)
`}
				</code>
			</pre>
			<p>
				Returns an array of results sorted by how well they match the query
				(descending order). Only the matching items will be returned. This code
				will return the following results:
				<pre>
					<code>{`[{
  "item": "apple",
  "score": 0.5,
  "matches": [[[0, 1]]]
},
{
  "item": "grape",
  "score": 2,
  "matches": [[[2, 3]]]
}]`}</code>
				</pre>
			</p>
		</section>
	);
};
