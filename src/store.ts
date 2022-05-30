import type { Writable } from "svelte/store";
import { writable } from "svelte/store";

export const drugs: Writable<any[]> = writable([]);

export const fetchDrugs = async () => {
  const response = await fetch("https://v5dfjmmg9j.execute-api.ca-central-1.amazonaws.com/prod?q=aspirin");
  const data = await response.json();
  drugs.set(data.results);
}