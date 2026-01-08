import mongoose, { Schema, model, models } from "mongoose";

const EntrySchema = new Schema(
    {
        id: { type: String, required: true, unique: true }, // nanoid
        userId: { type: String, required: true, index: true }, // Foreign key
        activity: { type: String, required: true }, // Habit ID
        value: { type: Number, required: true },
        date: { type: String, required: true, index: true }, // YYYY-MM-DD
    },
    { timestamps: true }
);

const Entry = models.Entry || model("Entry", EntrySchema);

export default Entry;
