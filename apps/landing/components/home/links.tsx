import { Link } from "react-router";

export const Links = () => {
	return (
		<div className="flex justify-center text-sm gap-4 opacity-80">
			<Link
				to="/docs"
				className="hover:underline text-center bg-neutral-500/20 w-fit py-2 px-4 rounded-xl flex items-center gap-2"
			>
				<span>Go to Docs</span>
				<span>&#8599;</span>
			</Link>
			<Link
				target="_blank"
				rel="noopener noreferrer"
				to="https://github.com/PolGubau/utils"
				className="hover:underline text-center w-fit py-2 px-4 rounded-xl"
			>
				Github
			</Link>
		</div>
	);
};
