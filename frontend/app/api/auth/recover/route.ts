import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        await dbConnect();
        const { name, recoveryKey, newPassword } = await req.json();

        const user = await User.findOne({ name });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const isValid = await bcrypt.compare(recoveryKey, user.recoveryHash);
        if (!isValid) {
            return NextResponse.json({ error: "Invalid recovery key" }, { status: 401 });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("Recovery Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
