import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        await dbConnect();
        const { name, password } = await req.json();

        const user = await User.findOne({ name });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return NextResponse.json({ error: "Invalid password" }, { status: 401 });
        }

        const userObj = user.toObject();
        delete userObj.password;
        delete userObj.recoveryHash;
        delete userObj._id;
        delete userObj.__v;

        return NextResponse.json(userObj, { status: 200 });
    } catch (error) {
        console.error("Login Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
