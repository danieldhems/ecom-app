## Introduction

Here is my attempt at a simple e-commerce application.

It is far from finished, unfortunately, but it's the best I can offer quickly, and it should help to illustrate my current level of proficiency with Svelte.

## Set-up instructions

Once you have this project cloned on your machine, please do the following to get up and running:

1. Run `npm i` to install the project.
2. Copy/rename the `.env.example` file to `.env` and replace the keys inside with real values taken from your API provider.
3. Run `npm run dev` to get the dev server up and running
4. Go to `localhost:5173` to see the application.

## Considerations

### Issues with set-up

I used the `sv` project generator to create the boilerplate for this application.
Unfortunately, it took several attempts and some debugging to figure out why this generator kept failing. As it turned out, in choosing `pnpm` as the package manager (I've come to learn that this works well with Svelte), I didn't realise that I didn't have `pnpm` installed, and the generator did not report this as the reason for the failure.

### Keeping the API headers private

My next task was to learn how to keep the API keys hidden from the client-side when making API calls. I haven't done this before so I had to spend some time reading documentation and searching on forums to find a good approach for achieving this.
I'm glad to have now learnt about this.

### Slow navigation to Product Detail page

Though I have got the product detail page working, I've not yet found a solution for making page navigation quick enough to provide a good UX. Given that the product details page makes its API call on the server side, the page doesn't load until this request has been completed, thus navigation appears to be very slow or inactive.

I would very much like to learn how best to handle this.

### Go back to search results

Another issue I have encountered and have attempted to solve is the ability to go back to the search results. Going back may be simple enough, but I want to retain the search results in some way so that the page immediately loads with all the content it contained from the previous search activity.

I understand that there may be several ways of achieving this and, again, I'd like to learn the best way.