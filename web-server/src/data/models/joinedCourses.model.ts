import mongoose from "mongoose";

export const joinedCourseModel = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        },
    },
    { timestamps: true }
);

export type JoinedCourse = typeof joinedCourseModel