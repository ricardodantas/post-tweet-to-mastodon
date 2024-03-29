# Post tweet to Mastodon

[![Build](https://github.com/ricardodantas/post-tweet-to-mastodon/actions/workflows/build.yml/badge.svg)](https://github.com/ricardodantas/post-tweet-to-mastodon/actions/workflows/build.yml) [![CodeQL](https://github.com/ricardodantas/post-tweet-to-mastodon/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/ricardodantas/post-tweet-to-mastodon/actions/workflows/github-code-scanning/codeql)

Stop worrying about sharing your Twitter and Mastodon credentials with unknown websites with this simple and safe Typescript script you can easly repost your tweets to your Mastodon account.

## How it works

Once you settle your Mastodon and Twitter credentials on your Github Actions secret settings:

1. The script will run every five minutes (thanks to Github Actions) and fetch the latest tweet from your account; 
2. Then it will check if it is a retweet or a reply to someone;
3. If the tweet is neither of those it will automaticaly post to your Mastodon account;
4. Then it will store the id of that reposted tweet to a cache file that will be upload to the Github Actions artifact. So next time the script check for a new tweet, it will also make sure that the same tweet will not be posted again.


## How to use

1. [Fork this repo](https://github.com/ricardodantas/post-tweet-to-mastodon/fork)
2. Add the Twitter and Mastodon [credentials](https://github.com/ricardodantas/post-tweet-to-mastodon/blob/master/src/config/credentials.ts) to the Github Action secrets
3. Done!

## Sponsor

Help to maintain this project and become a sponsor on [Github Sponsors](https://github.com/sponsors/ricardodantas), [Ko-fi](https://ko-fi.com/ricardodantas), or [Buy Me A Coffee](https://www.buymeacoffee.com/ricardodantas)! 🎉 You can get your company logo, link & name on this file.

## Contributing

### Before you begin

- This project is powered by Node.js/Typescript and Github Actions. Check to see if you're on the Nodejs version >= 18.x.

- Check out the [existing issues](<https://github.com/ricardodantas/post-tweet-to-mastodon/issues>).

In time, we'll tag issues that would make a good first pull request for new contributors. An easy way to get started helping the project is to _file an issue_. You can do that on the issues page by clicking on the green button at the right. Issues can include bugs to fix, features to add, or documentation that looks outdated.

### Contributions

Contributions to this project should be made in the form of GitHub pull requests. Each pull request will
be reviewed by a core contributor (someone with permission to land patches) and either landed in the
main tree or given feedback for changes that would be required.

### Pull Request Checklist

- Branch from the master branch and, if needed, rebase to the current master
  branch before submitting your pull request. If it doesn't merge cleanly with
  master you may be asked to rebase your changes.

- Commits should be as small as possible, while ensuring that each commit is
  correct independently (i.e., each commit should compile and pass tests).

- Don't put submodule updates in your pull request unless they are to landed
  commits.

- If your patch is not getting reviewed or you need a specific person to review
  it, you can @-reply a reviewer asking for a review in the pull request or a
  comment.

- Add tests relevant to the fixed bug or new feature.

## Author

Ricardo Dantas Gonçalves | [@ricardodantas on Twitter](https://twitter.com/ricardodantas) | [@ricardodantas on Mastodon](https://fosstodon.org/@ricardodantas)

## License

MIT, see [LICENSE](LICENSE)
