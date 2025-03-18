import {
	type RouteConfig,
	index,
	layout,
	prefix,
	route,
} from "@react-router/dev/routes";
const paths = {
	docs: "./routes/docs",
};
export default [
	layout("./layouts/LandingLayout.tsx", [
		index("routes/home.tsx"),
		...prefix("docs", [
			index(`${paths.docs}/list.tsx`),
			route(":util", `${paths.docs}/details.tsx`),
		]),
	]),
] satisfies RouteConfig;
