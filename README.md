# Miniflare Example Project

This is an example [Cloudflare Workers](https://workers.cloudflare.com/) project that uses [Miniflare](https://github.com/cloudflare/miniflare) for local development, [TypeScript](https://www.typescriptlang.org/), [esbuild](https://github.com/evanw/esbuild) for bundling, and [Jest](https://jestjs.io/) for testing, with [Miniflare's custom Jest environment](https://miniflare.dev/testing/jest).

```shell
# Install dependencies
$ npm install
# Start local development server with live reload
$ npm run dev
# Start remote development server using wrangler
$ npm run dev:remote
# Run tests
$ npm test
# Run type checking
$ npm run types:check
# Deploy using wrangler
$ npm run deploy
```
