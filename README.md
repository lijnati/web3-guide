# CSEC Blockchain Web3 Guide

A guide for the CSEC ASTU Blockchain Team to designing, building, testing and deploying your own dApp with Hardhat 3, Solidity, viem, wagmi and Next.js.

| Folder | What it is |
| --- | --- |
| [`site/`](site) | The documentation site (Fumadocs on Next.js); content lives in `site/content/docs` |
| [`skills/web3-dapp/`](skills/web3-dapp) | An agent skill that scaffolds a dApp following the guide |

## Agent skill

```bash
npx skills add lijnati/web3-guide --skill web3-dapp
```

This works with Claude Code, Codex, Cursor, GitHub Copilot, Gemini CLI, Windsurf, OpenCode, Cline and other agents that support skills. See the "Agent skill" page in the guide.

## Run the site locally

```bash
cd site
npm install
npm run dev        # http://localhost:3000
```

Checks: `npm run types:check`, `npm run lint`, `npm run build`.

## Deploy

Import the repository on Vercel and set **Root Directory** to `site`. No environment variables are required.
