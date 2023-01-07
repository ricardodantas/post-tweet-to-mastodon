import chalk from 'chalk'
import Twit from 'twit'
import {
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET,
  TWITTER_ACCESS_TOKEN_KEY,
  TWITTER_ACCESS_TOKEN_SECRET,
} from '../config'

type FetchTweetResponse = {
  tweetId: string
  tweet: string
}

export async function fetchLatestTweet(): Promise<FetchTweetResponse> {
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
