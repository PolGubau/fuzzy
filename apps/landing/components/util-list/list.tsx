import type { FuzzyResult } from "data/ff";
import type { Util } from "~/assets/data.types";
import { Item } from "./item";
type ListProps = {
	data: FuzzyResult<Util>[];
};
export const List = (props: ListProps) => {
	const { data } = props;
	return (
		<ul className="flex flex-col gap-2 w-full divide-y divide-neutral-500/20 md:min-w-md">
			{data.map((d) => {
				return (
					<li key={d.item.name}>
						<Item data={d} />
					</li>
				);
			})}
		</ul>
	);
};
