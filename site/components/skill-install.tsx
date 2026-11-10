'use client';

import { Check, Copy } from 'lucide-react';
import Link from 'next/link';
import { useState, type CSSProperties } from 'react';

// Agent ids accepted by `npx skills add -a <id>`.
const agents = [
  { id: null, label: 'All agents', target: 'Claude Code, Codex, Cursor, Gemini CLI, OpenCode and more' },
  { id: 'claude-code', label: 'Claude Code', target: 'Claude Code' },
  { id: 'codex', label: 'Codex', target: 'Codex' },
  { id: 'cursor', label: 'Cursor', target: 'Cursor' },
  { id: 'gemini-cli', label: 'Gemini', target: 'Gemini CLI' },
  { id: 'opencode', label: 'OpenCode', target: 'OpenCode' },
] as const;

const base = 'npx skills add lijnati/web3-guide --skill web3-dapp';

export function SkillInstall() {
  const [selected, setSelected] = useState(0);
  const [touched, setTouched] = useState(false); // typing animation only on first view
  const [copied, setCopied] = useState(false);

  const agent = agents[selected];
  const command = agent.id ? `${base} -a ${agent.id}` : base;

  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard blocked: the command is still selectable.
    }
  }

  const output = [
    { mark: '◇', text: 'Found 1 skill: web3-dapp', tone: 'text-zinc-400' },
    { mark: '●', text: `Installing to ${agent.target}`, tone: 'text-zinc-400' },
    { mark: '✓', text: 'Done. Ask your agent to “start a new dApp”.', tone: 'text-emerald-400' },
  ];

  return (
    <div className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-100 shadow-[0_24px_60px_-30px_var(--ledger)]">
      <div className="flex items-center justify-between gap-3 border-b border-zinc-800 px-4 py-3">
        <p className="text-sm font-medium">Install the agent skill</p>
        <Link
          href="/docs/agent-skill"
          className="text-sm text-zinc-400 underline-offset-4 hover:text-zinc-100 hover:underline focus-visible:outline-2 focus-visible:outline-[var(--ledger)]"
        >
          How it works
        </Link>
      </div>

      <div role="tablist" aria-label="Choose your agent" className="flex gap-1 overflow-x-auto border-b border-zinc-800 px-2 py-2 [scrollbar-width:none]">
        {agents.map((a, i) => (
          <button
            key={a.label}
            type="button"
            role="tab"
            aria-selected={i === selected}
            onClick={() => {
              setSelected(i);
              setTouched(true);
              setCopied(false);
            }}
            className={`shrink-0 rounded-md px-2.5 py-1 text-xs transition-colors focus-visible:outline-2 focus-visible:outline-[var(--ledger)] ${
              i === selected ? 'bg-zinc-800 text-zinc-50' : 'text-zinc-400 hover:text-zinc-100'
            }`}
          >
            {a.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4 p-4 font-mono text-[13px] leading-relaxed">
        <div className="flex items-start gap-3">
          <div className="min-w-0 flex-1 overflow-x-auto [scrollbar-width:none]">
            <code className="whitespace-nowrap">
              <span aria-hidden className="select-none text-[var(--ledger)]">
                ${' '}
              </span>
              {touched ? (
                <span>{command}</span>
              ) : (
                <span
                  className="typing"
                  style={{ '--chars': `${command.length}ch`, '--steps': command.length } as CSSProperties}
                >
                  {command}
                </span>
              )}
              <span aria-hidden className="caret ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-zinc-300" />
            </code>
          </div>
          <button
            type="button"
            onClick={copy}
            aria-label={copied ? 'Copied' : 'Copy command'}
            className="shrink-0 rounded-md border border-zinc-800 p-1.5 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100 focus-visible:outline-2 focus-visible:outline-[var(--ledger)]"
          >
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          </button>
        </div>

        <ul aria-label="What the installer does" className="flex flex-col gap-1">
          {output.map((line, i) => (
            <li
              key={line.mark}
              className={`${touched ? '' : 'reveal'} flex gap-2 ${line.tone}`}
              style={{ '--delay': `${2.1 + i * 0.35}s` } as CSSProperties}
            >
              <span aria-hidden>{line.mark}</span>
              <span className="min-w-0">{line.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
