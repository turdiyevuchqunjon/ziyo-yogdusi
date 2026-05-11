// app/api/leads/[id]/comments/route.ts
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { z } from "zod";
import { connectToDB } from "@/lib/mongodb";
import { LeadModel, type ILead } from "@/models/Lead";
import { Types } from "mongoose";

const CreateCommentSchema = z.object({
  text: z.string().min(1, "Komment bo‘sh bo‘lishi mumkin emas").max(1000),
  author: z.string().optional(),
});

// --- GET: barcha kommentlar (yangi yozilganlar birinchi) ---
export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    // ✅ ID ni tekshiramiz (aks holda saqlanmay qolishi mumkin)
    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid lead id" },
        { status: 400, headers: { "Cache-Control": "no-store" } }
      );
    }

    await connectToDB();

    const lead = await LeadModel.findById(id)
      .select({ comments: 1 })
      .lean<ILead>();

    if (!lead) {
      return NextResponse.json(
        { error: "Lead not found" },
        { status: 404, headers: { "Cache-Control": "no-store" } }
      );
    }

    const comments = (lead.comments ?? [])
      .slice()
      .sort((a, b) => {
        const at = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const bt = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return bt - at;
      });

    return NextResponse.json(
      { comments },
      { status: 200, headers: { "Cache-Control": "no-store" } }
    );
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ?? "Internal error" },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}

// --- POST: yangi komment qo‘shish ---
export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    // ✅ ID ni tekshiramiz
    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid lead id" },
        { status: 400, headers: { "Cache-Control": "no-store" } }
      );
    }

    const body = await req.json().catch(() => ({}));
    const parsed = CreateCommentSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten() },
        { status: 400, headers: { "Cache-Control": "no-store" } }
      );
    }

    await connectToDB();

    const updated = await LeadModel.findByIdAndUpdate(
      id,
      {
        $push: {
          comments: {
            text: parsed.data.text,
            author: parsed.data.author ?? "Operator",
            // ✅ subdocument timestamps (push bilan avtomatik qo'yilmaydi)
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
      },
      { new: true, projection: { comments: 1 } }
    ).lean<ILead>();

    if (!updated) {
      return NextResponse.json(
        { error: "Lead not found" },
        { status: 404, headers: { "Cache-Control": "no-store" } }
      );
    }

    // Ixtiyoriy: javobni ham eng yangidan eski tomonga sortlab beramiz
    const comments = (updated.comments ?? [])
      .slice()
      .sort((a, b) => {
        const at = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const bt = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return bt - at;
      });

    return NextResponse.json(
      { comments },
      { status: 201, headers: { "Cache-Control": "no-store" } }
    );
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ?? "Internal error" },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
