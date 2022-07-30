import mongoose from 'mongoose';
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
export default mongoose.model('Client', clientSchema);
