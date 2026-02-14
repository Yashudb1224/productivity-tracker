import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";

export async function POST(req: Request) {
    try {
        await dbConnect();
        const { userId, habit } = await req.json();
        console.log(`[API POST] User: ${userId} | New Habit: ${habit.name} | Icon: ${habit.icon}`);

        const result = await User.findOneAndUpdate(
            { id: userId },
            { $push: { habits: habit } },
            { new: true }
        );

        if (!result) return NextResponse.json({ error: "User not found" }, { status: 404 });

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("[API POST ERROR]:", error);
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        await dbConnect();
        const { userId, habit } = await req.json();
        console.log(`[API PUT] User: ${userId} | Sync Target: ${habit.id} | Proposed Icon: ${habit.icon}`);

        // Explicit field-level update to force Mongoose/MongoDB to commit the icon field
        const result = await User.findOneAndUpdate(
            { id: userId, "habits.id": habit.id },
            {
                $set: {
                    "habits.$.name": habit.name,
                    "habits.$.type": habit.type,
                    "habits.$.unit": habit.unit,
                    "habits.$.color": habit.color,
                    "habits.$.icon": habit.icon // Force this field specifically
                }
            },
            { new: true }
        );

        if (!result) {
            console.error(`[API PUT FAIL] Habit not found: ${habit.id}`);
            return NextResponse.json({ error: "Habit not found" }, { status: 404 });
        }

        const persistentHabit = result.habits.find((h: any) => h.id === habit.id);
        console.log(`[API PUT SUCCESS] Final Persisted Icon: "${persistentHabit?.icon}"`);

        return NextResponse.json({ success: true, habit: persistentHabit }, { status: 200 });
    } catch (error) {
        console.error("[API PUT ERROR]:", error);
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");
        const habitId = searchParams.get("habitId");

        const user = await User.findOne({ id: userId });
        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

        user.habits = user.habits.filter((h: any) => h.id !== habitId);
        await user.save();

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}
