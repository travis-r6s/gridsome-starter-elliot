# Elliot Starter for Gridsome

A headless Ecommerce starter for Gridsome, using [Elliot](https://elliot.store).

This uses the Elliot source plugin ([`gridsome-source-elliot`](https://https://gridsome.org/plugins/gridsome-source-elliot)) to fetch data from Elliot, and download images for use with `g-image`.

Elliot provides checkout & order API's to allow you a completely customised checkout experience, and this starter makes use of those. [See it in action](https://gridsome.org/plugins/gridsome-source-elliot)!

## Elliot Setup

You will need your Elliot keys to get started - follow the steps below to do so:

1. Login to Elliot Admin
2. Choose a Domain Space
3. Click on 'Get Headless' under the Developers section
4. Choose an Experience, and click 'Copy Variables to Continue'

It is recommended to add these to a .env file at the root of your project, as these are secret keys, and should NOT be exposed or included in a git repository etc.

## Installation

Install the Gridsome CLI.

```bash
npm install -g @gridsome/cli # or
yarn global add @gridsome/cli
```

## Create Project

You can either directly download this repository, or use Gridsome's CLI to download and install dependencies for you.

```bash
# Clone repository
git clone https://github.com/thetre97/gridsome-starter-elliot.git
npm install # or
yarn install

# Download with CLI
gridsome create my-gridsome-site thetre97/gridsome-starter-elliot
```

## Developing

Once you have your Elliot API keys (follow the steps above), add them to a `.env` file in the project root.

`.env`
```bash
ELLIOT_KEYS="<paste variable string here>"
```

You can edit the source plugin options under `gridsome.config.js` if needed.

Run `gridsome develop` in the project root to start the local development server.


Take it away! The sky is the limit.
