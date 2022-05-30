<script lang="ts">
import { onMount } from "svelte";
let promise: Promise<any>;
    onMount(async () => {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
        promise = response.json();
    });
 //   $: promise = fetch('https://api.github.com/users/bestguy')
</script>

{#await promise}
    <div>Waiting...</div>
{:then results}
    {#if results !== undefined}
        {#each results.results as poke}
            <h3>{poke.name}</h3>
        {/each}
    <div>{JSON.stringify(results, null, 2)}</div>
{/if}
{:catch error}
    <div>{error.message}</div>
{/await}