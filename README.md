![Branches](./badges/packages/fuzzy/coverage-branches.svg)
![Functions](./badges/packages/fuzzy/coverage-functions.svg)
![Lines](./badges/packages/fuzzy/coverage-lines.svg)
![Statements](./badges/packages/fuzzy/coverage-statements.svg)
![Coverage total](./badges/packages/fuzzy/coverage-total.svg)

![Last commit](https://img.shields.io/github/last-commit/PolGubau/fuzzy?logo=git)
![Last Update](https://img.shields.io/npm/last-update/%40polgubau%2Ffuzzy?logo=npm&label=last%20update)
![Version](https://img.shields.io/npm/v/%40polgubau%2Ffuzzy?logo=npm&label=version)
![License](https://img.shields.io/github/license/PolGubau/fuzzy?logo=github&label=license)
![Downloads](https://img.shields.io/npm/dt/%40polgubau%2Ffuzzy?logo=npm&label=downloads)

# @polgubau/fuzzy
**@polgubau/fuzzy** is an optimized fuzzy finder library designed with TypeScript from the roots. You just need to type one command and call one function to get a fuzzy finder for your project.
 
## What and why
Filters in JavaScript are often slow and cumbersome. The native `Array.prototype.filter` method is not optimized for performance, especially when dealing with large datasets. This library provides a simple and efficient way to perform fuzzy searches on arrays of strings.

It allows you to create a fuzzy search function that can be reused across your application, making it easy to filter lists based on user input.


### What this is NOT ⚠️
- A catch-all library that solves every problem.
- A replacement for Lodash or Underscore.
- A package that will unnecessarily inflate your bundle size.

### What this IS ✅
- A collection of small, focused utility functions.
- Modular, tree-shakable and lightweight both for CJS and ESM.
- Designed to be simple, efficient, and easy to use.
- Fully typed, with TypeScript definitions included.

## Installation

Install the library using your package manager of choice:

```sh
pnpm add @polgubau/fuzzy
```

## Usage

```ts
import fuzzy from '@polgubau/fuzzy';

const list = ["volvo", "seat", "mercedes", "audi", "bmw"];
const queryText = "volv"; // The search term
const fuzzySearch = fuzzy(list);

// Run this whenever the search term changes
const fuzzedList = fuzzySearch(queryText);
console.log(fuzzedList); 
```

## Using React? 
To simplify the integration of fuzzy search into your React applications, we provide a custom hook called `useFuzzy`.

```tsx title="App.tsx"
import { useFuzzy, Highlight } from '@polgubau/fuzzy/react' // Note: now importing from /react

const filteredList = useFuzzy({
  list: ["volvo", "seat", "mercedes", "audi", "bmw"],
  query: "volv"
})

filteredList.map(({ item, matches: [range] }) => (
  <div key={item}>
    <Highlight text={item} ranges={range} />
  </div>
))
```
 
## Documentation
The documentation page is available at [fuzzy.polgubau.com](https://fuzzy.polgubau.com).

The documentation is built using [Fumadocs](https://fumadocs.com) with some customizations.

### I18n support

The documentation is available in multiple languages. You can switch between them using the language selector in the top right corner of the page.
Currently, the following languages are supported:

| Language | Supported |
| -------- | --------- |
| English  | ✅       |
| Spanish  | ✅       |
| Catalan  | ✅       |
| German   | ✅       |



## 🛠 Development

### Building the project

The easiest way to work with the project monorepo is to run

```sh
pnpm dev
```
in the root directory. This will start a watch build for the package and start a local server to preview the documentation page.

### Running tests
> **Note:** The tests are written in TypeScript and use [Vitest](https://vitest.dev/) as the testing framework.
Run the command inside the `packages/fuzzy` directory to run the tests.
```sh
pnpm test
```


---
## Author and license
Made with ❤️ by [Pol Gubau Amores](https://polgubau.com)

This project is based on *microfuzz*, which was created by [@Nozbe](https://github.com/Nozbe), some improvements were made to the original code, and it was rewritten in TypeScript.

[See all contributors](https://github.com/PolGubau/fuzzy/graphs/contributors).

This project is available under the MIT license. See the [LICENSE file](https://github.com/PolGubau/fuzzy/LICENSE) for more info.
