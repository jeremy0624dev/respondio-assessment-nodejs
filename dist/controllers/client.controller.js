import Client from '../models/clients/client.model.js';
export async function setupDefaultClientForTesting() {
    const hasImported = await Client.estimatedDocumentCount();
    if (!hasImported) {
        await Client.create({
            pageAccessToken: '<FB-PAGE-ACCESS-TOKEN>',
            name: 'First Client',
        });
        console.log('Created first client');
    }
}
