---
name: growth-autopilot
description: Runs the full Global Market growth pipeline on autopilot — research a category, draft on-brand content, find matching seller leads, and draft personalized outreach emails. Use when the user wants to grow Global Market's seller base or produce a content push for a category, and wants it done end-to-end without babysitting each step.
---

# Growth autopilot

This chains four purpose-built subagents (defined in `.claude/agents/`), each
handing its output to the next as a file under `growth/<slug>/`. You are the
orchestrator: run each stage with the `Agent` tool in the foreground (each
stage needs the previous stage's file to exist before it can start), and stop
to ask the user before any stage that touches a real external account if they
haven't already confirmed it's fine for this run.

## Input

Take `args` as the topic — either one of Global Market's six categories
(Fashion, Home Decor, Jewelry, Art, Handmade Gifts, Tech Accessories) or a
specific growth question. If no args given, ask the user which category/topic
to run.

Compute `slug` = kebab-case of the topic, e.g. "Handmade Gifts" → `handmade-gifts`.

## Pipeline

1. **Research** — `Agent({ subagent_type: "market-research", run_in_background: false, description: "Research <topic>", prompt: "Research <topic> for Global Market and write growth/<slug>/01-research.md as instructed." })`

2. **Content** — after step 1 succeeds, `Agent({ subagent_type: "content-writer", run_in_background: false, description: "Draft content for <topic>", prompt: "Read growth/<slug>/01-research.md and write growth/<slug>/02-content.md as instructed." })`

3. **Leads** — this stage calls live Apollo.io/Clay search APIs (real account, uses API credits, read-only). If the user hasn't already told you to run the full pipeline unattended, confirm with them before this step. Then: `Agent({ subagent_type: "lead-scout", run_in_background: false, description: "Find leads for <topic>", prompt: "Read growth/<slug>/02-content.md and write growth/<slug>/03-leads.md as instructed." })`

4. **Outreach** — this stage creates real Gmail drafts in the user's connected account (no send, but it does write to their real inbox). Confirm with the user before this step the same way as step 3. Then: `Agent({ subagent_type: "outreach-drafter", run_in_background: false, description: "Draft outreach for <topic>", prompt: "Read growth/<slug>/02-content.md and growth/<slug>/03-leads.md and create Gmail drafts plus growth/<slug>/04-outreach.md as instructed." })`

## Handoff mechanism

There is no shared memory between these subagents — each one starts cold.
The handoff is entirely the `growth/<slug>/*.md` files: every stage's prompt
must include the exact file path(s) to read. This is deliberate — it makes
every stage's input inspectable and re-runnable independently (e.g. re-run
just outreach-drafter after manually editing 03-leads.md).

## After the pipeline

Report to the user: the four file paths produced, how many leads were found,
how many outreach drafts were created, and remind them the drafts are
waiting in Gmail for their review — nothing gets sent automatically.
