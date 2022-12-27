import type { Writable } from "svelte/store";
import { writable, derived } from "svelte/store";

export let drugOne: String;

export const drugs: Writable<any> = writable([]);
export const apiData: Writable<any> = writable([]);

// export const fetchDrugs = async () => {
//   const response = await fetch(`https://api.openmeds.ca/?q=${drugOne}`);
//   const data = await response.json();
//   drugs.set(Object.values(data.results[0]));
// }
// export const drugValues = derived(apiData, ($apiData) => {
//     if ($apiData.drugs){
//       return $apiData.drinks.map(drink => drink.strDrink);
//     }
//     return [];
//   });