import { CopySnipped } from "components/copy-snipped";
import { Link } from "react-router";
export const GettingStarted = () => {
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
			<div>
				Check <Link to="/docs">the documentation</Link> for more examples and
				details on how to use the library.
			</div>
			<h2>TypeScript Support</h2>
			<p>
				As it should always be, this library includes full TypeScript support
				with type definitions included.
			</p>
		</section>
	);
};
