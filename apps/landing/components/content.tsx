import { CopySnipped } from "./copy-snipped";
export const Content = () => {
	return (
		<section className="prose prose-invert max-md:prose-sm prose-h2:text-primary prose-code:text-yellow-50 p-1 max-md:max-w-[80vw]">
			<h1>Lightweight Utility Library ✨</h1>
			<h2>What and why</h2>
			Over the past few years, <strong>TypeScript</strong> has become almost my
			second mother tongue after Spanish.
			<p>
				I kept noticing how often I was rewriting the same utilities "debounce",
				"throttle", or "copy to clipboard" across different projects. Instead of
				reinventing the wheel every time, I decided to build a small library
				with the utilities I use the most in my daily work.
			</p>
			<p>
				<strong>@polgubau/utils</strong> is a lightweight utility library
				designed to simplify common JavaScript and TypeScript tasks. It's
				<strong>modular</strong>, <strong>framework-agnostic</strong>,
				<strong>tree-shakable</strong>, and optimized for performance.
			</p>
			<h3>What this is NOT ⚠️</h3>
			<ul>
				<li>A catch-all library that solves every problem.</li>
				<li>A replacement for Lodash or Underscore.</li>
				<li>A package that will unnecessarily inflate your bundle size.</li>
			</ul>
			<h3>What this IS ✅</h3>
			<ul>
				<li>A collection of small, focused utility functions.</li>
				<li>Modular, tree-shakable and lightweight both for CJS and ESM.</li>
				<li>Designed to be simple, efficient, and easy to use.</li>
				<li>Fully typed, with TypeScript definitions included.</li>
			</ul>
			<h2>Installation</h2>
			<p>Install the library using your package manager of choice:</p>
			<CopySnipped />
			<h2>Usage</h2>
			<p>Import the utilities you need from the package:</p>
			<pre>
				<code>{`import { copyToClipboard } from "@polgubau/utils";`}</code>
			</pre>
			<p>
				For even better optimization, you can import specific modules or
				functions as needed:
			</p>
			<pre className="flex flex-col gap-2">
				<code>{`import { copyToClipboard } from "@polgubau/utils/functions";`}</code>

				<code>{`import { shuffle } from "@polgubau/utils/arrays";`}</code>
			</pre>
			<h2>Available Modules</h2>
			<ul>
				<li>
					<strong>Storage</strong> - Utilities for working with localStorage and
					sessionStorage.
				</li>
				<li>
					<strong>Accessibility</strong> - Helpers to improve web accessibility.
				</li>
				<li>
					<strong>Arrays</strong> - Functions to manipulate arrays efficiently.
				</li>
				<li>
					<strong>Comparators</strong> - Utility functions for sorting and
					comparing data.
				</li>
				<li>
					<strong>Functions</strong> - Higher-order functions and utility
					methods.
				</li>
				<li>
					<strong>Numbers</strong> - Mathematical and number-related utilities.
				</li>
				<li>
					<strong>Objects</strong> - Object manipulation and transformation
					helpers.
				</li>
				<li>
					<strong>Parsers</strong> - Functions for parsing different types of
					data as JSON.
				</li>
				<li>
					<strong>Texts</strong> - String and text processing utilities.
				</li>
			</ul>
			<h2>Example</h2>
			<p>
				Using the <code>arrays</code> module:
			</p>
			<pre>
				<code>
					{`import {limitArray} from "@polgubau/utils/arrays"; 
const {limitedArray} = limitArray([1, 2, 3, 4, 5]); 
console.log(unique(numbers)); // [1, 2, 3]`}
				</code>
			</pre>
			<h2>TypeScript Support</h2>
			<p>
				As it should always be, this library includes full TypeScript support
				with type definitions included.
			</p>
		</section>
	);
};
