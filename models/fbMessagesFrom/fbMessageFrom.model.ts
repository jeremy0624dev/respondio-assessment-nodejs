import mongoose from 'mongoose';

export interface iFbMessageFrom {
    _id?: mongoose.Types.ObjectId,
    clientId: mongoose.Types.ObjectId,
    fromFbUserId: string,
    toFbPageId: string,
    message: string,
}

const fbMessageFromSchema = new mongoose.Schema({
    clientId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    fromFbUserId: {
        type: String,
        required: true,
    },
    toFbPageId: {
        type: String,
        required: true,
    },
    message: {
        type: String,
    },
}, {
    timestamps: true,
});

fbMessageFromSchema.index({
    fromFbUserId: 1,
    toFbPageId: 1,
});

export default mongoose.model<iFbMessageFrom>('FbMessageFrom', fbMessageFromSchema);