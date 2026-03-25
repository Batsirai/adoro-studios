---
name: ugc.pipeline
description: End-to-end UGC video and slideshow pipeline — from emotional hook script to branded image to scheduled post. Based on the LarryLoop methodology.
version: "1.0"
---

# UGC Pipeline Skill

Generate, create, and schedule UGC-style content at scale using the LarryLoop methodology.

## Pipeline Steps

```
1. HOOK RESEARCH   → Find winning emotional hooks (X/Twitter search)
2. SCRIPT GENERATE → Write 3-5 scripts using AlreadyLoved Hook Framework
3. IMAGE GENERATE  → Create Nano Banana 2 images (768×768 or 1024×1024)
4. BRAND OVERLAY   → Add logo (120px, top-left) + recoleta font text
5. BUFFER POST    → Schedule to TikTok, Instagram, X via Buffer API
6. ANALYZE        → Pull engagement after 24h, log to Supermemory
7. ITERATE        → Refine hook patterns based on top performers
```

## Image Generation

```bash
# Nano Banana 2 (Zo native)
generate_image(prompt="Pixar-quality 3D CGI [description]", aspect="9:16")

# Add branding
composite -gravity NorthWest -geometry +15+15 -resize 120x /logo.png /image.jpg /output.jpg

# Add text overlay (Recoleta Bold)
convert -font /fonts/al-Bold.otf -pointsize 48 -fill white \
  -gravity SouthWest -annotate +20+30 "MOMMY, DO YOU STILL LOVE ME?" /image.jpg /output.jpg
```

## Buffer Scheduling

```bash
# Get channel ID
bun Skills/zo-buffer/scripts/buffer.ts channels

# Post image to TikTok
BUFFER_API_KEY=<key> bun Skills/zo-buffer/scripts/buffer.ts create-image \
  699de0df4be271803d6315ca "MOMMY, DO YOU STILL LOVE ME? 💔
  
You don't have to earn it.

#AlreadyLoved #MomLife #ChristianMom" \
  /output.jpg "2026-03-26T14:00:00.000Z"
```

## Hook Research Prompts

```bash
# Find winning UGC hooks in niche
x_search query="[niche] emotional mom hook viral TikTok"

# Check competitor top posts
x_search query="[competitor_handle] most liked posts"
```

## Analytics

```python
# PostHog insight
posthog_insights(channel="tiktok", metric="engagements", period="7d")
```

## Cost Reference

| Step | Cost |
|------|------|
| Nano Banana 2 image (1024×1024) | ~$0.134 |
| Veo 3.1 video (4K, 5s) | ~$2.00 |
| Buffer post | Free |
| PostHog analytics | Free tier |
| Supermemory search | Free (1M tokens/mo) |
