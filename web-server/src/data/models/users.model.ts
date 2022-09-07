import mongoose from "mongoose";

export const usersModel = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        active: {
            type: Boolean,
            required: true,
            default: false,
        },
        activationToken: {
            type: String,
        },
        resetToken: {
            type: String,
        },
        resetTokenExpiry: {
            type: Number,
        },
    },
    { timestamps: true }
);

export type User = typeof usersModel