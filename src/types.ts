export type ProductSearchResults = {
    status: string;
    request_id: string;
    data: {
        total_products: number;
        country: string;
        domain: string;
        products: Product[]
    }
}

export enum Currencies {
    USD = "USD"
}

export type Product = {
    asin: string;
    product_title: string;
    // TODO: Might be better to define a generic type to match the expected format of a currency string
    product_price: string;
    product_original_price: string;
    product_description: string;
    product_byline: string;
    product_byline_link: string;
    currency: keyof Currencies;
    product_star_rating: string;
    product_num_ratings: number;
    product_url: string;
    product_photo: string;
    product_num_offers: number;
    product_minimum_offer_price: string;
    is_best_seller: boolean
    is_amazon_choice: boolean
    is_prime: boolean
    climate_pledge_friendly: boolean
    sales_volume: string;
    delivery: string;
    has_variations: boolean;
}