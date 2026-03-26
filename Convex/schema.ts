import { python } from "convex-helpers";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // ─── Identity ──────────────────────────────────────────
  companies: defineTable({
    name: v.string(),
    slug: v.string(),
    mission: v.string(),
    ownerId: v.string(),
    createdAt: v.number(),
  }).index("by_slug", (t) => t.slug),

  personas: defineTable({
    name: v.string(),
    role: v.string(),            // "CEO" | "COO" | "CMO" | "CTO" | "CFO" | "HeadOfResearch" | "HeadOfPeople"
    companySlug: v.string(),
    bossId: v.id("personas") | v.null(),  // delegation chain
    programMd: v.string(),       // skill/behavior definition
    model: v.optional(v.string()),
    isActive: v.boolean(),
    createdAt: v.number(),
  })
    .index("by_company", (t) => t.companySlug)
    .index("by_role", (t) => [t.companySlug, t.role]),

  // ─── Tasks & Projects ──────────────────────────────────
  tasks: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    companySlug: v.string(),
    assignedTo: v.id("personas") | v.null(),
    status: v.union(
      v.literal("pending"),
      v.literal("in_progress"),
      v.literal("review"),
      v.literal("done"),
      v.literal("blocked")
    ),
    priority: v.union(
      v.literal("low"),
      v.literal("medium"),
      v.literal("high"),
      v.literal("critical")
    ),
    parentTaskId: v.id("tasks") | v.null(),
    skillUsed: v.optional(v.string()),
    tags: v.array(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
    completedAt: v.number() | v.null(),
  })
    .index("by_company", (t) => t.companySlug)
    .index("by_status", (t) => [t.companySlug, t.status])
    .index("by_assignee", (t) => t.assignedTo),

  projects: defineTable({
    name: v.string(),
    companySlug: v.string(),
    description: v.string(),
    status: v.union(v.literal("planning"), v.literal("active"), v.literal("paused"), v.literal("done")),
    quarter: v.string(),         // e.g. "2026-Q1"
    budgetUsd: v.number(),
    spentUsd: v.number(),
    ownerId: v.id("personas"),
    createdAt: v.number(),
  })
    .index("by_company", (t) => t.companySlug)
    .index("by_quarter", (t) => [t.companySlug, t.quarter]),

  // ─── Agent Memory & Learning ────────────────────────────
  agentMemory: defineTable({
    personaId: v.id("personas"),
    companySlug: v.string(),
    key: v.string(),             // e.g. "feedback:task:123" or "learned:shipping-fast"
    content: v.string(),         // what was learned
    source: v.union(
      v.literal("task_result"),
      v.literal("human_feedback"),
      v.literal("self_reflection"),
      v.literal("performance_review")
    ),
    confirmed: v.boolean(),      // human confirmed this learning?
    createdAt: v.number(),
  })
    .index("by_persona", (t) => t.personaId)
    .index("by_key", (t) => [t.personaId, t.key]),

  // ─── Brand & Content ───────────────────────────────────
  brandGuidelines: defineTable({
    companySlug: v.string(),
    voice: v.string(),           // brand voice description
    tone: v.string(),
    values: v.array(v.string()),
    doList: v.array(v.string()),
    dontList: v.array(v.string()),
    updatedAt: v.number(),
  }),

  contentCalendar: defineTable({
    companySlug: v.string(),
    title: v.string(),
    platform: v.union(
      v.literal("instagram"),
      v.literal("tiktok"),
      v.literal("youtube"),
      v.literal("twitter"),
      v.literal("linkedin"),
      v.literal("facebook")
    ),
    contentType: v.union(
      v.literal("post"),
      v.literal("reel"),
      v.literal("story"),
      v.literal("video"),
      v.literal("carousel"),
      v.literal("live")
    ),
    caption: v.optional(v.string()),
    scheduledFor: v.number(),
    status: v.union(v.literal("draft"), v.literal("scheduled"), v.literal("posted"), v.literal("cancelled")),
    projectId: v.id("projects") | v.null(),
    createdAt: v.number(),
  })
    .index("by_company", (t) => t.companySlug)
    .index("by_platform", (t) => [t.companySlug, t.platform])
    .index("by_status", (t) => [t.companySlug, t.status])
    .index("by_scheduled", (t) => t.scheduledFor),

  socialPosts: defineTable({
    companySlug: v.string(),
    platform: v.string(),
    postId: v.string(),         // external platform post ID
    caption: v.string(),
    impressions: v.number(),
    likes: v.number(),
    comments: v.number(),
    shares: v.number(),
    saves: v.number(),
    reach: v.number(),
    videoViews: v.number(),
    ctaClicks: v.number(),
    hashtags: v.array(v.string()),
    campaignId: v.id("projects") | v.null(),
    postedAt: v.number(),
    createdAt: v.number(),
  })
    .index("by_company", (t) => t.companySlug)
    .index("by_platform", (t) => [t.companySlug, t.platform])
    .index("by_campaign", (t) => t.campaignId),

  // ─── Metrics & Budgets ─────────────────────────────────
  budgets: defineTable({
    companySlug: v.string(),
    quarter: v.string(),
    category: v.string(),        // "marketing" | "infrastructure" | "people" | "software"
    allocatedUsd: v.number(),
    spentUsd: v.number(),
    updatedAt: v.number(),
  })
    .index("by_quarter", (t) => [t.companySlug, t.quarter]),

  goals: defineTable({
    companySlug: v.string(),
    quarter: v.string(),
    metric: v.string(),
    target: v.number(),
    actual: v.number(),
    unit: v.string(),            // "dollars" | "posts" | "leads" | "hours"
    updatedAt: v.number(),
  })
    .index("by_quarter", (t) => [t.companySlug, t.quarter]),

  // ─── Evaluation ────────────────────────────────────────
  evaluations: defineTable({
    companySlug: v.string(),
    agentId: v.id("personas"),
    taskId: v.id("tasks") | v.null(),
    type: v.union(
      v.literal("self"),
      v.literal("peer"),
      v.literal("manager"),
      v.literal("human")
    ),
    score: v.number(),           // 0–100
    feedback: v.string(),
    evaluatorsId: v.id("personas") | v.null(),
    createdAt: v.number(),
  })
    .index("by_agent", (t) => [t.companySlug, t.agentId]),
});

  // ─── Events & Audit Log ────────────────────────────────
  events: defineTable({
    type: v.string(),             // "agent.heartbeat" | "task.created" | "eval.received" etc.
    companyId: v.id("companies"),
    agentId: v.id("personas"),
    payload: v.string(),          // JSON stringified
    timestamp: v.number(),
  })
    .index("by_company", (t) => t.companyId)
    .index("by_type", (t) => [t.companyId, t.type]),
