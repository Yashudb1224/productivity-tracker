import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Entry from "@/models/Entry";

export async function GET(req: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json(
                { error: "UserId is required" },
                { status: 400 }
            );
        }

        const entries = await Entry.find({ userId });

        // Transform _id to id if needed, or just return as is but ensure consistency
        // Our frontend uses nanoid 'id' string, model has 'id'. 
        // Mongoose returns _id too.
        return NextResponse.json(entries, { status: 200 });
    } catch (error) {
        console.error("Get Entries Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        await dbConnect();
        const entryData = await req.json();

        if (!entryData.userId || !entryData.activity || !entryData.date) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Check for existing entry to prevent duplicates if logic requires?
        // Current logic allows duplicates (multiple entries per day per habit).

        const newEntry = await Entry.create(entryData);
        return NextResponse.json(newEntry, { status: 201 });
    } catch (error) {
        console.error("Add Entry Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function DELETE(req: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");

        if (userId) {
            // Clear all data for user
            await Entry.deleteMany({ userId });
            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ error: "UserId required" }, { status: 400 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
