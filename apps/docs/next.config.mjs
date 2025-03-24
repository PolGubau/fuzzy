import { createMDX } from 'fumadocs-mdx/next';
 
const config = {
  reactStrictMode: true,
  serverExternalPackages: ['twoslash'],
};
 
const withMDX = createMDX();
 
export default withMDX(config);