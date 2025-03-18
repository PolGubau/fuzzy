import type { Config } from "@react-router/dev/config";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
  async prerender(args) {
    const staticPaths = args.getStaticPaths();
    // This will prerender all routes
    return staticPaths.map((route) => route);
  },
} satisfies Config;
