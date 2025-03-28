import type { FuzzySearchResponse, Result } from "../types";

export class FuzzySearcherBuilder<T> {
	private results: Array<Result<T>>;
	private time: number;
	private normalizedQuery: string;

	constructor({
		results = [],
		startTime = Date.now(),
		endTime = Date.now(),
		normalizedQuery = "",
	}: {
		results?: Array<Result<T>>;
		startTime?: number;
		endTime?: number;
		normalizedQuery?: string;
	}) {
		this.time = endTime - startTime;
		this.results = results;
		this.normalizedQuery = normalizedQuery;
	}

	public build(): FuzzySearchResponse<T> {
		return {
			results: this.results,
			length: this.results.length,
			time: this.time,
			normalizedQuery: this.normalizedQuery,
			hasExactMatch:
				this.results.filter((result) => result.score === 0).length > 0,
			bestMatch: this.results[0] ?? null,
			hasResults: this.results.length > 0,
		};
	}
}
