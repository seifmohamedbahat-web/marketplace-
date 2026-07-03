# Growth Autopilot

An AI agent pipeline that runs Global Market's growth workflow — **research →
content → leads → outreach** — end to end in Claude Code, with each stage
handing off to the next automatically. No Make.com, no Zapier, no separate
hosting: it runs on the Claude Code session you already have open, using the
same MCP connectors (Apollo.io, Clay, Gmail) already available to it.

## Why this instead of a no-code scenario builder

A Make.com/n8n scenario needs its own account, its own copy of your API keys,
and a webhook or polling trigger to kick it off. This pipeline needs none of
that: Claude Code is the runtime, its subagents are the workflow steps, and a
markdown file is the handoff between them. You invoke it the same way you'd
ask a person to do the work — by describing the topic.

## Exact setup

1. Nothing to install. `.claude/agents/*.md` and `.claude/skills/growth-autopilot/`
   are already committed to this repo — Claude Code loads them automatically
   for any session opened on this repo.
2. Connect the accounts the later stages use (one-time, per Claude Code
   account, not per run):
   - **Apollo.io** and/or **Clay** — for `lead-scout`'s search/enrichment.
   - **Gmail** — for `outreach-drafter`'s drafts.
   `market-research` and `content-writer` need no connectors — they use
   built-in web search and the repo's own brand/design system.
3. Run it: `/growth-autopilot <category or topic>`, e.g.
   `/growth-autopilot Handmade Gifts`.

## The four agents and their handoff

```
market-research  →  growth/<slug>/01-research.md
      │  (demand signals, competitor angles, seller hooks, content angles)
      ▼
content-writer   →  growth/<slug>/02-content.md
      │  (announcement blurb, social captions, seller pitch, newsletter)
      ▼
lead-scout       →  growth/<slug>/03-leads.md
      │  (Apollo/Clay search+enrich only — read-only, no writes to your CRM)
      ▼
outreach-drafter →  growth/<slug>/04-outreach.md  +  real Gmail drafts
         (never sends — drafts sit in Gmail for you to review)
```

Each agent is defined in `.claude/agents/` with its own restricted tool list
(see each file's frontmatter) — `market-research` can only search the web,
`lead-scout` can only *search and enrich*, never create/update/send, and
`outreach-drafter` has no send capability at all. The orchestration logic
lives in `.claude/skills/growth-autopilot/SKILL.md`.

The handoff is file-based on purpose: subagents don't share memory, so every
stage reads the previous stage's file from `growth/<slug>/` instead of relying
on conversation context. That also means any stage can be re-run on its own
once its input file exists — e.g. edit `03-leads.md` by hand and re-run just
`outreach-drafter`.

## Safety notes

- `lead-scout` only has read-only search/enrichment tools — it cannot create
  or modify anything in Apollo/Clay.
- `outreach-drafter` only has `create_draft`/`list_drafts` — there is no send
  tool wired in, by design. You always review and send drafts yourself.
- The lead and outreach stages touch real, live accounts (API credits, a real
  inbox). The skill pauses to confirm before running those two stages unless
  you've already told it to run unattended.
