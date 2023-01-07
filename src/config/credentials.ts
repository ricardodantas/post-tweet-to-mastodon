/**
 * How to get you Twitter credentials:
 * 1. Access https://developer.twitter.com/en/portal/projects-and-apps
 * 2. Create a new project and app
 * 3. Fill the form and submit
 * 4. After submitting the form you will see the generated consumer and authentication credentials.
 */
export const TWITTER_CONSUMER_KEY = process.env['TWITTER_CONSUMER_KEY'] ?? ''
export const TWITTER_CONSUMER_SECRET =
  process.env['TWITTER_CONSUMER_SECRET'] ?? ''
export const TWITTER_ACCESS_TOKEN_KEY =
  process.env['TWITTER_ACCESS_TOKEN_KEY'] ?? ''
export const TWITTER_ACCESS_TOKEN_SECRET =
  process.env['TWITTER_ACCESS_TOKEN_SECRET'] ?? ''

/**
 * How to get your Mastodon credentials:
 * 1. Access https://YOUR_SERVER_URL/settings/applications/new
 * 2. Fill the form and submit
 * 3. After submitting the form you will see the generated access token.
 */
export const MASTODON_ACCESS_TOKEN = process.env['MASTODON_ACCESS_TOKEN'] ?? ''
export const MASTODON_URL = process.env['MASTODON_URL'] ?? ''
