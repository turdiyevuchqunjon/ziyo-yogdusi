// app/api/leads/[id]/comments/[commentId]/route.ts
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
// Sizda qaysi eksport bor bo'lsa shuni tanlang:
import { LeadModel as Lead } from "@/models/Lead"; // yoki: import { Lead } from "@/models/Lead";
import { Types } from "mongoose";

// ❗ Eʼtibor: params — Promise! Uni await bilan yechib oling.
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string; commentId: string }> }
) {
  // params ni await bilan yechib olamiz
  const { id, commentId } = await context.params;

  // ID formatlarini tekshiramiz
  if (!Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "LeadId invalid" }, { status: 400 });
  }
  if (!Types.ObjectId.isValid(commentId)) {
    return NextResponse.json({ error: "CommentId invalid" }, { status: 400 });
  }

  // body
  const payload = await req.json().catch(() => ({} as any));
  const text = String(payload?.text || "").trim();
  if (!text) {
    return NextResponse.json({ error: "Text required" }, { status: 400 });
  }

  await connectToDB();

  // leadni topamiz
  const lead = await Lead.findById(id);
  if (!lead) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  // kommentni topamiz (string solishtirish bilan)
  const idx = lead.comments.findIndex((c: any) => String(c._id) === String(commentId));
  if (idx === -1) {
    return NextResponse.json({ error: "Comment not found" }, { status: 404 });
  }

  // yangilaymiz
  lead.comments[idx].text = text;
  lead.markModified?.("comments"); // baʼzi sozlamalarda kerak bo'ladi
  await lead.save();

  return NextResponse.json(lead.comments[idx], {
    status: 200,
    headers: { "Cache-Control": "no-store" },
  });
}
