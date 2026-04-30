import 'server-only'
import { S3Client } from '@aws-sdk/client-s3'

const region = process.env.AWS_REGION
const bucket = process.env.AWS_S3_BUCKET
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

if (!region || !bucket) {
  console.warn(
    '[media] AWS_REGION or AWS_S3_BUCKET is not set. Media uploads will fail until configured.',
  )
}

export const S3_BUCKET = bucket ?? ''
export const S3_REGION = region ?? ''

export const s3 = new S3Client({
  region: region ?? 'us-east-1',
  credentials: accessKeyId && secretAccessKey ? { accessKeyId, secretAccessKey } : undefined,
})

export function assertS3Configured() {
  if (!S3_BUCKET || !S3_REGION) {
    throw new Error('AWS_S3_BUCKET and AWS_REGION must be set in environment variables')
  }
}

export function publicUrlFor(key: string) {
  return `https://${S3_BUCKET}.s3.${S3_REGION}.amazonaws.com/${encodeS3Key(key)}`
}

function encodeS3Key(key: string) {
  return key.split('/').map(encodeURIComponent).join('/')
}
