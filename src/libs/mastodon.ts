import chalk from 'chalk'
import { login } from 'masto'
import { MASTODON_URL, MASTODON_ACCESS_TOKEN } from '../config'

export async function postToMastodon(text: string): Promise<void> {
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
