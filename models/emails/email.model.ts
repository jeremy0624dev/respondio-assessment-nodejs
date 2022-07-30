import mongoose from 'mongoose';

export enum EmailType {
    OrderAttemptNotification = 'orderAttemptNotification',
}

export interface iEmail {
    _id?: mongoose.Types.ObjectId,
    type: EmailType | string,
    statusCode: number,
    body: string,
    headers: string,
}

const emailSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    statusCode: {
        type: Number,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    headers: {
        type: String,
    },
}, {
    timestamps: true,
});

emailSchema.index({
    type: 1,
});

export default mongoose.model<iEmail>('Email', emailSchema);