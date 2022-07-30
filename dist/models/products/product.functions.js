import Product from './product.model.js';
/**
 * @param {string} productSku
 * @return {iProduct}
 */
export async function getProduct(productSku) {
    return Product.findOne({
        sku: productSku,
    });
}
/**
 * @return {iProduct[]}
 */
export async function getAllProducts() {
    return Product.find({});
}
