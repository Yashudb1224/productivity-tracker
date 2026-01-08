import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";

export async function POST(req: Request) {
    try {
        await dbConnect();
        const { userId, habit } = await req.json();

        const user = await User.findOne({ id: userId });
        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

        user.habits.push(habit);
        await user.save();

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        await dbConnect();
        const { userId, habit } = await req.json();

        const user = await User.findOne({ id: userId });
        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

        // Update specific habit
        const index = user.habits.findIndex((h: any) => h.id === habit.id);
        if (index !== -1) {
            user.habits[index] = habit;
            await user.save();
        }

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error(error);
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
