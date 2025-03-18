import type { PropsWithChildren } from "react";

export const Card = (props: PropsWithChildren) => {
	return (
		<div className="flex flex-col gap-6 backdrop-blur-md p-4 md:p-6 rounded-3xl bg-gradient-to-b from-[#00000000] to-[#00000099] animate-blur">
			{props.children}
		</div>
	);
};
