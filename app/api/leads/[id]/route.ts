// app/api/leads/[id]/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import { connectToDB } from "@/lib/mongodb";
import { LeadModel } from "@/models/Lead";
import { PIPELINE } from "@/constants/statuses";
import { Types } from "mongoose";


// 🔴 Yangi: status ham, flagged ham optional, kamida bittasi bo‘lishi shart
const StatusSchema = z
  .object({
    status: z.string().min(1).optional(),
    flagged: z.boolean().optional(),
  })
  .refine(
    (data) => data.status !== undefined || data.flagged !== undefined,
    { message: "Nothing to update" }
  );

  export async function PATCH(
    req: Request,
    context: { params: Promise<{ id: string }> }
  ) {
    try {
      const { id } = await context.params;
      if (!id) {
        return NextResponse.json({ error: "Missing id" }, { status: 400 });
      }
  
      const body = await req.json().catch(() => ({}));
      const parsed = StatusSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json(
          { error: parsed.error.flatten() },
          { status: 400 }
        );
      }
  
      const { status, flagged } = parsed.data;
  
      // 🔴 Yangi: update obyektini qo‘lda yig‘amiz
      const update: Record<string, any> = {};
  
      // 🟦 Agar status kelgan bo‘lsa, avvalgidek PIPELINE bo‘yicha tekshiramiz
      if (typeof status === "string") {
        if (!PIPELINE.includes(status as any)) {
          return NextResponse.json(
            { error: "Invalid status" },
            { status: 400 }
          );
        }
        update.status = status;
      }
  
      // 🔴 Agar flagged kelgan bo‘lsa, uni ham qo‘shamiz
      if (typeof flagged === "boolean") {
        update.flagged = flagged;
      }
  
      await connectToDB();
      const updated = await LeadModel.findByIdAndUpdate(id, update, {
        new: true,
      });
  
      if (!updated) {
        return NextResponse.json(
          { error: "Lead not found" },
          { status: 404 }
        );
      }
  
      return NextResponse.json(
        { lead: { ...updated.toObject(), id: String(updated._id) } },
        { status: 200 }
      );
    } catch (e: any) {
      console.error("PATCH /api/leads/:id error:", e);
      return NextResponse.json(
        { error: e?.message ?? "Internal error" },
        { status: 500 }
      );
    }
  }
  
  

// app/api/leads/[id]/route.ts
export const dynamic = "force-dynamic";

const ADMIN_DELETE_PASSWORD = process.env.ADMIN_DELETE_PASSWORD || "";

export async function DELETE(
  req: Request,
  ctx: { params: Promise<{ id: string }> } // Next 16: params = Promise
) {
  const { id } = await ctx.params;

  if (!Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }
  const body = await req.json().catch(() => ({} as any));
  const password = String(body?.password ?? "");

  if (!ADMIN_DELETE_PASSWORD) {
    return NextResponse.json({ error: "Server password not set" }, { status: 500 });
  }
  if (password !== ADMIN_DELETE_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectToDB();
  const removed = await LeadModel.findByIdAndDelete(id);
  if (!removed) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ ok: true }, { status: 200, headers: { "Cache-Control": "no-store" } });
}
