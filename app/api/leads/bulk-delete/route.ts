import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDB } from "@/lib/mongodb";
import { Lead } from "@/models/Lead"; // ✅ model shu

export async function POST(req: Request) {
  try {
    const { ids, password } = (await req.json()) as {
      ids?: string[];
      password?: string;
    };

    if (!process.env.ADMIN_DELETE_PASSWORD) {
      return NextResponse.json(
        { error: "Server paroli sozlanmagan" },
        { status: 500 }
      );
    }

    if (!password || password !== process.env.ADMIN_DELETE_PASSWORD) {
      return NextResponse.json({ error: "Parol xato" }, { status: 401 });
    }

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: "IDs bo‘sh" }, { status: 400 });
    }

    const validObjectIds = ids
      .filter((id) => mongoose.Types.ObjectId.isValid(id))
      .map((id) => new mongoose.Types.ObjectId(id));

    if (validObjectIds.length === 0) {
      return NextResponse.json(
        { error: "Valid ID topilmadi" },
        { status: 400 }
      );
    }

    await connectToDB();

    const result = await Lead.deleteMany({ _id: { $in: validObjectIds } });

    return NextResponse.json({
      ok: true,
      deletedCount: result.deletedCount ?? 0,
    });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
