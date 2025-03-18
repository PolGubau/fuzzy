import { CopySnipped } from "./copy-snipped";
import { fuzzy } from "@polgubau/fuzzy";
export const Content = () => {
	return (
		<section className="prose prose-invert max-md:prose-sm prose-h2:text-primary prose-code:text-yellow-50 p-1 max-md:max-w-[90vw]">
			<h1 className="text-balance">Framework agnostic Fuzzy finder 🔍</h1>
			<h2>What and why</h2>
			<p>
				After loosing some afternoons trying to create a{" "}
				<strong>fuzzy finder</strong> for a side project I decided to export it
				as an open source library that could help me (and other devs) with
				filters in the future.
			</p>
			I wanted to create a library that fits perfect for filters, selects,
			autocompletes, navigate commands, etc. The main goal was to create a
			library that is:
			<ul>
				<li>Easy to use.</li>
				<li>Framework-agnostic without dependencies.</li>
				<li>Fast, should filter thousands of items in milliseconds.</li>
				<li>Lightweight. Less than 2kb.</li>
				<li>Case-insensitive and diacritics-insensitive</li>
				<li>Returns the matched positions and points of each result</li>
			</ul>
			<p>
				This is how <strong>@polgubau/fuzzy</strong> ended being an optimized
				library designed with Typescript since the roots, you just need to type
				one command and call one function to get a fuzzy finder for your
				project.
			</p>
			<h3>What this is NOT ⚠️</h3>
			<ul>
				<li>A library that tries to do everything.</li>
				<li>A monolithic package with a lot of features you don't need.</li>
				<li>A complete Filter library.</li>
			</ul>
			<h3>What this IS ✅</h3>
			<ul>
				<li>A small direct library which solves a specific problem.</li>
				<li>A helper to your filters and lists</li>
				<li>A library that is easy to use and understand.</li>
				<li>Open source without pricing tag in the navbar</li>
			</ul>
			<h2>Installation</h2>
			<p>Install the library using your package manager of choice:</p>
			<CopySnipped />
			<h2>Usage</h2>
			<p>Import the utilities you need from the package:</p>
			<pre>
				<code>{`import { fuzzy } from "@polgubau/fuzzy";`}</code>
			</pre>
			<h2>Usage</h2>
			<h3>Simple string array</h3>
			<pre>
				<code>
					{`import fuzzy from '@polgubau/fuzzy';

const list = ["apple", "banana", "orange", "grape"];
const queryText = "appl"; // The search term
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
					<code>{`[
	{ item: "apple", score: 0.5, indices: [[0, 3]] },	
	{ item: "grape", score: 2, indices: [[0, 1]] },
]`}</code>
				</pre>
			</p>
			<h2>TypeScript Support</h2>
			<p>
				As it should always be, this library includes full TypeScript support
				with type definitions included.
			</p>
		</section>
	);
};
