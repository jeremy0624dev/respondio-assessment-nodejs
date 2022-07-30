import Client from './client.model.js';
/**
 * Get the client data through the id
 * @param {string} id Client's id
 * @return {iClient}
 */
export async function getClient(id) {
    return Client.findById(id);
}
/**
 * Get all clients
 * @return {iClient[]}
 */
export async function getAllClients() {
    return Client.find({});
}
/**
 * Create client data
 * @param {string} name
 * @param {string} email
 * @param {string} pageAccessToken Fb page access token of this client
 * @return {string} New client's ID
 */
export async function createClient(name, email, pageAccessToken) {
    if (!name || !email || !pageAccessToken)
        throw new Error('Please provide name, email and pageAccessToken');
    const newClient = await Client.create({
        name,
        email,
        pageAccessToken,
    });
    return newClient?._id.toString() || 'No id is generated';
}
