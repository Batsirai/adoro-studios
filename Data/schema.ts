// Convex Schema — Agentic Company Coordination Layer

import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // === AGENTS ===
  agents: defineTable({
    name: v.string(),
    role: v.string(),
    companyId: v.optional(v.string()),
    parentId: v.optional(v.id("agents")),
    status: v.union(v.literal("active"), v.literal("idle"), v.literal("paused")),
    programMd: v.string(),
    skills: v.array(v.string()),
    budgetLimit: v.optional(v.number()),
    budgetSpent: v.optional(v.number()),
    memory: v.optional(v.string()),
    lastActive: v.number(),
    createdAt: v.number(),
  }).index("by_company", ["companyId"])
    .index("by_role", ["role"])
    .index("by_parent", ["parentId"]),

  // === COMPANIES ===
  companies: defineTable({
    name: v.string(),
    slug: v.string(),
    ownerId: v.string(),
    status: v.union(v.literal("active"), v.literal("archived")),
    managingDirectorId: v.id("agents"),
    mission: v.string(),
    quarterlyGoals: v.array(v.object({
      id: v.string(),
      description: v.string(),
      status: v.union(v.literal("pending"), v.literal("in_progress"), v.literal("done")),
      quarter: v.string(),
    })),
    budget: v.object({
      monthly: v.number(),
      spent: v.number(),
    }),
    createdAt: v.number(),
  }).index("by_owner", ["ownerId"])
    .index("by_slug", ["slug"]),

  // === TASKS ===
  tasks: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    companyId: v.id("companies"),
    assignedTo: v.id("agents"),
    createdBy: v.id("agents"),
    status: v.union(
      v.literal("todo"),
      v.literal("in_progress"),
      v.literal("review"),
      v.literal("done"),
      v.literal("blocked")
    ),
    priority: v.union(v.literal("low"), v.literal("medium"), v.literal("high"), v.literal("critical")),
    parentTaskId: v.optional(v.id("tasks")),
    result: v.optional(v.string()),
    successMetrics: v.optional(v.string()),
    timeBudget: v.optional(v.number()),
    timeSpent: v.optional(v.number()),
    dueAt: v.optional(v.number()),
    completedAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_company", ["companyId"])
    .index("by_assignee", ["assignedTo"])
    .index("by_status", ["status"])
    .index("by_parent", ["parentTaskId"]),

  // === EVENTS (realtime coordination) ===
  events: defineTable({
    type: v.union(
      v.literal("task.created"),
      v.literal("task.updated"),
      v.literal("task.completed"),
      v.literal("agent.heartbeat"),
      v.literal("agent.escalation"),
      v.literal("goal.updated"),
      v.literal("budget.alert"),
      v.literal("decision.made")
    ),
    companyId: v.id("companies"),
    agentId: v.optional(v.id("agents")),
    taskId: v.optional(v.id("tasks")),
    payload: v.string(),
    timestamp: v.number(),
  }).index("by_company", ["companyId"])
    .index("by_type", ["type"])
    .index("by_timestamp", ["timestamp"]),

  // === DECISIONS (audit log) ===
  decisions: defineTable({
    companyId: v.id("companies"),
    agentId: v.id("agents"),
    taskId: v.optional(v.id("tasks")),
    context: v.string(),
    decision: v.string(),
    rationale: v.string(),
    outcome: v.optional(v.string()),
    timestamp: v.number(),
  }).index("by_company", ["companyId"])
    .index("by_agent", ["agentId"]),

  // === MESSAGES (agent-to-agent) ===
  messages: defineTable({
    fromAgentId: v.id("agents"),
    toAgentId: v.id("agents"),
    companyId: v.id("companies"),
    subject: v.string(),
    body: v.string(),
    type: v.union(v.literal("direct"), v.literal("broadcast"), v.literal("escalation")),
    read: v.boolean(),
    timestamp: v.number(),
  }).index("by_to", ["toAgentId"])
    .index("by_from", ["fromAgentId"])
    .index("by_company", ["companyId"]),

  // === HEARTBEATS (agent scheduling) ===
  heartbeats: defineTable({
    agentId: v.id("agents"),
    schedule: v.string(),
    lastRun: v.optional(v.number()),
    nextRun: v.number(),
    status: v.union(v.literal("active"), v.literal("paused")),
    lastOutput: v.optional(v.string()),
    lastError: v.optional(v.string()),
  }).index("by_agent", ["agentId"])
    .index("by_next_run", ["nextRun"]),

  // === BUDGET TRACKING ===
  budgetEntries: defineTable({
    companyId: v.id("companies"),
    agentId: v.optional(v.id("agents")),
    category: v.string(),
    amount: v.number(),
    currency: v.string(),
    description: v.string(),
    timestamp: v.number(),
  }).index("by_company", ["companyId"])
    .index("by_category", ["category"]),
});
