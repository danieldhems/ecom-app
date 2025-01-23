<script lang="ts">
    type InputEventAlias = Event & {
        currentTarget: EventTarget & HTMLInputElement;
    };

	import { writable, type Writable } from "svelte/store";
	import type { Product } from "../types";

    let searchTerm: Writable<string> = writable<string>("");
    let searchResults = writable<Product[] | []>([]);

    let isLoading = false;
    let nothingFound = false;
        
    function onTextInput(event: InputEventAlias) {
        const { value } = event.target as HTMLInputElement;
        searchTerm.set(value);
    }

    function onKeyDown(event: KeyboardEvent) {
        if(event.key === "Enter") {
            search();
        }
    }

    function search() {
        searchResults.set([]);

        if($searchTerm.length) {
            getProducts($searchTerm);
            isLoading = true;
        }
    }

    async function getProducts<T extends string>(searchTerm: T) {
        try {
            // TODO: Api path should be aliased
            const response = await fetch(`api/productSearch/${searchTerm}`)
            const responseParsed = await response.json();

            const products = responseParsed.data?.products;
            const totalProducts = responseParsed.data?.total_products;

            searchResults.set(products);

            isLoading = false;

            if(totalProducts > 0) {
                nothingFound = false;
            } else {
                nothingFound = true;
            }
        } catch(e) {
            console.log(e)
        }
    }
</script>

<div class="container mx-auto">
    <h1>Dan Hems' Simple E-commerce App</h1>
    <div class="product-search-input">
        <input
            type="text"
            class="input input-bordered w-full max-w-xs" 
            placeholder="Enter a search term" 
            on:input={(event: InputEventAlias) => onTextInput(event)} 
            on:keydown={(event: KeyboardEvent) => onKeyDown(event)} />
        <button class="btn btn-primary" on:click={() => search()}>Search</button>
    </div>
    <div class="product-search-results grid md:grid-cols-2 lg:grid-cols-3 gap-1">
        {#if $searchResults.length}
            {#each $searchResults as product}
            <div class="card card-side bg-base-100 shadow-xl mb-1">
                <figure>
                  <img
                    src={product.product_photo}
                    alt={product.product_title} />
                </figure>
                <div class="card-body">
                  <h2 class="card-title">
                    <a href={`product-detail/${product.asin}`}>{product.product_title}</a>
                    </h2>
                  <p>{product.product_price}</p>
                </div>
              </div>
            {/each}
        {:else if isLoading}
            <div class="loading-indicator">
                Searching
                <span class="loading loading-spinner loading-lg"></span>
            </div>
        {:else if nothingFound}
            <p>Nothing found.</p>
        {:else}
            <p>No products to display</p>
        {/if}
    </div>
</div>

