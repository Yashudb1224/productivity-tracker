import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { currentUser } from "@clerk/nextjs/server";
import { nanoid } from "nanoid";

export async function POST(req: Request) {
    try {
        await dbConnect();
        const clerkUser = await currentUser();

        if (!clerkUser) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { clerkId, name, email } = await req.json();

        // 1. Try to find by clerkId
        let user = await User.findOne({ clerkId });

        if (!user) {
            // 2. Try to find by name (migration fallback)
            // USER requested: "make sure... sync only happens if data with name exists otherwise new account fresh habits"
            user = await User.findOne({
                name: { $regex: new RegExp(`^${name}$`, "i") },
                clerkId: { $exists: false } // Only migrate if not already linked
            });

            if (user) {
                console.log(`Migrating existing user ${name} (${email}) to Clerk ID ${clerkId}`);
                user.clerkId = clerkId;
                await user.save();
            } else {
                console.log(`Creating new fresh account for ${name} (${email})`);
                user = await User.create({
                    id: nanoid(),
                    clerkId,
                    name,
                    habits: [],
                });
            }
        }

        const userObj = user.toObject();
        delete userObj.password;
        delete userObj.recoveryHash;
        delete userObj._id;
        delete userObj.__v;

        return NextResponse.json(userObj, { status: 200 });
    } catch (error) {
        console.error("Clerk Sync Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
