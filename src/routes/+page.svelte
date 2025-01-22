<script lang="ts">
    type InputEventAlias = Event & {
        currentTarget: EventTarget & HTMLInputElement;
    };

	import { writable, type Writable } from "svelte/store";
	import type { Product, ProductSearchResults } from "../types";

    export let data: [] = [];

    let searchTerm: Writable<string> = writable<string>("");
    let searchResults: Writable<Product[] | []> = writable<Product[] | []>([]);
        
    // $: searchResults = data;

    function onTextInput(event: InputEventAlias) {
        const { value } = event.target as HTMLInputElement;
        searchTerm.set(value);
    }

    function onSearchButtonClick() {
        if($searchTerm.length) {
            getProducts($searchTerm);
        }
    }

    async function getProducts<T extends string>(searchTerm: T) {
        try {
            console.log("searching...", searchTerm)
            const url = `https://real-time-amazon-data.p.rapidapi.com/search?query=${searchTerm}&page=1&country=US&sort_by=RELEVANCE&product_condition=ALL&is_prime=false&deals_and_discounts=NONE`;
            const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': '03082301f1mshcb580e0f0a54947p117723jsn8652b5cc971a',
                    'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com'
                }
            };
            const response = await fetch(url, options);
            const results = await response.json();
            const products = results?.data?.products;

            if(products?.length) {
                console.log("products found", products)
                searchResults.set(products)
            }
        } catch(e) {
            console.log(e)
        }
    }
</script>

<div class="container mx-auto">
    <h1>Welcome to SvelteKit</h1>
    <div class="product-search-input">
        <input type="text" class="input input-bordered w-full max-w-xs" placeholder="Enter a search term" on:input={(event: InputEventAlias) => onTextInput(event)} />
        <button class="btn btn-primary" on:click={() => onSearchButtonClick()}>Search</button>
    </div>
    <div class="product-search-results">
        {#if $searchResults.length}

        {:else}
        <p>No products to display</p>
        {/if}
    </div>
</div>

