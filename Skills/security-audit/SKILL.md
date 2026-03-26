---
name: security-audit
description: |
  Zo Computer security audit — adapted from VoxYZ hardening checklist.
  Scans workspace for plaintext secrets, permissive file modes,
  dangerous command patterns in agents, and integration auth gaps.
triggers:
  - "run security-audit"
  - "audit zo security"
  - "check for secrets"
danger_level: low
source: voxyz
source_url: https://voxyz.space/security
---

# Security Audit — Zo Computer

Run this regularly, especially after installing new skills or integrations.

## Checks Performed

### 1. Plaintext Secrets Scan
Searches for API keys, tokens, and secrets in plaintext across the workspace.
**Dangerous patterns:** `sk_live_`, `sk_test_`, `AIza`, `SG.`, `Bearer ` in files.

### 2. File Permission Audit
Checks AGENTS.md, SOUL.md, and key config files for world-readable permissions (644/666).

### 3. Agent Program Hardening
Scans all `program.md` files for dangerous shell patterns:
`sudo`, `chmod`, `rm -rf`, `eval`, `exec`, `wget` from untrusted sources.

### 4. Integration Auth Verification
Confirms skills use `process.env` / env vars for secrets — not hardcoded values.

### 5. Zo Secrets Coverage
Verifies critical secrets are loaded via Zo's secret manager (Settings > Advanced),
not stored in workspace files.

## Quick Run

```bash
# Full audit
bash /home/workspace/Companies/AdoroStudios/Skills/skill-manager.sh audit

# Or run checks directly
grep -rE "(sk_live_|sk_test_|AIza[a-zA-Z0-9_-]{30,})" /home/workspace \
  --include="*.md" --include="*.json" --include="*.ts" | grep -v node_modules
```

## If Findings Appear

**CRITICAL — Plaintext secrets found:**
1. Go to Settings > Advanced > Secrets
2. Add each key as a new secret (e.g., `STRIPE_SECRET_KEY=sk_live_...`)
3. Delete the plaintext copies from workspace files
4. Restart any services using the old env vars

**LOW — Permissive file modes:**
```bash
chmod 600 /home/workspace/AGENTS.md
chmod 600 /home/workspace/SOUL.md   # if exists
```

## References
- VoxYZ agent hardening: https://voxyz.space/security
- Zo Secrets: Settings > Advanced > Secrets
