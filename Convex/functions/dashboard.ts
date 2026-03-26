// Convex query — Dashboard for Adoro Studios
import { v } from "convex/values";
import { query } from "convex/server";

export const getCompany = query({
  args: {},
  handler: async (ctx) => {
    const companies = await ctx.db.query("companies").collect();
    return companies;
  },
});

export const getAgents = query({
  args: { companyId: v.optional(v.id("companies")) },
  handler: async (ctx, args) => {
    const agents = args.companyId
      ? await ctx.db.query("agents").filter((q) => q.eq(q.field("companyId"), args.companyId)).collect()
      : await ctx.db.query("agents").collect();
    return agents;
  },
});

export const getSkills = query({
  args: { agentId: v.optional(v.id("agents")) },
  handler: async (ctx, args) => {
    const skills = args.agentId
      ? await ctx.db.query("skills").filter((q) => q.eq(q.field("agentId"), args.agentId)).collect()
      : await ctx.db.query("skills").collect();
    return skills;
  },
});
