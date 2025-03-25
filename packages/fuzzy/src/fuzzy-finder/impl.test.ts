import { describe, it, expect, vi, type Mock } from "vitest";
import { findFuzzyMatch } from "./impl";
import { fuzzy } from "./fuzzy-finder";
import { getFuzzyMatchScore } from "./getScore/getScore";

vi.mock("./normalizeText", () => ({
	default: (text: string) => text.toLowerCase(),
}));

// vi.mock("./getScore/getScore", () => ({
// 	getFuzzyMatchScore: vi.fn(),
// }));

describe("findFuzzyMatch", () => {
	it("should return null if no match is found", () => {
		const result = findFuzzyMatch("hello world", "test");
		expect(result).toBeNull();
	});

	it("should return a match with correct score and matches", () => {
		const result = findFuzzyMatch("hello world", "hello");
		expect(result).toEqual({
			item: "hello world",
			score: 0.5,
			matches: [[[0, 4]]],
		});
	});
});
describe("fuzzy", () => {
	const matches = (
		text: string,
		query: string,
		expectedScore: number,
		expectedIndices: number[][] | null = null,
	) => {
		const options = [text];
		const res = fuzzy(options, { debug: true })(query);
		expect(res).not.toBeNull();
		expect(res).not.toBeUndefined();
		expect(res).not.toBeInstanceOf(Error);
		expect(res).not.toBeInstanceOf(Array);
		// expect(res.length).toBe(1);

		const { results } = res;

		// expect(length).toBe(1);

		const result = results[0];
		console.table(results);
		expect(result.item).toBe(text);
		if (expectedScore != null) {
			expect(result.score).toBeCloseTo(expectedScore);
		}
		if (expectedIndices) {
			expect(result.matches.length).toBe(1);
			expect(result.matches[0]).toEqual(expectedIndices);
		}
	};
	it("can match by: exact match", () => {
		matches("apple", "apple", 0, [[0, 4]]);
		matches("ABC", "ABC", 0);
		matches("ąść", "ąść", 0);
		matches("📚", "📚", 0);
		matches("123¡™£§", "123¡™£§", 0);
		matches("żabki", "żabki", 0);
		matches("ząbki", "ząbki", 0);
		matches("русский язык", "русский язык", 0);
		matches("汉语", "汉语", 0);
		matches("日本語", "日本語", 0);
		matches("한국어", "한국어", 0);
		matches("ภาษาไทย", "ภาษาไทย", 0);
		matches(" he ", " he ", 0);
		matches(" he\n\t", " he\n\t", 0); // hard space
	});

	it("can match by: full match", () => {
		matches("Foo", "foo", 0.1);
		matches("FOO", "foo", 0.1);
		matches("foo", "Foo", 0.1);
		matches("foo", "FOO", 0.1);
		matches(" foo bar", "foo bar", 0.9);
		matches("Żabki", "żabki", 0.1, [[0, 4]]);
		// matches("ZABKI", "żąbki", 0.1);
		// matches("Szczegół", "szczegol", 0.1);
		// matches("Язык", "язык", 0.1, [[0, 3]]);
		matches("foo ", "foo", 0.5, [[0, 2]]);
	});
	// it(`can match by: "Starts with" match`, () => {
	// 	matches("Tomasz Kapelak", "to", 0.5, [[0, 1]]);
	// 	matches("Żabka - oferta", "Żab", 0.5, [[0, 2]]);
	// 	matches("Żabka - oferta", "Zab", 0.5);
	// 	matches("Żabka - oferta", "zab", 0.5);
	// 	matches("Szczegółowe", "szcz", 0.5, [[0, 3]]);
	// 	matches("Русский язык", "рус", 0.5, [[0, 2]]);
	// 	matches("汉语", "汉", 0.5, [[0, 0]]);
	// 	matches("日本語", "日", 0.5, [[0, 0]]);
	// 	matches("ภาษาไทย", "ภ", 0.5, [[0, 0]]);
	// 	matches("There is no icon", "the ", 0.5, [[0, 2]]);
	// });
	// it("can match by: contains query (at word boundary) exactly", () => {
	// 	matches("[N4] Marketing", "Market", 0.9, [[5, 10]]);
	// 	matches("Wypad do Żabki", "Żabk", 0.9);
	// 	matches("русский язык", "язык", 0.9, [[8, 11]]);
	// });
	// it("can match by: contains query (at word boundary)", () => {
	// 	matches("[N4] Marketing", "market", 1, [[5, 10]]);
	// 	matches("Wypad do Żabki", "zabki", 1);
	// 	matches("Myjcie ząbki!!", "zabki", 1, [[7, 11]]);
	// 	matches("Русский Язык", "язык", 1, [[8, 11]]);
	// });
	// it("can match by: contains query (at any position)", () => {
	// 	matches("Marco Couto", "To", 2, [[9, 10]]);
	// 	matches("汉语", "语", 2, [[1, 1]]);
	// 	matches("日本語", "本", 2, [[1, 1]]);
	// 	// TODO: Fix Hangul highlighting
	// 	// matches('한국어', '국', 2, [[1, 1]])
	// 	matches("ภาษาไทย", "า", 2, [[1, 1]]);
	// });
	// it("can match by words (in some order)", () => {
	// 	matches("Setting to disable fuzzy search", "fuzzy setting", 1.9, [
	// 		[0, 6],
	// 		[19, 23],
	// 	]);
	// 	matches(
	// 		"Setting to disable fuzzy search",
	// 		"disable setting fuzzy search",
	// 		2.3,
	// 		[
	// 			[0, 6],
	// 			[11, 17],
	// 			[19, 23],
	// 			[25, 30],
	// 		],
	// 	);
	// 	// matches by words before matching by letters
	// 	matches("Cloak Duck, test clock", "clock test", 1.9, [
	// 		[12, 15],
	// 		[17, 21],
	// 	]);
	// });
	// it("can match by: contains letters awww yisss fuzzzzz", () => {
	// 	// score(of)
	// 	const s = (score) => 2 + score;
	// 	// full word
	// 	const w = 0.2;
	// 	// beginning of word
	// 	const b = 0.4;
	// 	// middle of word
	// 	const m = 0.8;
	// 	// middle of word (1 or 2 chars)
	// 	const ms = 1.6;

	// 	// TODO: Matching diacritics should be scored better
	// 	matches("Wypad do Żabki", "wdż", s(b + ms + b), [
	// 		[0, 0],
	// 		[4, 4],
	// 		[9, 9],
	// 	]);
	// 	matches("Wypad do Żabki", "wdz", s(b + ms + b), [
	// 		[0, 0],
	// 		[4, 4],
	// 		[9, 9],
	// 	]);
	// 	matches("Wypad do Żabki", "wypażab", s(b + b), [
	// 		[0, 3],
	// 		[9, 11],
	// 	]);
	// 	matches("Wypad do Żabki", "wypa żab", s(b + w + b), [
	// 		[0, 3],
	// 		[5, 5],
	// 		[9, 11],
	// 	]);
	// 	matches("Marco Couto", "mc", s(b + ms));
	// 	matches("Marco Couto", "m c", s(b + b));
	// 	matches("Tomasz Kapelak", "tokp", s(b + b + ms));
	// 	// trying to match `Referral` (and not r, e in Marketing) is probably too complex/magic
	// 	matches("[Marketing ] Referral Program", "mrefp", s(ms + ms + ms + ms + b));
	// 	matches("[Marketing ] Referral Program", "m refp", s(ms + w + b + b));
	// 	// matches("Nozbe.com web site", "website");
	// 	matches("Książka 10 steps EN", "10en", s(w + ms + ms));
	// 	// matches("Won’t fix", "wontfix");
	// 	matches("[HR] JavaScript Developer", "jsdev", s(b + ms + b), [
	// 		[5, 5],
	// 		[9, 9],
	// 		[16, 18],
	// 	]);
	// 	matches("MacKay", "mckay", s(b + m));
	// 	matches("Русский Язык", "уски", s(ms + ms));
	// 	matches("Русский Язык", "руя", s(b + b), [
	// 		[0, 1],
	// 		[8, 8],
	// 	]);
	// 	matches("汉语的，又称汉文、華文、唐文", "汉语唐", s(b + ms), [
	// 		[0, 1],
	// 		[12, 12],
	// 	]);
	// 	matches("日本語", "日語", s(b + ms), [
	// 		[0, 0],
	// 		[2, 2],
	// 	]);
	// 	matches("한국어", "한어", s(b + ms));
	// 	// matches('한국어', '한어', 2, [[0, 0], [2, 2]]) // FIXME: Fix highglighting for Hangul
	// });
	// const noMatch = (text, query) => {
	// 	const results = createFuzzySearch([text])(query);
	// 	expect(results.length).toBe(0);
	// };
	// it("can not match everything, okay :(", () => {
	// 	// no stemming
	// 	noMatch("recognition", "recognize");
	// 	noMatch("production", "produce");
	// 	noMatch("żołądź", "żołędzie");
	// 	noMatch("take", "took");
	// 	noMatch("produce", "reproduce");

	// 	// no synonyms/alt spellings
	// 	noMatch("McKay", "MacKay");
	// 	noMatch("mac", "macintosh");
	// 	noMatch("grey", "gray");

	// 	// no soundex
	// 	noMatch("kay", "kai");

	// 	// no substitutions/typo autofix
	// 	noMatch("leters", "letters");
	// 	noMatch("letters", "lettesr");
	// 	noMatch("referral", "referarl");
	// });
	// it("can search by key", () => {
	// 	expect(
	// 		createFuzzySearch([{ t: "foo" }, { t: "foo2" }, { t: "bar" }], {
	// 			key: "t",
	// 		})("foo"),
	// 	).toMatchObject([{ item: { t: "foo" } }, { item: { t: "foo2" } }]);
	// });
	// it("can search by many keys", () => {
	// 	const u1 = { name: "foo1", alias: "fooa1" };
	// 	const u2 = { name: "foo2", alias: "bar" };
	// 	const u3 = { name: "bar", alias: "3foo" };
	// 	const u4 = { name: "bar", alias: "bar" };
	// 	expect(
	// 		createFuzzySearch([u1, u2, u3, u4], {
	// 			getText: (item) => [item.name, item.alias],
	// 		})("foo"),
	// 	).toMatchObject([
	// 		{
	// 			item: u1,
	// 			matches: [[[0, 2]], [[0, 2]]],
	// 		},
	// 		{ item: u2, matches: [[[0, 2]], null] },
	// 		{ item: u3, matches: [null, [[1, 3]]] },
	// 	]);
	// });
	// it("sorts searches by score", () => {
	// 	expect(
	// 		createFuzzySearch([
	// 			"[Marketing] Żabka etc.",
	// 			"Zabawny Katar",
	// 			"Żal Betoniarka",
	// 			"Ząbka",
	// 			"Żabka",
	// 			"Żabowe Karabiny",
	// 			"Żabka - oferta współpracy",
	// 			"żabka",
	// 			"[Marketing] żabka",
	// 		])("żabka"),
	// 	).toMatchObject([
	// 		{ item: "żabka" /* score: 0 */ },
	// 		{ item: "Ząbka" /* score: 0.1 */ },
	// 		{ item: "Żabka" /* score: 0.1 */ },
	// 		{ item: "Żabka - oferta współpracy" /* score: 0.5 */ },
	// 		{ item: "[Marketing] żabka" /* score: 0.9 */ },
	// 		{ item: "[Marketing] Żabka etc." /* score: 1 */ },
	// 		{ item: "Zabawny Katar" /* score: 2 */ },
	// 		{ item: "Żabowe Karabiny" /* score: 2 */ },
	// 		{ item: "Żal Betoniarka" /* score: 3 */ },
	// 	]);
	// });
	// it("sorts searches by score for many keys", () => {
	// 	expect(
	// 		createFuzzySearch(
	// 			[
	// 				{ name: "Matt", alias: "Matthias Obst-Mölinger" },
	// 				{ name: "Marco Couto", alias: null },
	// 				{ name: "Tomasz Kapelak", alias: "Tom" },
	// 				{ name: "tommy" },
	// 				{ name: "Jacob Tom Belinger", alias: "Jake" },
	// 			],
	// 			{
	// 				getText: (item) => [item.name, item.alias],
	// 			},
	// 		)("tom"),
	// 	).toMatchObject([
	// 		{ item: { name: "Tomasz Kapelak", alias: "Tom" } /* score: 0.1 */ },
	// 		{ item: { name: "tommy" } /* score: 0.5 */ },
	// 		{ item: { name: "Jacob Tom Belinger", alias: "Jake" } /* score: 1 */ },
	// 		{
	// 			item: { name: "Matt", alias: "Matthias Obst-Mölinger" } /* score: 3 */,
	// 		},
	// 	]);
	// });
	// it("returns empty array for empty query", () => {
	// 	expect(createFuzzySearch(["a", "b", "c", "d"])("")).toEqual([]);
	// });
	// const matchesNew = (text, query, ...expectedIndices) => {
	// 	const result = experimentalSmartFuzzyMatch(
	// 		normalizeText(text),
	// 		normalizeText(query),
	// 	);
	// 	expect(result).not.toBe(null);
	// 	if (expectedIndices.length) {
	// 		const [, indices] = result;
	// 		expect(indices).toEqual(expectedIndices);
	// 	}
	// };
	// it("experimentalSmartFuzzyMatch", () => {
	// 	matchesNew("Wypad do Żabki", "wdż", [0, 0], [6, 6], [9, 9]);
	// 	matchesNew("Wypad do Żabki", "wdz", [0, 0], [6, 6], [9, 9]);
	// 	matchesNew("Wypad do Żabki", "wypażab", [0, 3], [9, 11]);
	// 	matchesNew("Wypad do Żabki", "wypa żab", [0, 3], [8, 11]);
	// 	matchesNew(
	// 		"Marco Couto",
	// 		"mc",
	// 		[0, 0],
	// 		[3, 3], // NOTE: Ideally would be (6,6), but remaining query is len 1, so [3] matches
	// 	);
	// 	matchesNew("Marco Couto", "m c", [0, 0], [5, 6]);
	// 	matchesNew("Tomasz Kapelak", "tokp", [0, 1], [7, 7], [9, 9]);
	// 	matchesNew(
	// 		"[Marketing ] Referral Program",
	// 		"mrefp",
	// 		[1, 1],
	// 		[13, 15],
	// 		[22, 22],
	// 	);
	// 	matchesNew(
	// 		"[Marketing ] Referral Program",
	// 		"m refp",
	// 		[1, 1],
	// 		[12, 15],
	// 		[22, 22],
	// 	);
	// 	matchesNew("Nozbe.com web site", "website", [10, 12], [14, 17]);
	// 	matchesNew("Książka 10 steps EN", "10en");
	// 	matchesNew("Русский Язык", "усс");
	// 	matchesNew("Русский Язык", "руя");
	// 	matchesNew("汉语的，又称汉文、華文、唐文", "汉语唐");
	// 	matchesNew("日本語", "日語");
	// 	matchesNew("한국어", "한어");

	// 	// new cases
	// 	matchesNew("GH - Growth Hacking", "growha", [0, 0], [6, 8], [12, 13]);
	// });
});
