import { XRapidAPIKey, XRapidAPIHost } from '$env/static/private';

export async function GET({ params }) {
    const { asin } = params;
    const productDetailsUrl = `https://real-time-amazon-data.p.rapidapi.com/product-details?asin=${asin}&country=US`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': XRapidAPIKey,
            'x-rapidapi-host': XRapidAPIHost,
        }
    };

    return await fetch(productDetailsUrl, options);
}