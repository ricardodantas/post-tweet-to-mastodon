import chalk from 'chalk'
import { login } from 'masto'
import { MASTODON_URL, MASTODON_ACCESS_TOKEN } from '../config'
import { isEmpty } from './validator'

export async function postToMastodon(text: string): Promise<void> {
  if (isEmpty(MASTODON_URL)) {
    throw new Error(`The MASTODON_URL is missing in your environment`)
  }
  if (isEmpty(MASTODON_ACCESS_TOKEN)) {
    throw new Error(`The MASTODON_ACCESS_TOKEN is missing in your environment`)
  }

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
