# Skills Library — Adapted from GStack for Zo

> Adapted from [GStack by Garry Tan](https://github.com/garrytan/gstack) (Y Combinator CEO), 
> 27k GitHub stars, MIT License. GStack turns Claude Code into a virtual engineering team. 
> These adaptations bring the same skill framework to Zo Computer as a native skill library.

## The Problem GStack Solves

Generic AI assistants operate in one mode — they respond to everything with no awareness of 
where you are in the development lifecycle. GStack provides explicit cognitive gears: 
different specialists for different phases, invoked as slash commands.

**The core insight:** Planning is not review. Review is not shipping. CEO thinking is 
not engineering rigor. If you blur all of that together, you get mediocre output from 
all of it. You need explicit gears.

## Skills Overview

| Skill | Role | When to Use |
|-------|------|-------------|
| `/office-hours` | Product Strategist | Vague goals, "should I build X?", product reset |
| `/plan-ceo-review` | CEO / Founder | Strategy, scope ambition, competitive positioning |
| `/plan-eng-review` | Engineering Manager | Architecture, data flow, failure modes |
| `/design-consultation` | Product Designer | New UI features, redesigns, no style guide |
| `/design-review` | Design + Code | Audit design decisions, fix what breaks |
| `/review` | Paranoid Staff Engineer | Before any PR merge, trust boundaries |
| `/investigate` | Debugger | Root-cause bugs, unexplained behavior |
| `/qa` | QA Lead + Fixer | Pre-ship testing, find-fix-verify cycle |
| `/ship` | Release Engineer | Ready to merge, one-command to production |
| `/document-release` | Technical Writer | Post-ship doc updates |
| `/retro` | Engineering Manager | Weekly/monthly performance retrospectives |

## Workflow

```
User → /office-hours (frame the problem)
         ↓
    /plan-ceo-review (is this the right thing?)
         ↓
    /plan-eng-review (will this scale?)
         ↓
    Implement
         ↓
    /review (paranoid code audit)
         ↓
    /qa (find the bugs)
         ↓
    /ship (merge to main)
         ↓
    /document-release (update all docs)
         ↓
    /retro (what did we learn?)
```

## DuckDB Tracking

Each skill run is logged to the analytics DuckDB for trend analysis:

```sql
-- Log skill usage
INSERT INTO agent_activity VALUES (
  nextval('agent_activity_seq'),
  'zo-skill-[skill-name]',
  'adoro-studios',
  'skill_invoked',
  '[brief description]',
  [tokens_used],
  [duration_ms],
  [cost_usd],
  true
);
```

## Attribution

GStack was created by **Garry Tan**, President & CEO of Y Combinator.
GStack is MIT Licensed — free forever.
https://github.com/garrytan/gstack

This Zo adaptation applies GStack's skill framework to Zo Computer's native 
skill format, enabling the same structured specialist workflow for any agent or 
persona in the Adoro Studios framework.
