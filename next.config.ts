import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  // TODO: this gets around the 2mb cache limit for fetch requests
  // https://github.com/shadcn-ui/ui/issues/5557#issuecomment-2436149051
  cacheHandler: require.resolve(
    'next/dist/server/lib/incremental-cache/file-system-cache.js',
  ),
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
