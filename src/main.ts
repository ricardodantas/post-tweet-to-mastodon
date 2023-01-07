import Twit from 'twit'
import { login } from 'masto'
import * as dotenv from 'dotenv'
import { writeFileSync, readFileSync, existsSync } from 'fs'
import chalk from 'chalk'
dotenv.config()

import {
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET,
  TWITTER_ACCESS_TOKEN_KEY,
  TWITTER_ACCESS_TOKEN_SECRET,
  MASTODON_URL,
  MASTODON_ACCESS_TOKEN,
  CACHE_FILE_NAME,
} from './config'

async function fetchLatestTweet() {
  const client = new Twit({
    consumer_key: TWITTER_CONSUMER_KEY,
    consumer_secret: TWITTER_CONSUMER_SECRET,
    access_token: TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: TWITTER_ACCESS_TOKEN_SECRET,
  })

  const params = { count: 1, tweet_mode: 'extended' }

  const { data } = await client.get('statuses/user_timeline', params)
  const tweet = (data as any)[0].full_text
  const tweetId = (data as any)[0].id_str
  console.log(chalk.blue(`Tweet fetched: ${tweet}`))
  return { tweetId, tweet }
}

async function postToMastodon(text: string) {
  const masto = await login({
    url: MASTODON_URL,
    accessToken: MASTODON_ACCESS_TOKEN,
  })

  await masto.v1.statuses.create({
    status: text,
    visibility: 'public',
  })
  console.log(chalk.green('Tweet posted to Mastodon successfully!'))
}

function getLatestPostedTweetId(): string | null {
  if (!existsSync(CACHE_FILE_NAME)) {
    return null
  }
  const unformattedJson = readFileSync(CACHE_FILE_NAME)
  const parsedJson = JSON.parse(unformattedJson?.toString())
  return parsedJson?.tweetId
}

function storePostedTweetId(tweetId: string) {
  writeFileSync(CACHE_FILE_NAME, JSON.stringify({ tweetId }, null, 2))
}

async function main() {
  const latestPostedTweet = getLatestPostedTweetId()
  const { tweet, tweetId } = await fetchLatestTweet()
  if (latestPostedTweet === tweetId) {
    console.log(chalk.yellow('Skipping this tweet once it was already posted.'))
    return
  }
  await postToMastodon(tweet)
  storePostedTweetId(tweetId)
}

main()
