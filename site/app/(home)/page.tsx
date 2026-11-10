import Link from 'next/link';
import { CopyCommand } from '@/components/copy-command';

const blocks = [
  { href: '/docs/guide/plan', title: 'Plan', body: 'Decide what belongs on-chain and design the contract’s functions.' },
  { href: '/docs/guide/contracts', title: 'Write contracts', body: 'Set up Hardhat 3 and write Solidity with events and custom errors.' },
  { href: '/docs/guide/testing', title: 'Test', body: 'Cover every rule with node:test and viem before spending gas.' },
  { href: '/docs/guide/deploy', title: 'Deploy', body: 'Ship with Ignition, locally first, then to Sepolia.' },
  { href: '/docs/guide/frontend', title: 'Frontend', body: 'Wire Next.js to your ABI and address with wagmi.' },
  { href: '/docs/guide/wallet', title: 'Wallet', body: 'Connect MetaMask, avoid hydration errors, switch chains.' },
  { href: '/docs/guide/read-write', title: 'Read & write', body: 'Track transactions to confirmation and explain every error.' },
  { href: '/docs/guide/ship', title: 'Ship', body: 'Build for production and go live on Vercel.' },
];

// Deterministic short "hash" per step, so each block can point at its parent.
function shortHash(seed: string) {
  let h = 0x811c9dc5;
  for (const c of seed) h = Math.imul(h ^ c.charCodeAt(0), 0x01000193) >>> 0;
  return `0x${h.toString(16).padStart(8, '0').slice(0, 6)}`;
}

const chain = blocks.map((b, i) => ({
  ...b,
  height: i + 1,
  hash: shortHash(b.title),
  parent: i === 0 ? '0x000000' : shortHash(blocks[i - 1].title),
}));

const agents = ['Claude Code', 'Codex', 'Cursor', 'GitHub Copilot', 'Gemini CLI', 'Windsurf', 'OpenCode', 'Cline'];

const focus = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ledger)]';

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 sm:px-6">
      <section className="grid grid-cols-1 gap-8 pb-16 pt-16 sm:pt-24 lg:grid-cols-[1.4fr_1fr] lg:items-end">
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-6xl">
            Build your own dApp on Ethereum, from first contract to live site.
          </h1>
          <p className="max-w-[60ch] text-lg text-fd-muted-foreground text-pretty">
            A practical guide for Web2 developers. Design a smart contract, test it, deploy it to
            Sepolia, and connect a Next.js frontend that handles wallets, transactions and errors
            properly.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/docs/concepts"
              className={`rounded-lg bg-fd-primary px-4 py-2.5 text-sm font-medium text-fd-primary-foreground transition-opacity hover:opacity-90 ${focus}`}
            >
              Start with the basics
            </Link>
            <Link
              href="/docs/guide/plan"
              className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-fd-accent ${focus}`}
            >
              Go straight to building
            </Link>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-fd-muted-foreground lg:border-l lg:pl-6">
          Written against Hardhat 3, Solidity 0.8.28, viem 2, wagmi 3 and Next.js 16. Every command
          and code sample was run before it was published.
        </p>
      </section>

      <section aria-labelledby="chain-title" className="border-t py-16">
        <div className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <h2 id="chain-title" className="text-2xl font-semibold tracking-tight">
            Eight blocks from idea to live dApp
          </h2>
          <p className="text-sm text-fd-muted-foreground">Each block builds on the one before it.</p>
        </div>

        <ol className="grid gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          {chain.map((block) => (
            <li key={block.href} className="relative">
              <Link
                href={block.href}
                className={`group flex h-full flex-col gap-3 rounded-md border bg-fd-card p-4 transition-colors hover:border-[var(--ledger)] ${focus}`}
              >
                <span className="flex items-center justify-between font-mono text-xs text-fd-muted-foreground">
                  <span>
                    block <span className="text-fd-foreground">#{block.height}</span>
                  </span>
                  <span className="text-[var(--ledger)]">{block.hash}</span>
                </span>
                <span className="text-base font-medium group-hover:text-[var(--ledger)]">{block.title}</span>
                <span className="text-sm text-fd-muted-foreground">{block.body}</span>
                <span className="mt-auto border-t border-dashed pt-3 font-mono text-xs text-fd-muted-foreground">
                  parent <span className="text-[var(--ledger)]">{block.parent}</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section
        aria-labelledby="skill-title"
        className="grid grid-cols-1 gap-8 border-t py-16 lg:grid-cols-[1fr_1.2fr] lg:items-center"
      >
        <div className="flex flex-col gap-4">
          <h2 id="skill-title" className="text-2xl font-semibold tracking-tight">
            Let your coding agent start the project
          </h2>
          <p className="max-w-[56ch] text-fd-muted-foreground">
            The web3-dapp skill teaches your agent this guide’s setup. It scaffolds the Hardhat and
            Next.js projects, writes and tests your contract, and wires up the wallet. Sepolia keys
            stay with you.
          </p>
          <Link
            href="/docs/agent-skill"
            className={`w-fit text-sm font-medium text-[var(--ledger)] underline-offset-4 hover:underline ${focus}`}
          >
            How the skill works
          </Link>
        </div>
        <div className="flex flex-col gap-3 rounded-xl bg-[var(--ledger-soft)] p-4 sm:p-6">
          <CopyCommand command="npx skills add lijnati/web3-guide --skill web3-dapp" />
          <p className="text-sm text-fd-muted-foreground">
            Works with {agents.slice(0, -1).join(', ')} and {agents.at(-1)}, plus other agents that
            support skills.
          </p>
        </div>
      </section>

      <footer className="flex flex-col gap-2 border-t py-8 text-sm text-fd-muted-foreground sm:flex-row sm:justify-between">
        <span>CSEC ASTU Blockchain Team</span>
        <Link href="/docs/setup" className={`hover:text-fd-foreground ${focus}`}>
          Set up your machine
        </Link>
      </footer>
    </main>
  );
}
