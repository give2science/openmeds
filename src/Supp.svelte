<script lang="ts">
import { onMount } from "svelte";
import {fetchDrugs, drugs } from "./store"

$: promise = fetchDrugs()

</script>

{#await promise}
    <div>Waiting...</div>
{:then results}
        {#each $drugs as drug}
            <h3>{drug.name}</h3>
        {/each}
    <div>{JSON.stringify(results, null, 2)}</div>
{:catch error}
    <div>{error.message}</div>
{/await}