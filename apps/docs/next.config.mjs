/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
  trailingSlash: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  transpilePackages: ['appshell-react'],
  images: { unoptimized: true },
};

export default config;
