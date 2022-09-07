import mongoose from "mongoose";

export const eventsModel = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        subtitle: {
            type: String,
            required: true,
        },
        imgUrl: {
            type: String,
            required: true,
        },
        startAt: {
            type: String,
            required: true,
        },
        endAt: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
    },
    { timestamps: true }
);

export type Event = typeof eventsModel