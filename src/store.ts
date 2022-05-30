import type { Writable } from "svelte/store";
import { writable } from "svelte/store";

export const drugs: Writable<any> = writable([]);

export const fetchDrugs = async () => {
  const response = await fetch("https://api.openmeds.ca/?q=aspirin");
  const data = await response.json();
  drugs.set(Object.values(data.results[0]));
}