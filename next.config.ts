import type { NextConfig } from 'next'

const bucket = process.env.AWS_S3_BUCKET
const region = process.env.AWS_REGION

const remotePatterns: NonNullable<NextConfig['images']>['remotePatterns'] = []

if (bucket && region) {
  remotePatterns.push(
    {
      protocol: 'https',
      hostname: `${bucket}.s3.${region}.amazonaws.com`,
      pathname: '/**',
    },
    {
      protocol: 'https',
      hostname: `${bucket}.s3.amazonaws.com`,
      pathname: '/**',
    },
    {
      protocol: 'https',
      hostname: `s3.${region}.amazonaws.com`,
      pathname: `/${bucket}/**`,
    },
  )
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns,
  },
}

export default nextConfig
