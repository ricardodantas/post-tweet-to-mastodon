import chalk from 'chalk'
import Twit from 'twit'
import {
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET,
  TWITTER_ACCESS_TOKEN_KEY,
  TWITTER_ACCESS_TOKEN_SECRET,
} from '../config'
import { isEmpty } from './validator'

type FetchTweetResponse = {
  tweetId: string
  tweet: string
}

type TweetEntitiesUrls = {
  url: string
  expanded_url: string
  display_url: string
  indices: number[]
}

function expandUrls(urls: TweetEntitiesUrls[], text: string): string {
  let modifiedMessage = `${text}`
  for (const item of urls) {
    modifiedMessage = text.replace(item.url, item.expanded_url)
  }
  return modifiedMessage
}

export async function fetchLatestTweet(): Promise<FetchTweetResponse | void> {
  if (isEmpty(TWITTER_CONSUMER_KEY)) {
    throw new Error(`The TWITTER_CONSUMER_KEY is missing in your environment`)
  }
  if (isEmpty(TWITTER_CONSUMER_SECRET)) {
    throw new Error(
      `The TWITTER_CONSUMER_SECRET is missing in your environment`,
    )
  }
  if (isEmpty(TWITTER_ACCESS_TOKEN_KEY)) {
    throw new Error(
      `The TWITTER_ACCESS_TOKEN_KEY is missing in your environment`,
    )
  }
  if (isEmpty(TWITTER_ACCESS_TOKEN_SECRET)) {
    throw new Error(
      `The TWITTER_ACCESS_TOKEN_SECRET is missing in your environment`,
    )
  }

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
  const isRetweet = (data as any)[0].retweeted
  const inReplyToStatusId = (data as any)[0].in_reply_to_status_id
  const urls: TweetEntitiesUrls[] = (data as any)[0]?.entities?.urls
  if (isRetweet || inReplyToStatusId) {
    return
  }
  const modifiedTweet = expandUrls(urls, tweet)
  return { tweetId, tweet: modifiedTweet }
}
