import Product from '../models/products/product.model.js';
import needle from "needle";
/**
 * Import the dataset into database
 */
export async function importProducts() {
    const productDataSetUrl = 'https://raw.githubusercontent.com/BestBuyAPIs/open-data-set/master/products.json';
    const hasImported = await Product.estimatedDocumentCount();
    if (!hasImported) {
        await needle.get(productDataSetUrl, async (err, response) => {
            const products = JSON.parse(response.body);
            console.log('Importing product array into database.');
            await Product.insertMany(products);
            console.log('completed.');
        });
    }
    else {
        console.log('no need to import.');
    }
}
