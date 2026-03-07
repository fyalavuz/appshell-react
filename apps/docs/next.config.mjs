import nextra from 'nextra'

const withNextra = nextra({
  contentDirBasePath: '/docs'
})

/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  transpilePackages: ['appshell-react'],
  images: { unoptimized: true },
}

export default withNextra(config)
