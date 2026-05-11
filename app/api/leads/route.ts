// app/api/leads/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import { LeadModel, type ILead } from "@/models/Lead";

export const dynamic = "force-dynamic";

// Kichik util: qidiruv matnini regex uchun sanitizatsiya
function escapeRegex(input: string) {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

type UnknownRecord = Record<string, unknown>;

function toRecord(v: unknown): UnknownRecord {
  return v && typeof v === "object" ? (v as UnknownRecord) : {};
}

function getString(obj: unknown, key: string): string {
  const rec = toRecord(obj);
  const val = rec[key];
  return typeof val === "string" ? val : "";
}

function getErrorMessage(e: unknown): string {
  if (e instanceof Error) return e.message;
  const rec = toRecord(e);
  const msg = rec["message"];
  return typeof msg === "string" ? msg : "Internal error";
}

type LeadFilter = {
  status?: string;
  $or?: Array<
    | { fullName: { $regex: string; $options: "i" } }
    | { phone: { $regex: string } }
  >;
};

export async function GET(req: NextRequest) {
  try {
    await connectToDB();

    const status = req.nextUrl.searchParams.get("status") ?? undefined;
    const qRaw = req.nextUrl.searchParams.get("q") ?? "";
    const q = qRaw.trim();
    const limitRaw = req.nextUrl.searchParams.get("limit");
    const limit = Math.min(Math.max(Number(limitRaw ?? 200) || 200, 1), 500); // 1..500

    const filter: LeadFilter = {};
    if (status) filter.status = status;

    if (q) {
      const safe = escapeRegex(q);
      filter.$or = [
        { fullName: { $regex: safe, $options: "i" } },
        { phone: { $regex: safe } },
      ];
    }

    // Har bir lead uchun oxirgi kommentdan 1 ta bo‘lagini olamiz
    const rows = await LeadModel.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit)
      .select({
        fullName: 1,
        phone: 1,
        source: 1,
        status: 1,
        note: 1,
        createdAt: 1,
        flagged: 1, // 🔴 YANGI: flagged maydonini ham olib kelamiz
        comments: { $slice: -1 }, // faqat oxirgi komment
      })
      .lean<ILead>();

    // Frontend uchun barqaror id + preview matn
    const leads = rows.map((x) => ({
      ...x,
      id: String(x._id),
      // 🔴 Muhim qator: flag bazadan kelsa — shu, kelmasa — false
      flagged: typeof x.flagged === "boolean" ? x.flagged : false,
      lastCommentText:
        Array.isArray(x.comments) && x.comments.length > 0 ? x.comments[0].text : "",
    }));

    return NextResponse.json({ leads }, { status: 200 });
  } catch (e: unknown) {
    console.error("GET /api/leads error:", e);
    return NextResponse.json(
      { error: getErrorMessage(e) },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDB();

    const body: unknown = await req.json().catch(() => ({}));

    // Eski qismi – tegmaymiz
    const fullName = getString(body, "fullName");
    const phone = getString(body, "phone");
    const source = getString(body, "source") || "unknown";
    const note = getString(body, "note") || "";

    // 🔹 YANGI: target / sotuv ajratish uchun service
    const service = getString(body, "service") || "";

    // 🔹 YANGI: target formasidagi qo‘shimcha maydonlar
    const businessType = getString(body, "businessType") || "";
    const socialPage = getString(body, "socialPage") || getString(body, "page") || "";
    const budget = getString(body, "budget") || "";

    // 🔹 YANGI: agar target formadan "comment" kelsa, note bo‘sh bo‘lsa o‘shani yozamiz
    const finalNote = note || getString(body, "comment") || "";

    if (!fullName || !phone) {
      return NextResponse.json(
        { error: "fullName va phone majburiy" },
        { status: 400 }
      );
    }

    // doimo "LID" status bilan yaratiladi (enum bilan mos)
    const created = await LeadModel.create({
      fullName,
      phone,
      source,
      note: finalNote,
      status: "LID",

      // 🔹 YANGI maydonlar – schema’ga ham qo‘shib qo‘ygan bo‘lishingiz kerak
      service, // "sotuv" | "target"
      businessType,
      socialPage,
      budget,
    });

    const lead = { ...created.toObject(), id: String(created._id) };
    return NextResponse.json({ lead }, { status: 201 });
  } catch (e: unknown) {
    console.error("POST /api/leads error:", e);
    return NextResponse.json(
      { error: getErrorMessage(e) },
      { status: 500 }
    );
  }
}
