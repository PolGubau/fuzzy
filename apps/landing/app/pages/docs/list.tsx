import { Card } from "components/card";
import { List } from "components/util-list/list";
import { dataAccess } from "data/dataAccess";
import type { FuzzyResult } from "data/ff";
import { useState } from "react";
import { Link } from "react-router";
import {
	type CategoryWithAll,
	type Data,
	type Util,
	categories,
} from "~/assets/data.types";
type ListPageProps = {
	data: Data;
};
export const ListPage = (props: ListPageProps) => {
	const [search, setSearch] = useState("");
	const [category, setCategory] = useState<CategoryWithAll>("all");

	const initList: FuzzyResult<Util>[] = props.data.utils.map((util) => {
		return { item: util, score: 0, matches: [] };
	});
	const [data, setData] = useState<FuzzyResult<Util>[]>(initList);

	const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.value) {
			setData(initList);
			setSearch("");
			return;
		}
		const value = e.target.value.toLowerCase();

		handleFilter(value, category);
		setSearch(value);
	};

	const handleFilter = (q: string, category: CategoryWithAll) => {
		const fuzzyResult = dataAccess.filterUtils({
			q,
			category: category,
		});
		setData(fuzzyResult);
	};

	return (
		<section className="flex gap-[10vh] flex-col pt-20 h-full">
			<article className="max-w-2xl w-full mx-auto">
				<Card>
					<nav>
						<Link
							to="/"
							className="hover:underline text-xs gap-4 opacity-60 font-thin"
						>
							&lt; Back to Home
						</Link>
					</nav>
					<h1 className="text-3xl font-bold text-center mb-4">Util List</h1>
					<nav className="grid sm:grid-cols-2 md:grid-cols-[2fr_1fr] gap-4">
						<label htmlFor="query">
							<span className="text-sm">Search</span>
							<input
								type="search"
								value={search}
								className="w-full py-2 px-3 border rounded-lg"
								onChange={onSearch}
								placeholder="Search..."
							/>
						</label>
						<label htmlFor="query">
							<span className="text-sm">Category</span>
							<select
								name="category"
								className="w-full py-2 px-3 bg-black border rounded-lg capitalize"
								value={category}
								onChange={(e) => {
									const value = e.target.value as CategoryWithAll;
									setCategory(value);
									handleFilter(search, value);
								}}
							>
								<option value={"all"}>All</option>

								{categories.map((category) => (
									<option
										className="capitalize"
										key={category}
										value={category}
									>
										{category}
									</option>
								))}
							</select>
						</label>
					</nav>
				</Card>
			</article>

			<article className="w-full max-w-2xl mx-auto ">
				<Card>
					{data.length > 0 ? (
						<List data={data} />
					) : (
						<p className="text-gray-500 text-center">No results found</p>
					)}
					<nav>
						<Link
							to="/"
							className="hover:underline text-xs gap-4 opacity-60 font-thin"
						>
							&lt; Back to Home
						</Link>
					</nav>
				</Card>
			</article>
		</section>
	);
};
