import mongoose from "mongoose";

export const joinedEventModel = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        event: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event'
        },
    },
    { timestamps: true }
);

export type JoinedEvent = typeof joinedEventModel