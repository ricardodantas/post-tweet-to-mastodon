import * as dotenv from 'dotenv'
dotenv.config()

import chalk from 'chalk'
import { getLatestPostedTweetId, storePostedTweetId } from './libs/cache'
import { postToMastodon } from './libs/mastodon'
import { fetchLatestTweet } from './libs/twitter'

async function main(): Promise<void> {
  const latestPostedTweet = getLatestPostedTweetId()
  const { tweet, tweetId } = await fetchLatestTweet()
  if (latestPostedTweet && latestPostedTweet === tweetId) {
    console.log(chalk.yellow('Skipping this tweet once it was already posted.'))
    return
  }
  await postToMastodon(tweet)
  storePostedTweetId(tweetId)
}

;(async () => {
  main()
})()
