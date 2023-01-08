import * as dotenv from 'dotenv'
dotenv.config()

import chalk from 'chalk'
import { getLatestPostedTweetId, storePostedTweetId } from './libs/cache'
import { postToMastodon } from './libs/mastodon'
import { fetchLatestTweet } from './libs/twitter'

async function main(): Promise<void> {
  const latestPostedTweet = getLatestPostedTweetId()
  const latestFetchedTweet = await fetchLatestTweet()
  if (!latestFetchedTweet) {
    console.log(chalk.yellow('Skipping tweet once it is a reply or a retweet.'))
    return
  }

  const { tweet, tweetId } = latestFetchedTweet
  if (latestPostedTweet && latestPostedTweet === tweetId) {
    console.log(chalk.yellow('Skipping tweet once it was already posted.'))
    return
  }
  await postToMastodon(tweet)
  storePostedTweetId(tweetId)
}

;(async () => {
  try {
    main()
  } catch (error: any) {
    console.error(chalk.red(error.message))
  }
})()
