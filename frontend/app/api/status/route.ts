import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";

export async function GET() {
    try {
        await dbConnect();
        return NextResponse.json({ status: "OK", database: "Connected" });
    } catch (e) {
        return NextResponse.json({ status: "Error", error: String(e) }, { status: 500 });
    }
}
