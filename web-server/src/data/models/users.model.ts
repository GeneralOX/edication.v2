import mongoose from "mongoose";

export const usersModel = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },

        active: {
            type: Boolean,
            required: true,
            default: false,
        },
        role: {
            type: Number,
        }
    },
    { timestamps: true }
);

export type User = typeof usersModel