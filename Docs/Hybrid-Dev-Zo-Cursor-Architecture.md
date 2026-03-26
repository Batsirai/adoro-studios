# Hybrid Dev Stack: Zo + Cursor — Architecture Doc
> **Purpose:** Reference architecture for a split development workflow where Batsirai works locally in Cursor and Zo operates as the always-on orchestrator, fixer, and monitoring layer.
> **Scope:** AlreadyLoved (primary repo)
> **Status:** Planning — not yet implemented
> **Last Updated:** 2026-03-20

---

## 1. Concept & Vision

Batsirai works primarily in **Cursor** (local, creative/active coding), with **Zo** running as the background infrastructure brain — polling task queues, monitoring CI/CD, investigating failures, and stepping in as an "emergency fixer" when things break or need fast investigation.

Zo doesn't replace Cursor. Zo augments it. Think of Zo as a senior dev who's always on call, never sleeps, and can be handed a problem instantly via Telegram.

---

## 2. Division of Labor

| Layer | Tool | Responsibility |
|---|---|---|
| **Active coding** | Cursor (local) | PR reviews, feature work, debugging, running repo locally |
| **Orchestration** | Zo Agents | Polling Linear, assigning tasks, tracking state machine |
| **Monitoring** | Zo Agents | Watching GitHub Actions, CI/CD, webhook events |
| **Research** | Zo | Understanding codebases, explaining things |
| **Emergency fixes** | Zo → Cursor | Zo investigates, writes patch, hands off to Batsirai |
| **Task queue** | Linear | All work items live here |
| **Source of truth** | GitHub | PRs, issues, code |

---

## 3. Core Components

### 3.1 Task Queue — Linear

**What's already true:** Batsirai has Linear (not yet connected to Zo).

**What needs to happen:**
- Connect Linear to Zo via OAuth
- Define a standard workflow state machine in Linear:
  - `Backlog` → `Todo` → `In Progress` → `Human Review` → `Done` / `Closed`
- Zo reads from Linear, never writes code directly into the repo (that stays in Cursor)

**Zo Agents responsibilities:**
- Poll Linear on a schedule (e.g. every 15 min) or react to webhooks
- Assign tasks to itself (or flag for Batsirai if autonomous limit is reached)
- Move issues through states as work is completed
- Flag issues that have been `In Progress` for >X hours (stalled detection)

### 3.2 GitHub Integration

**What's already true:** GitHub is likely connected or can be connected.

**What needs to happen:**
- Connect GitHub to Zo (repo read access + PAT for PRs/status checks)
- Zo monitors:
  - PR creation, review requests, merge events
  - GitHub Actions runs (pass/fail on main, on PRs)
  - Branch protection rule changes
  - New issues opened

**Zo Agents responsibilities:**
- On CI failure: investigate the error, trace the failing test, post a comment on the PR with root cause analysis
- On PR opened: run a lightweight code review (static analysis, dependency checks)
- On new issue: acknowledge, label, assess severity, update Linear if linked

### 3.3 Orchestrator Agent (Zo)

A single named agent — let's call it **"Foreman"** — that acts as the smart layer between task queue and execution.

**Foreman's loop:**
```
1. Poll Linear for issues in "Todo" or "In Progress" (owned by Zo or unassigned)
2. For each issue:
   a. Read the issue description, acceptance criteria
   b. If it's a coding task → prepare context, hand off to Cursor
   c. If it's a research/investigation task → do it directly
   d. If it's a monitoring/reporting task → do it directly
3. Move Linear issue to appropriate state
4. Report summary to Batsirai via Telegram
```

**Foreman's escalation rules:**
- If CI fails → investigate immediately, post findings to PR + Telegram
- If task is unclear → ask Batsirai via Telegram, don't guess
- If task exceeds Zo's autonomous threshold → mark "Needs Batsirai" in Linear, notify

### 3.4 Emergency Fixer Mode

**Trigger:** Batsirai DMs Zo on Telegram: "hey something's broken" or "CI is red on PR #X"

