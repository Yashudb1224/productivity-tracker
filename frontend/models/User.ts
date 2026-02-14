import mongoose, { Schema, model, models } from "mongoose";

const HabitSchema = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, enum: ["numeric", "boolean"], required: true },
    unit: { type: String }, // Optional for boolean
    color: { type: String, required: true },
    icon: { type: String },
});

const UserSchema = new Schema(
    {
        id: { type: String, required: true, unique: true }, // Keeping nanoid for frontend consistency
        clerkId: { type: String, unique: true, sparse: true },
        name: { type: String, required: true },
        password: { type: String }, // Optional for Clerk users
        recoveryHash: { type: String }, // Optional for Clerk users
        habits: { type: [HabitSchema], default: [] },
    },
    { timestamps: true }
);

// Prevent overwrite on hot reload
const User = models.User || model("User", UserSchema);

export default User;
