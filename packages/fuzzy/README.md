![Branches](./badges/packages/utils/coverage-branches.svg)
![Functions](./badges/packages/utils/coverage-functions.svg)
![Lines](./badges/packages/utils/coverage-lines.svg)
![Statements](./badges/packages/utils/coverage-statements.svg)
![Coverage total](./badges/packages/utils/coverage-total.svg)

![Last commit](https://img.shields.io/github/last-commit/PolGubau/utils?logo=git)
![Last Update](https://img.shields.io/npm/last-update/%40polgubau%2Futils?logo=npm&label=last%20update)
![Version](https://img.shields.io/npm/v/%40polgubau%2Futils?logo=npm&label=version)
![License](https://img.shields.io/github/license/PolGubau/utils?logo=github&label=license)
![Downloads](https://img.shields.io/npm/dt/%40polgubau%2Futils?logo=npm&label=downloads)

# @polgubau/utils

A collection of modern typescript utilities. 

## 📦 Installation

Install the package via npm or pnpm:

```sh
npm install @polgubau/utils
# or
pnpm add @polgubau/utils
```


## What and why

Over the past few years, TypeScript has become almost my second mother tongue after Spanish.  
I kept noticing how often I was rewriting the same utilities "debounce", "throttle", or "copy to clipboard" across different projects. Instead of reinventing the wheel every time, I decided to build a small library with the utilities I use the most in my daily work.

**@polgubau/utils** is a lightweight utility library designed to simplify common JavaScript and TypeScript tasks. It's modular, framework-agnostic, tree-shakable, and optimized for performance.

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
pnpm add @polgubau/utils
```

## Usage

Import the utilities you need from the package:

```js
import { copyToClipboard } from "@polgubau/utils";
```

For even better optimization, you can import specific modules or functions as needed:

```js
import { copyToClipboard } from "@polgubau/utils/functions";
import { shuffle } from "@polgubau/utils/arrays";
```

## Available Modules

- **Storage**: Utilities for working with `localStorage` and `sessionStorage`.
- **Accessibility**: Helpers to improve web accessibility.
- **Arrays**: Functions to manipulate arrays efficiently.
- **Comparators**: Utility functions for sorting and comparing data.
- **Functions**: Higher-order functions and utility methods.
- **Numbers**: Mathematical and number-related utilities.
- **Objects**: Object manipulation and transformation helpers.
- **Parsers**: Functions for parsing different types of data as JSON.
- **Texts**: String and text processing utilities.

## Example

Using the arrays module:

```js
import { limitArray } from "@polgubau/utils/arrays"; 
const { limitedArray } = limitArray([1, 2, 3, 4, 5]); 
console.log(limitedArray); // [1, 2]
```

## TypeScript Support

As it should always be, this library includes full TypeScript support with type definitions included.



## 🛠 Development

### Building the project

The easiest way to work with the project monorepo is to run

```sh
pnpm dev
```
in the root directory. This will start a watch build for the package and start a local server to preview the documentation page.

## 📜 License

This project is licensed under the **MIT** License.  

---

Made with ❤️ by [Pol Gubau Amores](https://polgubau.com)
