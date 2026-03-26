// Convex mutation — Initialize Adoro Studios in Convex
import { v } from "convex/values";
import { internalMutation } from "convex/server";

export default internalMutation({
  args: {
    companyName: v.string(),
    ceoName: v.string(),
  },
  handler: async (ctx, args) => {
    const companyId = await ctx.db.insert("companies", {
      name: args.companyName,
      slug: "adoro-studios",
      createdAt: Date.now(),
      plan: "trial",
    });

    const ceoId = await ctx.db.insert("agents", {
      name: args.ceoName,
      role: "CEO",
      companyId,
      model: "claude-sonnet-4-20250514",
      status: "active",
      createdAt: Date.now(),
    });

    // Seed skills library
    const skills = [
      { name: "ceo", description: "Strategic decision making and company leadership", frequency: "daily" },
      { name: "research", description: "Deep research on topics, competitors, and trends", frequency: "as_needed" },
      { name: "write", description: "Content creation, documentation, and copy writing", frequency: "daily" },
      { name: "code", description: "Software development and technical implementation", frequency: "daily" },
      { name: "analyze", description: "Data analysis and business intelligence", frequency: "weekly" },
    ];

    for (const skill of skills) {
      await ctx.db.insert("skills", { ...skill, agentId: ceoId });
    }

    return { companyId, ceoId };
  },
});
