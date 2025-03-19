# Open Smart-Controller UI

An open-source alternative web-based interface for interacting with you iungo smart-controller.

![MIT Licence](https://img.shields.io/github/license/JesseKoldewijn/open-smart-controller-ui?cacheSeconds=300)

## Acknowledgements

- [Official iungo website](https://iungo.nl)

## Installation

WIP

## Support

For support, please don't reach out to the iungo team themselves but rather create an issue on this repo. This is an unofficial alternative to the iungo web-ui which means that this is maintained by me and not by the iungo team.

## FAQ

#### Is this an official iungo product?

No, this implementation is fully based on the publically available api spec by analysing the usage of a variaty of methods within the official web-ui.

#### Who is this UI for?

You'll need a iungo Smart-Controller in your network to use this application. So as long as you have that going for you, all should be good!

## Tech Stack

**Client:** Preact, RadixUI, TailwindCSS

**Server:** Call go directly to your local iungo controller, so no server required! Yay!

## Run Locally

Clone the project

```bash
  git clone git@github.com:JesseKoldewijn/open-smart-controller-ui.git
```

Go to the project directory

```bash
  cd open-smart-controller-ui
```

Install dependencies

```bash
  pnpm install
```

Start the server

```bash
  pnpm run dev
```
