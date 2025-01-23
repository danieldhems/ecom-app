export async function load({ fetch, params, url }) {
    try {
        console.log("url", url)
        const { asin } = params;
        // TODO: Api path should be aliased to avoid relative path
        const response = await fetch(`../api/productDetail/${asin}`);
        const productDetails = await response.json();

        return { productDetails };
    } catch (e) {
        console.log("Product detail page load failed", e)
    }
}