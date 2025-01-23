import { XRapidAPIKey, XRapidAPIHost } from '$env/static/private';

export async function GET({ params }) {
    const { searchTerm } = params;
    const searchUrl = `https://real-time-amazon-data.p.rapidapi.com/search?query=${searchTerm}&page=1&country=US&sort_by=RELEVANCE&product_condition=ALL&is_prime=false&deals_and_discounts=NONE`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': XRapidAPIKey,
            'x-rapidapi-host': XRapidAPIHost,
        }
    };
    return await fetch(searchUrl, options);
}