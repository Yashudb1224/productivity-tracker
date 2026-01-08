import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import Entry from "@/models/Entry";

export async function DELETE(req: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");

        if (!userId) return NextResponse.json({ error: "Missing User ID" }, { status: 400 });

        await User.deleteOne({ id: userId });
        await Entry.deleteMany({ userId });

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}
