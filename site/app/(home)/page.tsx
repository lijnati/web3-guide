import Link from 'next/link';
import { SkillInstall } from '@/components/skill-install';

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

const focus = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ledger)]';

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 sm:px-6">
      <section className="grid grid-cols-1 gap-10 pb-16 pt-16 sm:pt-24 lg:grid-cols-[1.15fr_1fr] lg:items-center">
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
        <SkillInstall />
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

      <footer className="flex flex-col gap-2 border-t py-8 text-sm text-fd-muted-foreground sm:flex-row sm:justify-between">
        <span>
          CSEC ASTU Blockchain Team. Written for Hardhat 3, Solidity 0.8.28, viem 2, wagmi 3 and
          Next.js 16.
        </span>
        <Link href="/docs/setup" className={`hover:text-fd-foreground ${focus}`}>
          Set up your machine
        </Link>
      </footer>
    </main>
  );
}
