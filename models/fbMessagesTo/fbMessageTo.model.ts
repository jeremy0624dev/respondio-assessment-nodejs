import mongoose from 'mongoose';

export interface iFbMessageTo {
    _id?: mongoose.Types.ObjectId,
    clientId?: mongoose.Types.ObjectId,
    toFbUserId: string,
    fromFbPageId: string,
    message: string,
}

const fbMessageToSchema = new mongoose.Schema({
    clientId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    toFbUserId: {
        type: String,
        required: true,
    },
    fromFbPageId: {
        type: String,
        required: true,
    },
    message: {
        type: String,
    },
}, {
    timestamps: true,
});

fbMessageToSchema.index({
    toFbUserId: 1,
    fromFbPageId: 1,
})

export default mongoose.model<iFbMessageTo>('FbMessageTo', fbMessageToSchema);