**Flow:**
1. Zo investigates the reported issue immediately (doesn't wait for scheduled poll)
2. Zo reads failing tests, traces error logs, examines the diff
3. Zo forms a hypothesis and either:
   a. Posts a root cause analysis to the PR comment and/or Telegram
   b. Writes a proposed fix as a patch or new file, stores it in a designated "fixes/" folder in the workspace
4. Batsirai picks up the fix in Cursor, reviews, merges

**Types of fixer tasks Zo can handle:**
- Debugging CI failures (log analysis, error trace interpretation)
- Writing hotfix patches for simple bugs
- Adding missing tests
- Dependency conflict resolution
- Docs/inline comments explaining complex code
- Re-running failed tests after fix

---

## 4. State Machine — Linear Issue Lifecycle

```
Backlog
  ↓ (assigned to Zo or Batsirai)
Todo
  ↓ (Zo starts work OR Batsirai picks up)
In Progress
  ↓ (Zo or Batsirai completes)
Human Review
  ↓ (Batsirai approves OR merge)
Done / Closed
```

**Zo monitors and updates:**
- `Todo` → `In Progress`: when Zo starts autonomous work
- `In Progress` → `Human Review`: when a PR is opened
- `Human Review` → `Done`: when PR is merged

---

## 5. Zo + Cursor Handshake

Zo and Cursor need a way to exchange context without stepping on each other.

**Proposed approach:**
- A shared `dev-context/` folder in the repo (or a designated file in the workspace) where Zo writes:
  - `zo-task-current.md` — current task description and context
  - `zo-findings.md` — investigation notes, root cause analysis
  - `zo-proposed-fix.md` — patch or fix draft
- Cursor watches this folder or file and picks up context
- Batsirai runs a Cursor rule: "read zo-context/ before starting work"

**GitHub PR integration:**
- Zo can comment directly on PRs via GitHub API
- Zo labels PRs: `zo:reviewed`, `zo:needs-fix`, `zo:emergency`

---

## 6. Zo Skills Needed

| Skill | Purpose |
|---|---|
| `linear-manager` | Poll Linear, update issue states, assign work |
| `github-monitor` | Watch repo events, CI/CD, PRs |
| `code-investigator` | Analyze failing tests, trace bugs, explain code |
| `fixer` | Write patches, draft fixes, propose solutions |
| `foreman` | Top-level orchestrator that runs the loop |
| `buffer-poster` | Post UGC content to social (via Buffer) — see UGC pipeline |

---

## 7. Implementation Phases

### Phase 1 — Foundation (do first)
- [ ] Connect Linear to Zo
- [ ] Connect GitHub to Zo
- [ ] Define Linear workflow states
- [ ] Create `dev-context/` folder in repo
- [ ] Write Cursor rule to read `dev-context/`

### Phase 2 — Monitoring
- [ ] Set up GitHub webhook or polling for CI/CD events
- [ ] Zo reports CI failures to Telegram
- [ ] Test emergency fixer flow manually

### Phase 3 — Orchestration
- [ ] Build `foreman` agent with Linear polling
- [ ] Build `code-investigator` and `fixer` skills
- [ ] Connect `github-monitor` to foreman
- [ ] End-to-end test: create issue → Zo investigates → posts findings

### Phase 4 — Autonomous Loop
- [ ] Tune autonomous thresholds (what Zo can do without asking)
- [ ] Set up escalation rules
- [ ] Performance metrics: time from issue opened → PR created

---

## 8. Open Questions

- [x] ~~Which repo(s)?~~ AlreadyLoved
- [ ] Does Batsirai want Zo to handle PR reviews for ALL PRs or only ones where CI is failing?
- [ ] What's the autonomous threshold? (e.g., Zo can fix docs, tests, small bugs — anything larger gets escalated)
- [ ] Should Zo run `git` operations (create branches, open PRs) directly, or hand off to Batsirai?
- [ ] Does Batsirai want daily summary reports via Telegram?

---

## Appendix A: Zo Skills — Skill Manager

Skills are registered at `/home/workspace/Companies/AdoroStudios/Skills/.registry.json` and managed via `/home/workspace/Companies/AdoroStudios/Skills/skill-manager.sh`.

New skills for this architecture will be added there.

---

## Appendix B: Existing Zo Stack (as of 2026-03-19)

- **Database:** DuckDB 1.4.2 (local analytics) + Convex
- **Memory:** Supermemory.ai (X discourse, knowledge graphs)
- **Video:** Pruna P-Video (drafts), Veo 3.1, Sora
- **Stack reference:** AGENTS.md at `/home/workspace/AGENTS.md`
