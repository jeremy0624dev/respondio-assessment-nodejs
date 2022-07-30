import mongoose from 'mongoose';
const categorySchema = new mongoose.Schema({
    id: {
        type: String,
    },
    name: {
        type: String,
    },
});
const productSchema = new mongoose.Schema({
    sku: {
        type: String,
    },
    name: {
        type: String,
    },
    type: {
        type: String,
    },
    price: {
        type: Number,
    },
    upc: {
        type: String,
    },
    category: [categorySchema],
    shipping: {
        type: Number,
    },
    description: {
        type: String,
    },
    manufacturer: {
        type: String,
    },
    model: {
        type: String,
    },
    url: {
        type: String,
    },
    image: {
        type: String,
    },
}, {
    timestamps: true,
});
productSchema.index({
    sku: 1,
});
export default mongoose.model('Product', productSchema);
