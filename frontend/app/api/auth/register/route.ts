import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { nanoid } from "nanoid";
import bcrypt from "bcryptjs";
import { DEFAULT_HABITS } from "@/lib/habits";

export async function POST(req: Request) {
    try {
        await dbConnect();
        const { name, password, recoveryKey } = await req.json();

        if (!name || !password || !recoveryKey) {
            return NextResponse.json(
                { error: "Name, password, and recovery key are required" },
                { status: 400 }
            );
        }

        // Hash password & recovery key
        const hashedPassword = await bcrypt.hash(password, 10);
        const hashedRecovery = await bcrypt.hash(recoveryKey, 10);

        const newUser = await User.create({
            id: nanoid(),
            name,
            password: hashedPassword,
            recoveryHash: hashedRecovery,
            habits: DEFAULT_HABITS,
        });

        // Return the safe user object (convert mongoose doc to object)
        const userObj = newUser.toObject();
        delete userObj.password;
        delete userObj.recoveryHash;
        delete userObj._id;
        delete userObj.__v;

        return NextResponse.json(userObj, { status: 201 });
    } catch (error: any) {
        console.error("Register Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
