import mongoose from 'mongoose';

export interface iClient {
    _id?: mongoose.Types.ObjectId,
    name: string,
    email: string,
    pageAccessToken: string,
}

const clientSchema = new mongoose.Schema({
    pageAccessToken: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

export default mongoose.model<iClient>('Client', clientSchema);