<script lang="ts">
	import { goto } from '$app/navigation';

    export let data;

    $: productDetails = data?.productDetails?.data;

    function goBack() {
        goto('..');
    }
</script>

<div id="product-details-page max-w-md">
    <div class="container">
        <div id="nav-actions">
            <button class="btn btn-primary">
                <a on:click|preventDefault={() => goBack()} href="#" title="Back to search results">Back to search results</a>
            </button>
        </div>
        <div class="hero bg-base-200 min-h-screen">
            <div class="hero-content flex-col lg:flex-row">
              <img
                src={productDetails.product_photo}
                alt={productDetails.product_title}
                class="max-w-sm rounded-lg shadow-2xl" />
              <div>
                <h1 class="text-5xl font-bold">{productDetails.product_title}</h1>
                <div id="product-price">Price: {productDetails.product_price}</div>
                <p class="py-6">
                  {productDetails.product_detail}
                </p>
                {#if productDetails.product_byline}
                    <div id="product-byline">
                        <a href={productDetails.product_byline_link} title="Product byline link">{productDetails.product_byline}</a>
                    </div>
                {/if}
              </div>
            </div>
        </div>
        {#if productDetails.product_description}
            <div id="product-description">
                {productDetails.product_description}
            </div>
        {/if}
    </div>
</div>