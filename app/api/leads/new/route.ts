export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import { LeadModel, type ILead } from "@/models/Lead";


/**
 * Barcha leadlarni qaytaradi (statusdan qat’i nazar)
 * GET /api/leads/new
 */
export async function GET() {
  try {
    // 1️⃣ Bazaga ulanamiz
    await connectToDB();

    // 2️⃣ Barcha leadlarni olish (status filtri yo‘q)
    const rows = await LeadModel.find({})
      .sort({ createdAt: -1 }) // eng so‘nggilari tepada
      .lean<ILead[]>();

    // 3️⃣ Natijani qaytaramiz
    return NextResponse.json(rows, {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (err: any) {
    console.error("GET /api/leads/new error:", err);
    return NextResponse.json(
      { error: err?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
