import { existsSync, readFileSync, writeFileSync } from 'fs'
import { CACHE_FILE_NAME } from '../config'

export function getLatestPostedTweetId(): string | null {
  if (!existsSync(CACHE_FILE_NAME)) {
    return null
  }
  const unformattedJson = readFileSync(CACHE_FILE_NAME)
  const parsedJson = JSON.parse(unformattedJson?.toString())
  return parsedJson?.tweetId
}

export function storePostedTweetId(tweetId: string): void {
  writeFileSync(CACHE_FILE_NAME, JSON.stringify({ tweetId }, null, 2))
}
