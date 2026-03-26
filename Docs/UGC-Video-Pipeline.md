# UGC Video Pipeline — Architecture Doc
> **Purpose:** Build a scalable UGC (User-Generated Content) video creation pipeline for Adoro Studios — producing authentic, short-form social media videos at scale.
> **Inspiration:** @growthsuck (Bella, AI UGC engineer at AffiliateNW), @lottsnomad growth loop
> **Scope:** AlreadyLoved (primary brand/product for UGC), Adoro Studios + shopclawmart.com under full Zo autonomy
> **Status:** Planning — not yet implemented
> **Last Updated:** 2026-03-20

---

## 1. The UGC Growth Loop

The core loop (from @lottsnomad / @growthsuck research):

```
1. Post UGC daily across multiple accounts
2. Track which videos get saves and comments
3. Turn the top 10% into ads
4. Kill losers fast
5. Repeat weekly
```

UGC videos are NOT polished ads. They're authentic, relatable clips — shot on phone, short (15-30 sec), raw emotion, real reactions. They build trust, get better engagement, and feel organic.

---

## 2. The Production Stack

### Video Generation
| Tool | Use Case | Cost |
|---|---|---|
| **Pruna P-Video** | Draft UGC videos | $0.05–0.40/video |
| **Veo 3.1** | Higher quality production clips | Credits-based |
| **Sora** (via ChatGPT Pro) | Alternative high-quality generation | Included in Pro |
| **HeyGen / Synthesia** | AI avatars for bulk variations | Subscription |

### Editing & Post
- **CapCut** — quick edits, trending audio, text overlays
- **InShot** — mobile editing for raw footage
- **Canva** — captions, thumbnails, graphics

### Scheduling & Posting
- **Buffer** — social media scheduling (Instagram, TikTok, X, LinkedIn, Facebook, Pinterest)
- **Later** — visual calendar for social
- **UGC Pilot / MakeUGC** — AI-powered bulk UGC creation

### Analytics
- Platform-native analytics (X insights, TikTok analytics, Instagram insights)
- DuckDB for local tracking (already set up in workspace)
- Simple spreadsheet for engagement tracking (views > saves > shares)

---

## 3. Content Strategy

### Viral Hook Framework (First 3 Seconds)
- Problem-solution tease
- POV format: "POV: You're trying [app] for the first time"
- Trending audio integration
- Text overlay hook before the hook

### Format Guidelines
- **Length:** 15–30 seconds (platform-dependent)
- **Style:** Raw, authentic, no over-polish. Show hesitation, real reactions, "flaws"
- **Audio:** Trending sounds, music tracks (check copyright)
- **Captions:** Always on — burned-in subtitles
- **Hashtags:** Niche + trending mix (e.g., #UGC #AppReview #[niche])

### Content Pillars for AlreadyLoved (TBD based on product)
1. **Product demos** — authentic "I tried this app for 30 days" style
2. **App feature highlights** — quick 15-sec explainers
3. **Founder voice** — "what I learned building [X]"
4. **Behind the scenes** — raw, unpolished workspace clips
5. **UGC-style testimonials** — relatable, first-person, no scripts

---

## 4. Platform Priorities

Based on @growthsuck research, the priority order for app/growth-focused UGC:

| Platform | Strength | Best For |
|---|---|---|
| **TikTok** | Highest organic reach for app content | Viral app demos, hooks |
| **X (Twitter)** | Viral hooks, threading, tech audience | Founder content, threads |
| **Instagram Reels** | Discovery + saves | Aesthetic demos, lifestyle |
| **LinkedIn** | Professional audience, B2B | Founder insights, case studies |
| **YouTube Shorts** | Longevity, search | Evergreen app reviews |

---

## 5. AI-Powered Bulk Creation

### Batch Workflow
1. **Script generation** — Zo writes 10+ variations of a UGC script per product/angle
2. **Video generation** — Generate bulk videos using Pruna P-Video or Veo 3.1
3. **AI avatar variations** — HeyGen/Synthesia for face + voice variations (scaling from 1 script → 10 video versions)
4. **Caption + hashtag generation** — Zo writes multiple caption options per video
5. **Scheduling** — Buffer API for bulk scheduling across platforms

### Script Template (UGC)
```
HOOK (0-3 sec): [Problem/relatable situation]
BODY (3-20 sec): [Authentic experience, real pros/cons]
CTA (20-30 sec): [Save this, follow for more, tag a friend]
```

Example:
> "POV: You've been using the wrong note-taking app for years"
> [Shows quick demo of the app solving the problem]
> "I switched to [App] 2 weeks ago and my productivity literally doubled. Saving this for anyone still suffering."

---

## 6. Zo's Role in UGC Pipeline

Zo can autonomously handle:
- **Script writing** — bulk UGC script variations per product/angle
- **Caption + hashtag generation** — multiple caption options per video
- **Scheduling via Buffer** — using `zo-buffer` skill (already in workspace)
- **Analytics review** — pull engagement data, flag top performers
- **Content calendar** — maintain a content calendar in Notion or file

Zo needs skills to be built:
- `ugc-script-writer` — generate bulk script variations
- `ugc-analytics` — pull and summarize engagement data from platforms
- `buffer-poster` — already exists as `zo-buffer`

---

## 7. Implementation Phases

### Phase 1 — Setup
- [ ] Connect Buffer to Zo (via `zo-buffer` skill)
- [ ] Define 3 content pillars for AlreadyLoved
- [ ] Build `ugc-script-writer` skill
- [ ] Test script → video generation flow (Pruna P-Video or Veo)

### Phase 2 — Content Production
- [ ] Batch generate 30 UGC scripts across 3 products/angles
- [ ] Generate 10 video variations from top scripts
- [ ] Set up Buffer content calendar
- [ ] Create posting schedule (daily? 3x/week?)

### Phase 3 — Optimization Loop
- [ ] Run for 2 weeks, track engagement per platform
- [ ] Identify top 10% performers (by saves + comments)
- [ ] Turn top performers into paid ads (via Buffer or platform native)
- [ ] Kill low performers fast
- [ ] Iterate: improve scripts based on what worked

### Phase 4 — Scale
- [ ] Multiple accounts (phone farm for bulk posting — see @growthsuck phone farm setup)
- [ ] HeyGen/Synthesia avatars for avatar-based UGC
- [ ] Automated analytics reporting to DuckDB

---

## 8. Key References

- @growthsuck (Bella) — AI UGC engineer, viral formats researcher
  - Article on AI-powered UGC: `https://x.com/i/article/2033505085406294017`
  - Profile: `https://x.com/growthsuck`
- @lottsnomad (Lotanna Ezeike, YC W26) — growth loop thread
  - Post: `https://x.com/lottsnomad/status/2010447940788146208`
- @ugcbygenika — UGC creator, portfolio of examples
- Video tools already in stack: Pruna P-Video, Veo 3.1, Sora

---

## 9. Open Questions

- [x] ~~Which product/service is the first UGC campaign for?~~ AlreadyLoved
- [ ] How many accounts do we want to run initially? (1 or multiple?)
- [ ] Does Batsirai want Zo to handle the full script → schedule pipeline, or just parts of it?
- [ ] Which platform is the primary focus? (TikTok? X? Instagram?)
- [ ] Should we use AI avatars (HeyGen/Synthesia) or human-shot footage?
