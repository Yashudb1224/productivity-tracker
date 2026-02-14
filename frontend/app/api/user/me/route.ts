import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";

export async function GET(req: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json({ error: "User ID required" }, { status: 400 });
        }

        const user = await User.findOne({ id: userId });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const userObj = user.toObject();
        delete userObj.password;
        delete userObj.recoveryHash;
        delete userObj._id;
        delete userObj.__v;

        return NextResponse.json(userObj, { status: 200 });
    } catch (error) {
        console.error("Fetch User Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
