import mongoose from 'mongoose';
export var EmailType;
(function (EmailType) {
    EmailType["OrderAttemptNotification"] = "orderAttemptNotification";
})(EmailType || (EmailType = {}));
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
export default mongoose.model('Email', emailSchema);
