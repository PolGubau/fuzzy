import { useState } from "react";

export const Api = () => {
	const [search, setSearch] = useState("");
	return (
		<div>
			<h2>Everything you need to know</h2>
			<p>
				Here you have a list of all the current available functions and modules.
				<br />
			</p>
			<input
				type="search"
				value={search}
				className="w-full py-2 px-3 border rounded-lg"
				onChange={(e) => setSearch(e.target.value)}
				placeholder="Search..."
			/>
		</div>
	);
};
