<script lang="ts">
import { onMount } from "svelte";
import {fetchDrugs, drugs } from "./store"

$: promise = fetchDrugs()

</script>

{#await promise}
    <div>Waiting...</div>
{:then results}
        {#each $drugs as drug}
            <h3>{JSON.stringify(drug, null, 2)}</h3>
        {/each}
{:catch error}
    <div>{error.message}</div>
{/await}