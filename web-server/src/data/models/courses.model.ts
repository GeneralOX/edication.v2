import mongoose from 'mongoose';


export const courseModel = new mongoose.Schema(
    {
        title: {
            type: String,
            required: '{PATH} is required!'
        },
        subtitle: {
            type: String,
            required: '{PATH} is required!'

        },

        imgUrl: {
            type: String,
            required: '{PATH} is required!'

        },

        subject: {
            type: String,
            required: '{PATH} is required!'

        },
        price: {
            type: String,
            required: '{PATH} is required!'
        },
        places: {
            type: Number, required: true
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },

        startAt: {
            type: String,
            required: '{PATH} is required!'

        },
        endAt: {
            type: String,
            required: '{PATH} is required!'
        },

    }, {
    timestamps: true
})

export type Course = typeof courseModel
